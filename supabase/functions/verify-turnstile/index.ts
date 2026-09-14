import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const TURNSTILE_SECRET_KEY = Deno.env.get('TURNSTILE_SECRET_KEY')

serve(async (req) => {
  // Handle CORS - restrict to your domain in production
  const origin = req.headers.get('origin') || '*'
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!TURNSTILE_SECRET_KEY) {
      // If Turnstile not configured, allow the request (development mode)
      console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification')
      return new Response(JSON.stringify({ success: true, verified: true, message: 'Turnstile not configured' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const { token, remoteip } = await req.json()

    if (!token) {
      return new Response(JSON.stringify({ success: false, error: 'Missing token' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Verify token with Cloudflare
    const formData = new FormData()
    formData.append('secret', TURNSTILE_SECRET_KEY)
    formData.append('response', token)
    if (remoteip) {
      formData.append('remoteip', remoteip)
    }

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    })

    const result = await verifyResponse.json()

    return new Response(JSON.stringify({
      success: result.success,
      verified: result.success,
      'error-codes': result['error-codes'],
    }), {
      status: result.success ? 200 : 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
})
