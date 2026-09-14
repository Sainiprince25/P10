-- P.S Service Provider - Initial Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon TEXT DEFAULT '🛡️',
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'residential', 'commercial')),
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FAQS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'residential' CHECK (type IN ('residential', 'commercial')),
  location TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_demo BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- HERO MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS hero_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BUSINESS INFO TABLE (singleton)
-- ============================================
CREATE TABLE IF NOT EXISTS business_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'P.S Service Provider',
  phone TEXT NOT NULL DEFAULT '+917982548842',
  whatsapp TEXT NOT NULL DEFAULT '917982548842',
  email TEXT NOT NULL DEFAULT 'info@psserviceprovider.com',
  address TEXT NOT NULL DEFAULT 'Delhi NCR, India',
  description TEXT NOT NULL DEFAULT 'Professional pest control services across Delhi, Gurugram, Noida & Faridabad.',
  service_areas TEXT[] DEFAULT ARRAY['Delhi', 'Gurugram', 'Noida', 'Faridabad'],
  business_hours TEXT NOT NULL DEFAULT 'To Be Confirmed',
  google_maps_embed TEXT DEFAULT '',
  google_maps_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ENQUIRIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  property_type TEXT NOT NULL,
  location TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'booked', 'completed')),
  admin_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ENQUIRY STATUS HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS enquiry_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_services_active_order ON services(active, order_index);
CREATE INDEX IF NOT EXISTS idx_faqs_active_order ON faqs(active, order_index);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(active);
CREATE INDEX IF NOT EXISTS idx_hero_messages_active_order ON hero_messages(active, order_index);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_submitted_at ON enquiries(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_service ON enquiries(service);
CREATE INDEX IF NOT EXISTS idx_enquiries_property_type ON enquiries(property_type);
CREATE INDEX IF NOT EXISTS idx_enquiry_status_history_enquiry_id ON enquiry_status_history(enquiry_id);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_messages_updated_at BEFORE UPDATE ON hero_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_info_updated_at BEFORE UPDATE ON business_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_status_history ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ: Anyone can read active content
CREATE POLICY "Public can read active services" ON services
  FOR SELECT USING (active = true);

CREATE POLICY "Public can read active faqs" ON faqs
  FOR SELECT USING (active = true);

CREATE POLICY "Public can read active testimonials" ON testimonials
  FOR SELECT USING (active = true);

CREATE POLICY "Public can read active hero messages" ON hero_messages
  FOR SELECT USING (active = true);

CREATE POLICY "Public can read business info" ON business_info
  FOR SELECT USING (true);

-- PUBLIC INSERT: Anyone can submit enquiries (no auth required)
CREATE POLICY "Public can insert enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

-- AUTHENTICATED: Admin users can do everything
-- Note: In production, you'll create an admin user via Supabase Auth
-- These policies check if the user is authenticated

CREATE POLICY "Authenticated users can manage services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage faqs" ON faqs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage hero messages" ON hero_messages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage business info" ON business_info
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read all enquiries" ON enquiries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update enquiries" ON enquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage status history" ON enquiry_status_history
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- DATA RETENTION: Auto-delete enquiries older than 6 months
-- ============================================
-- This function can be called by a cron job or manually
CREATE OR REPLACE FUNCTION cleanup_old_enquiries()
RETURNS void AS $$
BEGIN
  DELETE FROM enquiries
  WHERE submitted_at < NOW() - INTERVAL '6 months';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SEED DATA (Optional - run separately if needed)
-- ============================================
-- See seed.sql for initial data
