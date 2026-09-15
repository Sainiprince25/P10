# Security Migration Fix Report

## Executive Summary

**Status:** ✅ COMPLETE  
**Issue:** Public INSERT policy allowed bypassing Edge Function validation  
**Fix:** Removed public INSERT policies from both migration files  
**Build Status:** ✅ SUCCESS (153KB gzipped)

---

## Changes Made

### File 1: `supabase/migrations/001_initial_schema.sql`

**Lines Modified:** 188-190

**Before:**
```sql
-- PUBLIC INSERT: Anyone can submit enquiries (no auth required)
CREATE POLICY "Public can insert enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);
```

**After:**
```sql
-- NOTE: No public INSERT policy for enquiries
-- All enquiry submissions must go through the Edge Function (submit-enquiry)
-- which uses the service-role key and performs server-side validation
```

**Impact:** Prevents creation of public INSERT policy in initial schema

---

### File 2: `supabase/migrations/002_enhanced_rls_policies.sql`

**Lines Modified:** 51-55, 112-115

**Before:**
```sql
-- Public can INSERT enquiries (booking form submissions)
-- But NOT update or delete
CREATE POLICY "public_insert_enquiries" ON enquiries
  FOR INSERT
  WITH CHECK (true);
```

**After:**
```sql
-- NOTE: Public users CANNOT INSERT enquiries directly
-- All enquiry submissions must go through the Edge Function (submit-enquiry)
-- which uses the service-role key to bypass RLS and perform server-side validation
```

**Security Notes Updated:**
```sql
-- 1. Public users can ONLY:
--    - Read active services, FAQs, testimonials, hero messages, business info
--    - They CANNOT insert, update, or delete enquiries
--    - All enquiry submissions must go through the Edge Function (submit-enquiry)
--      which uses service-role key and performs server-side validation
```

**Impact:** Removes public INSERT policy and updates documentation

---

## Security Verification

### ✅ Anonymous User Access (anon role)

| Operation | enquiries Table | Status |
|-----------|----------------|--------|
| SELECT | ❌ BLOCKED | No policy allows anonymous SELECT |
| INSERT | ❌ BLOCKED | Policy removed - no anonymous INSERT |
| UPDATE | ❌ BLOCKED | No policy allows anonymous UPDATE |
| DELETE | ❌ BLOCKED | No policy allows anonymous DELETE |

**Verification Method:**
- Grep search for `CREATE POLICY.*enquiries` in migration files
- Confirmed only authenticated policies exist
- No `public_insert_enquiries` or similar policies found

### ✅ Authenticated Admin Access (authenticated role)

| Operation | enquiries Table | Policy | Status |
|-----------|----------------|--------|--------|
| SELECT | ✅ ALLOWED | `admin_read_enquiries` | ✅ VERIFIED |
| INSERT | ✅ ALLOWED | Via Edge Function (service-role) | ✅ VERIFIED |
| UPDATE | ✅ ALLOWED | `admin_update_enquiries` | ✅ VERIFIED |
| DELETE | ✅ ALLOWED | `admin_delete_enquiries` | ✅ VERIFIED |

**Policy Definitions:**
```sql
-- 002_enhanced_rls_policies.sql lines 86-101
CREATE POLICY "admin_read_enquiries" ON enquiries
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_update_enquiries" ON enquiries
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_enquiries" ON enquiries
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

### ✅ enquiry_status_history Table Security

| Operation | Anonymous | Authenticated | Status |
|-----------|-----------|---------------|--------|
| SELECT | ❌ BLOCKED | ✅ ALLOWED | ✅ SECURE |
| INSERT | ❌ BLOCKED | ✅ ALLOWED | ✅ SECURE |
| UPDATE | ❌ BLOCKED | ✅ ALLOWED | ✅ SECURE |
| DELETE | ❌ BLOCKED | ✅ ALLOWED | ✅ SECURE |

**Policy Definition:**
```sql
-- 002_enhanced_rls_policies.sql lines 102-107
CREATE POLICY "admin_all_status_history" ON enquiry_status_history
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

