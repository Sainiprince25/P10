-- P.S Service Provider - Enhanced RLS Policies
-- Run this AFTER the initial schema migration

-- ============================================
-- DROP EXISTING POLICIES (if any)
-- ============================================
DO $$ 
BEGIN
  -- Drop all existing policies
  DROP POLICY IF EXISTS "Public can read active services" ON services;
  DROP POLICY IF EXISTS "Public can read active faqs" ON faqs;
  DROP POLICY IF EXISTS "Public can read active testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Public can read active hero messages" ON hero_messages;
  DROP POLICY IF EXISTS "Public can read business info" ON business_info;
  DROP POLICY IF EXISTS "Public can insert enquiries" ON enquiries;
  DROP POLICY IF EXISTS "Authenticated users can manage services" ON services;
  DROP POLICY IF EXISTS "Authenticated users can manage faqs" ON faqs;
  DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Authenticated users can manage hero messages" ON hero_messages;
  DROP POLICY IF EXISTS "Authenticated users can manage business info" ON business_info;
  DROP POLICY IF EXISTS "Authenticated users can read all enquiries" ON enquiries;
  DROP POLICY IF EXISTS "Authenticated users can update enquiries" ON enquiries;
  DROP POLICY IF EXISTS "Authenticated users can manage status history" ON enquiry_status_history;
END $$;

-- ============================================
-- PUBLIC POLICIES (No Authentication Required)
-- ============================================

-- Public can READ active content only
CREATE POLICY "public_read_services" ON services
  FOR SELECT
  USING (active = true);

CREATE POLICY "public_read_faqs" ON faqs
  FOR SELECT
  USING (active = true);

CREATE POLICY "public_read_testimonials" ON testimonials
  FOR SELECT
  USING (active = true);

CREATE POLICY "public_read_hero_messages" ON hero_messages
  FOR SELECT
  USING (active = true);

CREATE POLICY "public_read_business_info" ON business_info
  FOR SELECT
  USING (true);

-- Public can INSERT enquiries (booking form submissions)
-- But NOT update or delete
CREATE POLICY "public_insert_enquiries" ON enquiries
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- AUTHENTICATED ADMIN POLICIES
-- ============================================

-- Admin can do EVERYTHING on CMS tables
CREATE POLICY "admin_all_services" ON services
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_faqs" ON faqs
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_testimonials" ON testimonials
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_hero_messages" ON hero_messages
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_business_info" ON business_info
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Admin can READ all enquiries (including inactive)
CREATE POLICY "admin_read_enquiries" ON enquiries
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admin can UPDATE enquiries (status changes, notes)
CREATE POLICY "admin_update_enquiries" ON enquiries
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Admin can DELETE enquiries (for data retention)
CREATE POLICY "admin_delete_enquiries" ON enquiries
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Admin can manage status history
CREATE POLICY "admin_all_status_history" ON enquiry_status_history
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- SECURITY NOTES
-- ============================================
-- 1. Public users can ONLY:
--    - Read active services, FAQs, testimonials, hero messages, business info
--    - Insert new enquiries
--    - They CANNOT update or delete anything
--
-- 2. Authenticated admins can:
--    - Read all content (including inactive)
--    - Create, update, delete all CMS content
--    - Read, update, delete enquiries
--    - Manage status history
--
-- 3. To create an admin user:
--    - Go to Supabase Dashboard → Authentication → Users
--    - Click "Add user" → "Create new user"
--    - Enter email and strong password
--    - Auto-confirm the user
--
-- 4. For additional security, you can:
--    - Create a custom "admins" table
--    - Add a policy that checks if the user email is in the admins table
--    - This prevents any authenticated user from being an admin
