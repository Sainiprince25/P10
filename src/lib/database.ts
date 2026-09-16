import { supabase, isSupabaseConfigured } from './supabase';
import type { Service, FAQ, Testimonial, HeroMessage, BusinessInfo, Enquiry } from '../data/content';

// ============================================
// SERVICES
// ============================================
export async function fetchServices(): Promise<Service[]> {
  if (!isSupabaseConfigured) return [];
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return (data || []).map(row => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    icon: row.icon,
    category: row.category,
    active: row.active,
    order: row.order_index,
  }));
}

export async function createService(service: Omit<Service, 'id'>): Promise<Service | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('services')
    .insert({
      name: service.name,
      slug: service.slug,
      short_description: service.shortDescription,
      full_description: service.fullDescription,
      icon: service.icon,
      category: service.category,
      active: service.active,
      order_index: service.order,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating service:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    shortDescription: data.short_description,
    fullDescription: data.full_description,
    icon: data.icon,
    category: data.category,
    active: data.active,
    order: data.order_index,
  };
}

export async function updateService(service: Service): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('services')
    .update({
      name: service.name,
      slug: service.slug,
      short_description: service.shortDescription,
      full_description: service.fullDescription,
      icon: service.icon,
      category: service.category,
      active: service.active,
      order_index: service.order,
    })
    .eq('id', service.id);

  if (error) {
    console.error('Error updating service:', error);
    return false;
  }

  return true;
}

export async function deleteService(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase.from('services').delete().eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    return false;
  }

  return true;
}

// ============================================
// FAQS
// ============================================
export async function fetchFAQs(): Promise<FAQ[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return (data || []).map(row => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    active: row.active,
    order: row.order_index,
  }));
}

export async function createFAQ(faq: Omit<FAQ, 'id'>): Promise<FAQ | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('faqs')
    .insert({
      question: faq.question,
      answer: faq.answer,
      active: faq.active,
      order_index: faq.order,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating FAQ:', error);
    return null;
  }

  return {
    id: data.id,
    question: data.question,
    answer: data.answer,
    active: data.active,
    order: data.order_index,
  };
}

export async function updateFAQ(faq: FAQ): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('faqs')
    .update({
      question: faq.question,
      answer: faq.answer,
      active: faq.active,
      order_index: faq.order,
    })
    .eq('id', faq.id);

  return !error;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase.from('faqs').delete().eq('id', id);
  return !error;
}

// ============================================
// TESTIMONIALS
// ============================================
export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return (data || []).map(row => ({
    id: row.id,
    name: row.name,
    type: row.type,
    location: row.location,
    review: row.review,
    rating: row.rating,
    isDemo: row.is_demo,
    active: row.active,
  }));
}

export async function createTestimonial(t: Omit<Testimonial, 'id'>): Promise<Testimonial | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('testimonials')
    .insert({
      name: t.name,
      type: t.type,
      location: t.location,
      review: t.review,
      rating: t.rating,
      is_demo: t.isDemo,
      active: t.active,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating testimonial:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    type: data.type,
    location: data.location,
    review: data.review,
    rating: data.rating,
    isDemo: data.is_demo,
    active: data.active,
  };
}

export async function updateTestimonial(t: Testimonial): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('testimonials')
    .update({
      name: t.name,
      type: t.type,
      location: t.location,
      review: t.review,
      rating: t.rating,
      is_demo: t.isDemo,
      active: t.active,
    })
    .eq('id', t.id);

  return !error;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  return !error;
}

// ============================================
// HERO MESSAGES
// ============================================
export async function fetchHeroMessages(): Promise<HeroMessage[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('hero_messages')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching hero messages:', error);
    return [];
  }

  return (data || []).map(row => ({
    id: row.id,
    text: row.text,
    active: row.active,
    order: row.order_index,
  }));
}

export async function createHeroMessage(h: Omit<HeroMessage, 'id'>): Promise<HeroMessage | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('hero_messages')
    .insert({
      text: h.text,
      active: h.active,
      order_index: h.order,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating hero message:', error);
    return null;
  }

  return {
    id: data.id,
    text: data.text,
    active: data.active,
    order: data.order_index,
  };
}

export async function updateHeroMessage(h: HeroMessage): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('hero_messages')
    .update({
      text: h.text,
      active: h.active,
      order_index: h.order,
    })
    .eq('id', h.id);

  return !error;
}

export async function deleteHeroMessage(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase.from('hero_messages').delete().eq('id', id);
  return !error;
}

