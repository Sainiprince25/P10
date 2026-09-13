export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  category: 'general' | 'residential' | 'commercial';
  active: boolean;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  active: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  type: 'residential' | 'commercial';
  location: string;
  review: string;
  rating: number;
  isDemo: boolean;
  active: boolean;
}

export interface HeroMessage {
  id: string;
  text: string;
  active: boolean;
  order: number;
}

export interface Enquiry {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  service: string;
  propertyType: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  details: string;
  status: 'new' | 'contacted' | 'quoted' | 'booked' | 'completed';
  adminNotes: string;
  submittedAt: string;
  statusHistory: { status: string; date: string; note: string }[];
}

export interface BusinessInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  description: string;
  serviceAreas: string[];
  businessHours: string;
}

export const defaultBusinessInfo: BusinessInfo = {
  name: 'P.S Service Provider',
  phone: '+917982548842',
  whatsapp: '917982548842',
  email: 'info@psserviceprovider.com',
  address: 'Delhi NCR, India',
  description: 'Professional pest control services across Delhi, Gurugram, Noida & Faridabad. Safe, reliable, and effective solutions for homes and businesses.',
  serviceAreas: ['Delhi', 'Gurugram', 'Noida', 'Faridabad'],
  businessHours: 'To Be Confirmed',
};

export const defaultServices: Service[] = [
  {
    id: '1', name: 'General Pest Control', slug: 'general-pest-control',
    shortDescription: 'Comprehensive pest management for your home or business. We eliminate common pests and create a protective barrier.',
    fullDescription: 'Our general pest control service provides comprehensive coverage against common household and commercial pests. Using safe, effective treatments, we create a protective barrier around your property that keeps pests away. Our trained technicians identify entry points, apply targeted treatments, and provide follow-up support to ensure lasting results.',
    icon: '🛡️', category: 'general', active: true, order: 1
  },
  {
    id: '2', name: 'Cockroach Control', slug: 'cockroach-control',
    shortDescription: 'Targeted cockroach elimination using advanced gel baiting and residual spray treatments.',
    fullDescription: 'Cockroaches pose serious health risks by spreading bacteria and triggering allergies. Our cockroach control service uses advanced gel baiting technology combined with residual spray treatments to eliminate infestations at their source. We treat kitchens, bathrooms, drainage areas, and all potential harbourage points to ensure complete elimination.',
    icon: '🪳', category: 'general', active: true, order: 2
  },
  {
    id: '3', name: 'Termite Control', slug: 'termite-control',
    shortDescription: 'Protect your property from termite damage with our pre and post-construction anti-termite treatments.',
    fullDescription: 'Termites cause silent but devastating damage to wooden structures, furniture, and building foundations. Our termite control service includes thorough inspection, soil treatment, wood treatment, and create chemical barriers to protect your property. We offer both pre-construction and post-construction anti-termite solutions using approved, effective chemicals.',
    icon: '🏠', category: 'general', active: true, order: 3
  },
  {
    id: '4', name: 'Mosquito Control', slug: 'mosquito-control',
    shortDescription: 'Effective mosquito management to protect your family from dengue, malaria, and other mosquito-borne diseases.',
    fullDescription: 'Mosquitoes are more than a nuisance — they carry serious diseases like dengue, malaria, and chikungunya. Our mosquito control service targets breeding sites, applies residual treatments to resting areas, and creates protective barriers around your property. We use fogging, larviciding, and space treatment methods appropriate for your environment.',
    icon: '🦟', category: 'general', active: true, order: 4
  },
  {
    id: '5', name: 'Bed Bug Control', slug: 'bed-bug-control',
    shortDescription: 'Complete bed bug elimination using heat treatment and chemical application for lasting relief.',
    fullDescription: 'Bed bugs are notoriously difficult to eliminate. Our bed bug control service combines thorough inspection with targeted chemical treatments and heat application to eliminate bed bugs at all life stages. We treat mattresses, bed frames, furniture, cracks, and crevices where bed bugs hide. Our treatment protocol ensures complete elimination with follow-up inspections.',
    icon: '🛏️', category: 'general', active: true, order: 5
  },
  {
    id: '6', name: 'Rodent/Rat Control', slug: 'rodent-control',
    shortDescription: 'Professional rodent management using bait stations, traps, and proofing to prevent re-entry.',
    fullDescription: 'Rats and rodents cause property damage, contaminate food, and spread diseases. Our rodent control service includes thorough inspection to identify activity areas, strategic placement of bait stations and traps, and proofing work to seal entry points. We use safe, tamper-resistant bait stations and provide ongoing monitoring to prevent re-infestation.',
    icon: '🐀', category: 'general', active: true, order: 6
  },
  {
    id: '7', name: 'Ant Control', slug: 'ant-control',
    shortDescription: 'Effective ant colony elimination using targeted baiting and barrier treatments.',
    fullDescription: 'Ants can invade homes and businesses in large numbers, contaminating food and causing discomfort. Our ant control service identifies the species, locates colonies, and uses targeted baiting and residual barrier treatments to eliminate the entire colony. We treat entry points, trails, and nesting areas for comprehensive control.',
    icon: '🐜', category: 'general', active: true, order: 7
  },
  {
    id: '8', name: 'Fly Control', slug: 'fly-control',
    shortDescription: 'Professional fly management for restaurants, homes, and commercial spaces using integrated methods.',
    fullDescription: 'Flies are carriers of numerous diseases and a sign of hygiene issues. Our fly control service uses integrated pest management including fly traps, UV light traps, residual sprays, and breeding site elimination. Particularly important for restaurants, food businesses, and hospitals, our service helps maintain hygiene standards and regulatory compliance.',
    icon: '🪰', category: 'general', active: true, order: 8
  },
  {
    id: '9', name: 'Residential Pest Control', slug: 'residential-pest-control',
    shortDescription: 'Complete pest management solutions tailored for homes, apartments, and residential complexes.',
    fullDescription: 'Our residential pest control service is designed specifically for homes and families. We understand the unique challenges of residential pest management and use family-safe, pet-friendly products wherever possible. Whether you live in an apartment, independent house, or residential complex, we provide customized treatment plans that protect your home and loved ones.',
    icon: '🏡', category: 'residential', active: true, order: 9
  },
  {
    id: '10', name: 'Commercial Pest Control', slug: 'commercial-pest-control',
    shortDescription: 'Professional pest management for offices, restaurants, hotels, warehouses, and institutions.',
    fullDescription: 'Commercial properties require specialized pest management to meet hygiene standards, regulatory requirements, and protect business reputation. Our commercial pest control service provides customized treatment plans for offices, restaurants, hotels, warehouses, schools, hospitals, and other commercial spaces. We offer scheduled maintenance programs, detailed reporting, and compliance documentation.',
    icon: '🏢', category: 'commercial', active: true, order: 10
  },
];

