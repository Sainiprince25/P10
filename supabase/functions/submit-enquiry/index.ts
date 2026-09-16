import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const TURNSTILE_SECRET_KEY = Deno.env.get('TURNSTILE_SECRET_KEY')

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX = 5 // max 5 submissions per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

async function verifyTurnstile(token: string, remoteip?: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn('Turnstile not configured, skipping verification')
    return true // Allow if not configured (development mode)
  }

  try {
    const formData = new FormData()
    formData.append('secret', TURNSTILE_SECRET_KEY)
    formData.append('response', token)
    if (remoteip) formData.append('remoteip', remoteip)

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    return result.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}

function validateEnquiry(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.full_name || typeof data.full_name !== 'string' || data.full_name.trim().length < 2) {
    errors.push('Valid full name is required')
  }

  if (!data.mobile || !/^[6-9]\d{9}$/.test(data.mobile.replace(/\s/g, '').replace(/^\+91/, ''))) {
    errors.push('Valid 10-digit Indian mobile number is required')
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required')
  }

  if (!data.service || typeof data.service !== 'string') {
    errors.push('Service selection is required')
  }

  if (!data.property_type || typeof data.property_type !== 'string') {
    errors.push('Property type is required')
  }

  if (!data.location || typeof data.location !== 'string' || data.location.trim().length < 2) {
    errors.push('Location is required')
  }

  if (!data.preferred_date) {
    errors.push('Preferred date is required')
  } else {
    const selectedDate = new Date(data.preferred_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate < today) {
      errors.push('Preferred date cannot be in the past')
    }
  }

  if (!data.preferred_time || typeof data.preferred_time !== 'string') {
    errors.push('Preferred time is required')
  }

  return { valid: errors.length === 0, errors }
}

serve(async (req) => {
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
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown'

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Too many requests. Please try again later.',
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const body = await req.json()
    const { turnstile_token, ...enquiryData } = body

    // Validate enquiry data
    const validation = validateEnquiry(enquiryData)
    if (!validation.valid) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Validation failed',
        errors: validation.errors,
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Verify Turnstile token
    const turnstileValid = await verifyTurnstile(turnstile_token, ip)
    if (!turnstileValid) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Security verification failed. Please try again.',
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Insert enquiry into database
    const submittedAt = new Date().toISOString()
    const { data: enquiry, error: insertError } = await supabase
      .from('enquiries')
      .insert({
        full_name: enquiryData.full_name.trim(),
        mobile: enquiryData.mobile.replace(/\s/g, ''),
        email: enquiryData.email?.trim() || null,
        service: enquiryData.service,
        property_type: enquiryData.property_type,
        location: enquiryData.location.trim(),
        preferred_date: enquiryData.preferred_date,
        preferred_time: enquiryData.preferred_time,
        details: enquiryData.details?.trim() || null,
        status: 'new',
        submitted_at: submittedAt,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to save enquiry',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Create initial status history entry
    await supabase.from('enquiry_status_history').insert({
      enquiry_id: enquiry.id,
      status: 'new',
      note: 'Enquiry received',
    })

    // Trigger email notification (non-blocking)
    try {
      await supabase.functions.invoke('send-email', {
        body: { enquiry_id: enquiry.id, action: 'new_enquiry' },
      })
    } catch (emailError) {
      console.warn('Email notification failed:', emailError)
      // Don't fail the request if email fails
    }

    return new Response(JSON.stringify({
      success: true,
      enquiry_id: enquiry.id,
      message: 'Enquiry submitted successfully',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
})
