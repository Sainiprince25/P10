import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

serve(async (req) => {
  try {
    // Calculate date 6 months ago
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    const cutoffDate = sixMonthsAgo.toISOString()

    console.log(`Cleaning up enquiries older than ${cutoffDate}`)

    // Delete old enquiries (this will cascade delete status history due to ON DELETE CASCADE)
    const { data, error, count } = await supabase
      .from('enquiries')
      .delete()
      .lt('submitted_at', cutoffDate)
      .select('id', { count: 'exact' })

    if (error) {
      console.error('Cleanup error:', error)
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log(`Deleted ${count || 0} old enquiries`)

    return new Response(JSON.stringify({
      success: true,
      deleted: count || 0,
      cutoff_date: cutoffDate,
    }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
