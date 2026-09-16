-- P.S Service Provider - Automated Data Retention
-- This sets up pg_cron to automatically delete enquiries older than 6 months
-- Run this in Supabase SQL Editor

-- ============================================
-- ENABLE pg_cron EXTENSION
-- ============================================
-- Note: pg_cron must be enabled in Supabase dashboard first
-- Go to: Database → Extensions → Search for "pg_cron" → Enable

-- ============================================
-- CREATE AUTOMATED CLEANUP JOB
-- ============================================
-- This job runs daily at 2:00 AM and deletes enquiries older than 6 months

SELECT cron.schedule(
  'cleanup-old-enquiries',
  '0 2 * * *',  -- Every day at 2:00 AM
  $$
    DELETE FROM enquiries
    WHERE submitted_at < NOW() - INTERVAL '6 months';
  $$
);

-- ============================================
-- VERIFY THE JOB
-- ============================================
-- To see all scheduled jobs:
-- SELECT * FROM cron.job;

-- To check job run history:
-- SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;

-- To manually run the cleanup:
-- SELECT cron.run_job('cleanup-old-enquiries');

-- To disable the job temporarily:
-- SELECT cron.alter_job('cleanup-old-enquiries', active := false);

-- To re-enable the job:
-- SELECT cron.alter_job('cleanup-old-enquiries', active := true);

-- To remove the job:
-- SELECT cron.unschedule('cleanup-old-enquiries');

-- ============================================
-- ALTERNATIVE: Use Supabase Edge Function
-- ============================================
-- If pg_cron is not available, you can use the cleanup-old-enquiries
-- Edge Function and trigger it via:
-- 1. External cron service (e.g., cron-job.org, GitHub Actions)
-- 2. Supabase scheduled functions (if available in your plan)
-- 3. Manual execution via the Edge Function