export const defaultFAQs: FAQ[] = [
  { id: '1', question: 'Is pest control treatment safe for my family and pets?', answer: 'Yes, our treatments are designed to be safe for families and pets. We use approved, government-registered products and apply them following strict safety protocols. Our technicians advise on any necessary precautions such as ventilating the area and keeping children and pets away during and immediately after treatment.', active: true, order: 1 },
  { id: '2', question: 'How should I prepare before pest control treatment?', answer: 'Preparation depends on the type of treatment. Generally, we recommend clearing kitchen counters, covering or removing food items, moving furniture away from walls, and ensuring access to treatment areas. Our team will provide specific preparation instructions when you book your service.', active: true, order: 2 },
  { id: '3', question: 'How long does a pest control treatment take?', answer: 'Treatment duration varies based on property size and type of pest. A standard apartment treatment typically takes 1-2 hours, while larger properties or specialized treatments may take longer. Our technician will provide a time estimate during the initial inspection.', active: true, order: 3 },
  { id: '4', question: 'What does the 1-month service guarantee cover?', answer: 'Our 1-month service guarantee covers follow-up treatment if the same pest problem recurs within one month of the original service. If pests return, we will revisit and treat the area at no additional cost, subject to our service terms and conditions.', active: true, order: 4 },
  { id: '5', question: 'Do you serve both homes and businesses?', answer: 'Yes, we provide pest control services for both residential and commercial properties. This includes homes, apartments, offices, restaurants, hotels, shops, warehouses, schools, hospitals, and other commercial or institutional spaces across Delhi NCR.', active: true, order: 5 },
  { id: '6', question: 'Which areas do you cover?', answer: 'We currently serve Delhi, Gurugram, Noida, and Faridabad. If you are located in these areas, we can provide pest control services at your location. Contact us to confirm service availability in your specific area.', active: true, order: 6 },
  { id: '7', question: 'How do I book a pest control service?', answer: 'You can book a service through our website booking form, by calling us directly, or by sending us a WhatsApp message. Simply provide your details, select the service you need, and choose a preferred date and time. Our team will confirm your booking and provide further instructions.', active: true, order: 7 },
  { id: '8', question: 'What precautions should children and pets take during treatment?', answer: 'During treatment, we recommend keeping children and pets away from treated areas. After treatment, ensure proper ventilation and wait for the recommended time before re-entering treated spaces. Our technician will provide specific safety instructions based on the treatment type.', active: true, order: 8 },
  { id: '9', question: 'Is follow-up service available?', answer: 'Yes, follow-up service is available and is included in our 1-month service guarantee. If the pest problem persists or recurs within the guarantee period, we will provide follow-up treatment. Additional follow-up visits beyond the guarantee period can be arranged.', active: true, order: 9 },
  { id: '10', question: 'How do I receive a quotation for pest control services?', answer: 'You can receive a quotation by submitting an enquiry through our website, calling us, or messaging us on WhatsApp. After understanding your requirements, property type, and pest issue, we will provide a detailed quotation. Quotations are customized based on your specific needs.', active: true, order: 10 },
];