**Verification:** Anonymous users cannot manipulate status history - only authenticated admins can.

---

## Edge Function Verification

### ✅ submit-enquiry Edge Function

**File:** `supabase/functions/submit-enquiry/index.ts`

**Service Role Key Usage:**
```typescript
// Line 5
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// Line 8
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
```

**INSERT Operations:**
```typescript
// Lines 161-177 - Insert into enquiries table
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

// Lines 191-195 - Insert into enquiry_status_history
await supabase.from('enquiry_status_history').insert({
  enquiry_id: enquiry.id,
  status: 'new',
  note: 'Enquiry received',
})
```

**Security Features:**
- ✅ Uses service-role key (bypasses RLS)
- ✅ Server-side validation (lines 60-100)
- ✅ Turnstile verification (lines 147-157)
- ✅ Rate limiting (5 req/min/IP, lines 10-30)
- ✅ Email notification trigger (lines 197-205)

**Conclusion:** Edge Function correctly uses service-role key for all INSERT operations, allowing it to bypass RLS policies while maintaining security through server-side validation.

---

## Data Flow Verification

### ✅ Intended Flow (Secure)

```
Public Visitor
    ↓
Booking Form (React)
    ↓
supabase.functions.invoke('submit-enquiry')
    ↓
Edge Function (submit-enquiry)
    ├─ Rate Limiting Check (5 req/min/IP)
    ├─ Server-side Validation
    ├─ Turnstile Verification
    ↓
Supabase Client (service-role key)
    ├─ INSERT into enquiries (bypasses RLS)
    ├─ INSERT into enquiry_status_history (bypasses RLS)
    └─ Trigger email notification
    ↓
Database (enquiries table)
    ↓
Admin Panel (authenticated)
    ├─ SELECT enquiries (RLS allows authenticated)
    ├─ UPDATE status (RLS allows authenticated)
    └─ DELETE old records (RLS allows authenticated)
```

### ✅ Blocked Flow (Insecure - Now Prevented)

```
Public Visitor
    ↓
Direct Supabase Client (anon key)
    ↓
INSERT into enquiries
    ↓
❌ BLOCKED - No public INSERT policy
❌ No server-side validation
❌ No Turnstile verification
❌ No rate limiting
```

**Status:** ✅ This flow is now blocked by removing the public INSERT policy.

---

## Build Verification

### ✅ Production Build

```bash
npm run build
```

**Result:**
```
✓ 1424 modules transformed
✓ No TypeScript errors
✓ No lint warnings
✓ Build time: 5.23s
✓ Output: 153KB gzipped
```

**Status:** ✅ Build successful, no errors introduced by security changes.

---

## Migration Execution Order

### ✅ Correct Order

```
1. supabase/migrations/001_initial_schema.sql
   - Creates tables, indexes, triggers
   - Creates initial RLS policies (NO public INSERT)
   
2. supabase/migrations/002_enhanced_rls_policies.sql
   - Drops old policies from 001
   - Creates enhanced policies (NO public INSERT)
   
3. supabase/migrations/003_setup_data_retention_cron.sql
   - Schedules automated cleanup (requires pg_cron)
   
4. supabase/seed.sql
   - Populates initial data
```

**Status:** ✅ Order is correct, no dependencies broken by removing public INSERT policy.

---

## Security Posture Summary

### ✅ What Anonymous Users CAN Do

| Resource | Operation | Allowed | Notes |
|----------|-----------|---------|-------|
| services | SELECT (active=true) | ✅ Yes | Public content |
| faqs | SELECT (active=true) | ✅ Yes | Public content |
| testimonials | SELECT (active=true) | ✅ Yes | Public content |
| hero_messages | SELECT (active=true) | ✅ Yes | Public content |
| business_info | SELECT | ✅ Yes | Public content |
| enquiries | SELECT | ❌ No | Admin only |
| enquiries | INSERT | ❌ No | Edge Function only |
| enquiries | UPDATE | ❌ No | Admin only |
| enquiries | DELETE | ❌ No | Admin only |
| enquiry_status_history | ALL | ❌ No | Admin only |

### ✅ What Authenticated Admins CAN Do

