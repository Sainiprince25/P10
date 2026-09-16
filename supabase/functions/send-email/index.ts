import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// SMTP Configuration - supports Gmail or any SMTP provider
const SMTP_HOST = Deno.env.get('SMTP_HOST') || 'smtp.gmail.com'
const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587')
const SMTP_USER = Deno.env.get('SMTP_USER')
const SMTP_PASS = Deno.env.get('SMTP_PASS')
const SMTP_FROM = Deno.env.get('SMTP_FROM') || SMTP_USER

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

interface EmailPayload {
  to: string | string[]
  subject: string
  html: string
}

async function sendEmail(payload: EmailPayload) {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn('SMTP credentials not configured, skipping email')
    return { success: false, error: 'SMTP not configured' }
  }

  try {
    const client = new SmtpClient()

    await client.connectTLS({
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      username: SMTP_USER,
      password: SMTP_PASS,
    })

    const recipients = Array.isArray(payload.to) ? payload.to : [payload.to]

    await client.send({
      from: SMTP_FROM,
      to: recipients,
      subject: payload.subject,
      html: payload.html,
    })

    await client.close()
    return { success: true }
  } catch (error) {
    console.error('SMTP send failed:', error)
    return { success: false, error: error.message }
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { enquiry_id, action } = await req.json()

    if (!enquiry_id || !action) {
      return new Response(JSON.stringify({ error: 'Missing enquiry_id or action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    // Fetch enquiry details
    const { data: enquiry, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', enquiry_id)
      .single()

    if (error || !enquiry) {
      return new Response(JSON.stringify({ error: 'Enquiry not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    // Fetch business info
    const { data: businessInfo } = await supabase
      .from('business_info')
      .select('*')
      .limit(1)
      .single()

    const businessName = businessInfo?.name || 'P.S Service Provider'
    const businessPhone = businessInfo?.phone || '+917982548842'

    const results: { admin?: any; customer?: any } = {}

    // Send emails based on action
    if (action === 'new_enquiry') {
      // Notify admin
      const adminEmail = Deno.env.get('ADMIN_NOTIFICATION_EMAIL')
      if (adminEmail) {
        results.admin = await sendEmail({
          to: adminEmail,
          subject: `New Pest Control Enquiry - ${enquiry.full_name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669;">New Service Enquiry Received</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.full_name}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.mobile}</td></tr>
                ${enquiry.email ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.email}</td></tr>` : ''}
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.service}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Property Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.property_type}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.location}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Preferred Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.preferred_date}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Preferred Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.preferred_time}</td></tr>
                ${enquiry.details ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Details:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.details}</td></tr>` : ''}
              </table>
              <hr style="margin: 20px 0;">
              <p style="color: #666; font-size: 12px;">Enquiry ID: ${enquiry.id}<br>Submitted: ${new Date(enquiry.submitted_at).toLocaleString('en-IN')}</p>
            </div>
          `,
        })
      }

      // Send confirmation to customer if email provided
      if (enquiry.email) {
        results.customer = await sendEmail({
          to: enquiry.email,
          subject: `Thank you for your enquiry - ${businessName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669;">Thank you for contacting ${businessName}</h2>
              <p>Dear ${enquiry.full_name},</p>
              <p>We have received your pest control service enquiry and our team will review it shortly.</p>
              <h3 style="color: #333;">Your Enquiry Details:</h3>
              <ul>
                <li><strong>Service:</strong> ${enquiry.service}</li>
                <li><strong>Location:</strong> ${enquiry.location}</li>
                <li><strong>Preferred Date:</strong> ${enquiry.preferred_date}</li>
                <li><strong>Preferred Time:</strong> ${enquiry.preferred_time}</li>
              </ul>
              <p>Our team will contact you within 24 hours to discuss your requirements and provide a quotation.</p>
              <p>If you have any urgent questions, please call us at <strong>${businessPhone}</strong>.</p>
              <hr style="margin: 20px 0;">
              <p style="color: #999; font-size: 11px;">Enquiry ID: ${enquiry.id}<br>This is an automated message. Please do not reply to this email.</p>
            </div>
          `,
        })
      }
    }

    if (action === 'status_update') {
      if (enquiry.email) {
        const statusMessages: Record<string, string> = {
          contacted: 'Our team has reviewed your enquiry and will be contacting you shortly.',
          quoted: 'We have prepared a quotation for your pest control service. Our team will share the details with you.',
          booked: 'Your pest control service has been confirmed and booked. Our technician will visit on the scheduled date.',
          completed: 'Your pest control service has been completed. Thank you for choosing us! If you have any concerns within our 1-month guarantee period, please contact us.',
        }

        const statusMessage = statusMessages[enquiry.status]

        if (statusMessage) {
          results.customer = await sendEmail({
            to: enquiry.email,
            subject: `Service Update - ${businessName}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #059669;">Service Status Update</h2>
                <p>Dear ${enquiry.full_name},</p>
                <p>${statusMessage}</p>
                <h3 style="color: #333;">Your Service Details:</h3>
                <ul>
                  <li><strong>Service:</strong> ${enquiry.service}</li>
                  <li><strong>Status:</strong> ${enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}</li>
                  <li><strong>Location:</strong> ${enquiry.location}</li>
                </ul>
                <p>If you have any questions, please contact us at <strong>${businessPhone}</strong>.</p>
                <hr style="margin: 20px 0;">
                <p style="color: #999; font-size: 11px;">Enquiry ID: ${enquiry.id}<br>This is an automated message. Please do not reply to this email.</p>
              </div>
            `,
          })
        }
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