export const defaultTestimonials: Testimonial[] = [
  { id: '1', name: 'Rajesh Kumar', type: 'residential', location: 'Delhi', review: 'Excellent service! The team was professional and thorough. Our cockroach problem is completely resolved. Highly recommended for residential pest control.', rating: 5, isDemo: true, active: true },
  { id: '2', name: 'Priya Sharma', type: 'residential', location: 'Gurugram', review: 'Very satisfied with the termite treatment. The technicians explained everything clearly and the follow-up was prompt. Great peace of mind for our home.', rating: 5, isDemo: true, active: true },
  { id: '3', name: 'Amit Restaurant', type: 'commercial', location: 'Noida', review: 'As a restaurant, pest control is critical for us. P.S Service Provider provides reliable scheduled service that keeps our establishment pest-free and compliant. Professional and punctual.', rating: 5, isDemo: true, active: true },
  { id: '4', name: 'Sunita Verma', type: 'residential', location: 'Faridabad', review: 'Had a severe bed bug issue that other services could not resolve. P.S Service Provider treated the problem effectively with their comprehensive approach. Very grateful!', rating: 4, isDemo: true, active: true },
  { id: '5', name: 'TechPark Offices', type: 'commercial', location: 'Gurugram', review: 'We use their commercial pest management service for our office complex. Consistent, professional, and well-documented. Their team understands commercial requirements perfectly.', rating: 5, isDemo: true, active: true },
  { id: '6', name: 'Manish Gupta', type: 'residential', location: 'Delhi', review: 'Quick response, fair service, and effective results. The mosquito control treatment made a noticeable difference. The team was courteous and wore proper protective equipment.', rating: 4, isDemo: true, active: true },
];

export const defaultHeroMessages: HeroMessage[] = [
  { id: '1', text: 'Professional Pest Control for Your Home', active: true, order: 1 },
  { id: '2', text: 'Protect Your Family From Unwanted Pests', active: true, order: 2 },
  { id: '3', text: 'Reliable Pest Control for Businesses', active: true, order: 3 },
  { id: '4', text: 'Safe & Effective Pest Management', active: true, order: 4 },
  { id: '5', text: 'Serving Delhi, Gurugram, Noida & Faridabad', active: true, order: 5 },
];

export const locationData = {
  delhi: {
    name: 'Delhi',
    slug: 'delhi',
    description: 'Professional pest control services across all areas of Delhi including South Delhi, North Delhi, East Delhi, West Delhi, and Central Delhi. We serve residential homes, apartments, offices, restaurants, and commercial establishments throughout the capital.',
    areas: ['South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'Dwarka', 'Rohini', 'Janakpuri', 'Lajpat Nagar', 'Saket', 'Vasant Kunj', 'Karol Bagh'],
  },
  gurugram: {
    name: 'Gurugram',
    slug: 'gurugram',
    description: 'Expert pest control services in Gurugram covering residential sectors, corporate offices, hotels, and commercial complexes. We serve DLF phases, Sohna Road, Golf Course Road, and all major areas of the Millennium City.',
    areas: ['DLF Phases', 'Sohna Road', 'Golf Course Road', 'Sector 56', 'Sector 49', 'MG Road', 'Cyber City', 'Udyog Vihar', 'Palam Vihar', 'Sector 57'],
  },
  noida: {
    name: 'Noida',
    slug: 'noida',
    description: 'Comprehensive pest control solutions in Noida for homes, apartments, offices, and commercial establishments. We cover all sectors including Sector 62, Sector 18, Sector 15, Greater Noida, and Noida Extension.',
    areas: ['Sector 62', 'Sector 18', 'Sector 15', 'Sector 50', 'Sector 76', 'Greater Noida', 'Noida Extension', 'Film City', 'Sector 128', 'Sector 137'],
  },
  faridabad: {
    name: 'Faridabad',
    slug: 'faridabad',
    description: 'Reliable pest control services in Faridabad serving residential colonies, industrial areas, offices, and commercial properties. We cover Sector 15-17, NIT, Ballabgarh, and all major Faridabad localities.',
    areas: ['Sector 15', 'Sector 16', 'Sector 17', 'NIT', 'Ballabgarh', 'Sector 21', 'Sector 37', 'Greenfield Colony', 'Surajkund', 'Old Faridabad'],
  },
};

export const propertyTypes = [
  'Home/Residential', 'Office', 'Restaurant', 'Hotel', 'Shop', 'Warehouse', 'School', 'Hospital', 'Other'
];

export const timeSlots = [
  'Morning: 9 AM – 12 PM',
  'Afternoon: 12 PM – 3 PM',
  'Evening: 3 PM – 6 PM',
];