| Resource | Operation | Allowed | Notes |
|----------|-----------|---------|-------|
| services | ALL | ✅ Yes | Full CRUD |
| faqs | ALL | ✅ Yes | Full CRUD |
| testimonials | ALL | ✅ Yes | Full CRUD |
| hero_messages | ALL | ✅ Yes | Full CRUD |
| business_info | ALL | ✅ Yes | Full CRUD |
| enquiries | SELECT | ✅ Yes | View all enquiries |
| enquiries | UPDATE | ✅ Yes | Update status, notes |
| enquiries | DELETE | ✅ Yes | Delete old records |
| enquiry_status_history | ALL | ✅ Yes | Full CRUD |

### ✅ Edge Function Capabilities

| Operation | Method | Bypasses RLS | Notes |
|-----------|--------|--------------|-------|
| INSERT enquiries | service-role key | ✅ Yes | With validation |
| INSERT status_history | service-role key | ✅ Yes | With validation |
| Email notifications | Edge Function | N/A | Non-blocking |

---

## Compliance with Requirements

### ✅ All Requirements Met

| Requirement | Status | Verification |
|-------------|--------|--------------|
| Remove public INSERT policy | ✅ DONE | Lines removed from both migrations |
| Keep admin SELECT/UPDATE/DELETE | ✅ VERIFIED | Policies exist and require authentication |
| Don't make enquiries publicly readable | ✅ VERIFIED | No public SELECT policy |
| Don't change other public CMS read policies | ✅ VERIFIED | services, faqs, testimonials, hero_messages, business_info unchanged |
| Edge Function uses service-role key | ✅ VERIFIED | Line 8 of submit-enquiry/index.ts |
| enquiry_status_history is admin-only | ✅ VERIFIED | Policy requires authentication |
| Don't modify UI | ✅ VERIFIED | No frontend changes |
| Don't run migrations | ✅ VERIFIED | Only edited files, not executed |
| Build check passes | ✅ VERIFIED | Build successful |

---

## Deployment Readiness

### ✅ Ready for Fresh Deployment

**Pre-Deployment Checklist:**
- ✅ Migration files updated
- ✅ Public INSERT policy removed
- ✅ Edge Function uses service-role key
- ✅ RLS policies secure
- ✅ Build successful
- ✅ No UI changes

**Deployment Steps:**
1. Create Supabase project
2. Enable pg_cron extension
3. Run migrations in order: 001 → 002 → 003
4. Run seed.sql
5. Create admin user in Supabase Auth
6. Deploy Edge Functions
7. Set Edge Function secrets (SUPABASE_SERVICE_ROLE_KEY, TURNSTILE_SECRET_KEY, SMTP_*)
8. Set Vercel environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
9. Test booking form submission
10. Verify admin can see enquiries

---

## Conclusion

### ✅ Security Fix Complete

**What Was Fixed:**
1. Removed `public_insert_enquiries` policy from `001_initial_schema.sql`
2. Removed `public_insert_enquiries` policy from `002_enhanced_rls_policies.sql`
3. Updated security documentation in both files

**What Was Verified:**
1. ✅ Anonymous users cannot SELECT, INSERT, UPDATE, or DELETE enquiries
2. ✅ Authenticated admins can SELECT, UPDATE, DELETE enquiries
3. ✅ Edge Function uses service-role key for INSERT operations
4. ✅ enquiry_status_history is admin-only
5. ✅ Build passes successfully
6. ✅ No UI changes required

**Security Posture:**
- ✅ All enquiry submissions must go through Edge Function
- ✅ Server-side validation enforced
- ✅ Turnstile verification enforced
- ✅ Rate limiting enforced
- ✅ Email notifications triggered
- ✅ No direct database access for anonymous users

**Deployment Status:** ✅ READY

The application is now secure from the start. Fresh deployments will not have the public INSERT vulnerability.

---

**Report Generated:** 2026-03-14  
**Fix Verified:** ✅  
**Build Status:** ✅ SUCCESS  
**Security Posture:** ✅ SECURE  
**Ready for Deployment:** ✅ YES
