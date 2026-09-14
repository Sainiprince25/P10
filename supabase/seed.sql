-- P.S Service Provider - Seed Data
-- Run this after the schema migration to populate initial data

-- ============================================
-- BUSINESS INFO (singleton)
-- ============================================
INSERT INTO business_info (id, name, phone, whatsapp, email, address, description, service_areas, business_hours)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'P.S Service Provider',
  '+917982548842',
  '917982548842',
  'info@psserviceprovider.com',
  'Delhi NCR, India',
  'Professional pest control services across Delhi, Gurugram, Noida & Faridabad. Safe, reliable, and effective solutions for homes and businesses.',
  ARRAY['Delhi', 'Gurugram', 'Noida', 'Faridabad'],
  'To Be Confirmed'
);

-- ============================================
-- SERVICES
-- ============================================
INSERT INTO services (name, slug, short_description, full_description, icon, category, order_index) VALUES
('General Pest Control', 'general-pest-control', 'Comprehensive pest management for your home or business. We eliminate common pests and create a protective barrier.', 'Our general pest control service provides comprehensive coverage against common household and commercial pests. Using safe, effective treatments, we create a protective barrier around your property that keeps pests away. Our trained technicians identify entry points, apply targeted treatments, and provide follow-up support to ensure lasting results.', '🛡️', 'general', 1),
('Cockroach Control', 'cockroach-control', 'Targeted cockroach elimination using advanced gel baiting and residual spray treatments.', 'Cockroaches pose serious health risks by spreading bacteria and triggering allergies. Our cockroach control service uses advanced gel baiting technology combined with residual spray treatments to eliminate infestations at their source. We treat kitchens, bathrooms, drainage areas, and all potential harbourage points to ensure complete elimination.', '🪳', 'general', 2),
('Termite Control', 'termite-control', 'Protect your property from termite damage with our pre and post-construction anti-termite treatments.', 'Termites cause silent but devastating damage to wooden structures, furniture, and building foundations. Our termite control service includes thorough inspection, soil treatment, wood treatment, and create chemical barriers to protect your property. We offer both pre-construction and post-construction anti-termite solutions using approved, effective chemicals.', '🏠', 'general', 3),
('Mosquito Control', 'mosquito-control', 'Effective mosquito management to protect your family from dengue, malaria, and other mosquito-borne diseases.', 'Mosquitoes are more than a nuisance — they carry serious diseases like dengue, malaria, and chikungunya. Our mosquito control service targets breeding sites, applies residual treatments to resting areas, and creates protective barriers around your property. We use fogging, larviciding, and space treatment methods appropriate for your environment.', '🦟', 'general', 4),
('Bed Bug Control', 'bed-bug-control', 'Complete bed bug elimination using heat treatment and chemical application for lasting relief.', 'Bed bugs are notoriously difficult to eliminate. Our bed bug control service combines thorough inspection with targeted chemical treatments and heat application to eliminate bed bugs at all life stages. We treat mattresses, bed frames, furniture, cracks, and crevices where bed bugs hide. Our treatment protocol ensures complete elimination with follow-up inspections.', '🛏️', 'general', 5),
('Rodent/Rat Control', 'rodent-control', 'Professional rodent management using bait stations, traps, and proofing to prevent re-entry.', 'Rats and rodents cause property damage, contaminate food, and spread diseases. Our rodent control service includes thorough inspection to identify activity areas, strategic placement of bait stations and traps, and proofing work to seal entry points. We use safe, tamper-resistant bait stations and provide ongoing monitoring to prevent re-infestation.', '🐀', 'general', 6),
('Ant Control', 'ant-control', 'Effective ant colony elimination using targeted baiting and barrier treatments.', 'Ants can invade homes and businesses in large numbers, contaminating food and causing discomfort. Our ant control service identifies the species, locates colonies, and uses targeted baiting and residual barrier treatments to eliminate the entire colony. We treat entry points, trails, and nesting areas for comprehensive control.', '🐜', 'general', 7),
('Fly Control', 'fly-control', 'Professional fly management for restaurants, homes, and commercial spaces using integrated methods.', 'Flies are carriers of numerous diseases and a sign of hygiene issues. Our fly control service uses integrated pest management including fly traps, UV light traps, residual sprays, and breeding site elimination. Particularly important for restaurants, food businesses, and hospitals, our service helps maintain hygiene standards and regulatory compliance.', '🪰', 'general', 8),
('Residential Pest Control', 'residential-pest-control', 'Complete pest management solutions tailored for homes, apartments, and residential complexes.', 'Our residential pest control service is designed specifically for homes and families. We understand the unique challenges of residential pest management and use family-safe, pet-friendly products wherever possible. Whether you live in an apartment, independent house, or residential complex, we provide customized treatment plans that protect your home and loved ones.', '🏡', 'residential', 9),
('Commercial Pest Control', 'commercial-pest-control', 'Professional pest management for offices, restaurants, hotels, warehouses, and institutions.', 'Commercial properties require specialized pest management to meet hygiene standards, regulatory requirements, and protect business reputation. Our commercial pest control service provides customized treatment plans for offices, restaurants, hotels, warehouses, schools, hospitals, and other commercial spaces. We offer scheduled maintenance programs, detailed reporting, and compliance documentation.', '🏢', 'commercial', 10);