// ============================================
// BUSINESS INFO
// ============================================
export async function fetchBusinessInfo(): Promise<BusinessInfo | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('business_info')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching business info:', error);
    return null;
  }

  return {
    name: data.name,
    phone: data.phone,
    whatsapp: data.whatsapp,
    email: data.email,
    address: data.address,
    description: data.description,
    serviceAreas: data.service_areas,
    businessHours: data.business_hours,
    googleMapsEmbed: data.google_maps_embed || '',
    googleMapsUrl: data.google_maps_url || '',
  };
}

export async function updateBusinessInfo(info: BusinessInfo): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  // Get the existing record ID
  const { data: existing } = await supabase
    .from('business_info')
    .select('id')
    .limit(1)
    .single();

  if (!existing) {
    // Insert new record
    const { error } = await supabase.from('business_info').insert({
      name: info.name,
      phone: info.phone,
      whatsapp: info.whatsapp,
      email: info.email,
      address: info.address,
      description: info.description,
      service_areas: info.serviceAreas,
      business_hours: info.businessHours,
      google_maps_embed: info.googleMapsEmbed || '',
      google_maps_url: info.googleMapsUrl || '',
    });
    return !error;
  }

  const { error } = await supabase
    .from('business_info')
    .update({
      name: info.name,
      phone: info.phone,
      whatsapp: info.whatsapp,
      email: info.email,
      address: info.address,
      description: info.description,
      service_areas: info.serviceAreas,
      business_hours: info.businessHours,
      google_maps_embed: info.googleMapsEmbed || '',
      google_maps_url: info.googleMapsUrl || '',
    })
    .eq('id', existing.id);

  return !error;
}

// ============================================
// ENQUIRIES
// ============================================
export async function fetchEnquiries(): Promise<Enquiry[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching enquiries:', error);
    return [];
  }

  // Fetch status history for all enquiries
  const enquiryIds = (data || []).map(e => e.id);
  const { data: historyData } = await supabase
    .from('enquiry_status_history')
    .select('*')
    .in('enquiry_id', enquiryIds)
    .order('changed_at', { ascending: true });

  const historyMap = new Map<string, { status: string; date: string; note: string }[]>();
  (historyData || []).forEach(h => {
    if (!historyMap.has(h.enquiry_id)) {
      historyMap.set(h.enquiry_id, []);
    }
    historyMap.get(h.enquiry_id)!.push({
      status: h.status,
      date: h.changed_at,
      note: h.note || '',
    });
  });

  return (data || []).map(row => ({
    id: row.id,
    fullName: row.full_name,
    mobile: row.mobile,
    email: row.email || '',
    service: row.service,
    propertyType: row.property_type,
    location: row.location,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    details: row.details || '',
    status: row.status,
    adminNotes: row.admin_notes || '',
    submittedAt: row.submitted_at,
    statusHistory: historyMap.get(row.id) || [],
  }));
}

export async function createEnquiry(enquiry: Omit<Enquiry, 'id' | 'status' | 'adminNotes' | 'submittedAt' | 'statusHistory'>): Promise<Enquiry | null> {
  if (!isSupabaseConfigured) return null;

  const submittedAt = new Date().toISOString();

  const { data, error } = await supabase
    .from('enquiries')
    .insert({
      full_name: enquiry.fullName,
      mobile: enquiry.mobile,
      email: enquiry.email || null,
      service: enquiry.service,
      property_type: enquiry.propertyType,
      location: enquiry.location,
      preferred_date: enquiry.preferredDate,
      preferred_time: enquiry.preferredTime,
      details: enquiry.details || null,
      status: 'new',
      submitted_at: submittedAt,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating enquiry:', error);
    return null;
  }

  // Create initial status history entry
  await supabase.from('enquiry_status_history').insert({
    enquiry_id: data.id,
    status: 'new',
    note: 'Enquiry received',
  });

  return {
    id: data.id,
    fullName: data.full_name,
    mobile: data.mobile,
    email: data.email || '',
    service: data.service,
    propertyType: data.property_type,
    location: data.location,
    preferredDate: data.preferred_date,
    preferredTime: data.preferred_time,
    details: data.details || '',
    status: 'new',
    adminNotes: '',
    submittedAt: data.submitted_at,
    statusHistory: [{ status: 'new', date: submittedAt, note: 'Enquiry received' }],
  };
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status'], note?: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  // Update enquiry status
  const { error: updateError } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', id);

  if (updateError) {
    console.error('Error updating enquiry status:', updateError);
    return false;
  }

  // Add status history entry
  const { error: historyError } = await supabase
    .from('enquiry_status_history')
    .insert({
      enquiry_id: id,
      status,
      note: note || `Status changed to ${status}`,
    });

  if (historyError) {
    console.error('Error adding status history:', historyError);
  }

  return !updateError;
}

export async function updateEnquiryNotes(id: string, notes: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('enquiries')
    .update({ admin_notes: notes })
    .eq('id', id);

  return !error;
}