-- ============================================
-- FAQS
-- ============================================
INSERT INTO faqs (question, answer, order_index) VALUES
('Is pest control treatment safe for my family and pets?', 'Yes, our treatments are designed to be safe for families and pets. We use approved, government-registered products and apply them following strict safety protocols. Our technicians advise on any necessary precautions such as ventilating the area and keeping children and pets away during and immediately after treatment.', 1),
('How should I prepare before pest control treatment?', 'Preparation depends on the type of treatment. Generally, we recommend clearing kitchen counters, covering or removing food items, moving furniture away from walls, and ensuring access to treatment areas. Our team will provide specific preparation instructions when you book your service.', 2),
('How long does a pest control treatment take?', 'Treatment duration varies based on property size and type of pest. A standard apartment treatment typically takes 1-2 hours, while larger properties or specialized treatments may take longer. Our technician will provide a time estimate during the initial inspection.', 3),
('What does the 1-month service guarantee cover?', 'Our 1-month service guarantee covers follow-up treatment if the same pest problem recurs within one month of the original service. If pests return, we will revisit and treat the area at no additional cost, subject to our service terms and conditions.', 4),
('Do you serve both homes and businesses?', 'Yes, we provide pest control services for both residential and commercial properties. This includes homes, apartments, offices, restaurants, hotels, shops, warehouses, schools, hospitals, and other commercial or institutional spaces across Delhi NCR.', 5),
('Which areas do you cover?', 'We currently serve Delhi, Gurugram, Noida, and Faridabad. If you are located in these areas, we can provide pest control services at your location. Contact us to confirm service availability in your specific area.', 6),
('How do I book a pest control service?', 'You can book a service through our website booking form, by calling us directly, or by sending us a WhatsApp message. Simply provide your details, select the service you need, and choose a preferred date and time. Our team will confirm your booking and provide further instructions.', 7),
('What precautions should children and pets take during treatment?', 'During treatment, we recommend keeping children and pets away from treated areas. After treatment, ensure proper ventilation and wait for the recommended time before re-entering treated spaces. Our technician will provide specific safety instructions based on the treatment type.', 8),
('Is follow-up service available?', 'Yes, follow-up service is available and is included in our 1-month service guarantee. If the pest problem persists or recurs within the guarantee period, we will provide follow-up treatment. Additional follow-up visits beyond the guarantee period can be arranged.', 9),
('How do I receive a quotation for pest control services?', 'You can receive a quotation by submitting an enquiry through our website, calling us, or messaging us on WhatsApp. After understanding your requirements, property type, and pest issue, we will provide a detailed quotation. Quotations are customized based on your specific needs.', 10);

-- ============================================
-- TESTIMONIALS
-- ============================================
INSERT INTO testimonials (name, type, location, review, rating, is_demo) VALUES
('Rajesh Kumar', 'residential', 'Delhi', 'Excellent service! The team was professional and thorough. Our cockroach problem is completely resolved. Highly recommended for residential pest control.', 5, true),
('Priya Sharma', 'residential', 'Gurugram', 'Very satisfied with the termite treatment. The technicians explained everything clearly and the follow-up was prompt. Great peace of mind for our home.', 5, true),
('Amit Restaurant', 'commercial', 'Noida', 'As a restaurant, pest control is critical for us. P.S Service Provider provides reliable scheduled service that keeps our establishment pest-free and compliant. Professional and punctual.', 5, true),
('Sunita Verma', 'residential', 'Faridabad', 'Had a severe bed bug issue that other services could not resolve. P.S Service Provider treated the problem effectively with their comprehensive approach. Very grateful!', 4, true),
('TechPark Offices', 'commercial', 'Gurugram', 'We use their commercial pest management service for our office complex. Consistent, professional, and well-documented. Their team understands commercial requirements perfectly.', 5, true),
('Manish Gupta', 'residential', 'Delhi', 'Quick response, fair service, and effective results. The mosquito control treatment made a noticeable difference. The team was courteous and wore proper protective equipment.', 4, true);

-- ============================================
-- HERO MESSAGES
-- ============================================
INSERT INTO hero_messages (text, order_index) VALUES
('Professional Pest Control for Your Home', 1),
('Protect Your Family From Unwanted Pests', 2),
('Reliable Pest Control for Businesses', 3),
('Safe & Effective Pest Management', 4),
('Serving Delhi, Gurugram, Noida & Faridabad', 5);
