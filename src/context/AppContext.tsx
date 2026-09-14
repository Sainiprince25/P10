import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Service, FAQ, Testimonial, HeroMessage, Enquiry, BusinessInfo,
  defaultServices, defaultFAQs, defaultTestimonials, defaultHeroMessages, defaultBusinessInfo
} from '../data/content';
import * as db from '../lib/database';
import * as auth from '../lib/auth';
import { isSupabaseConfigured } from '../lib/supabase';

interface AppState {
  services: Service[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  heroMessages: HeroMessage[];
  enquiries: Enquiry[];
  businessInfo: BusinessInfo;
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  isSupabaseConnected: boolean;
}

interface AppContextType extends AppState {
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'status' | 'adminNotes' | 'submittedAt' | 'statusHistory'>) => Promise<boolean>;
  updateEnquiryStatus: (id: string, status: Enquiry['status'], note?: string) => Promise<boolean>;
  updateEnquiryNotes: (id: string, notes: string) => Promise<boolean>;
  updateService: (service: Service) => Promise<boolean>;
  addService: (service: Omit<Service, 'id'>) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  updateFAQ: (faq: FAQ) => Promise<boolean>;
  addFAQ: (faq: Omit<FAQ, 'id'>) => Promise<boolean>;
  deleteFAQ: (id: string) => Promise<boolean>;
  updateTestimonial: (t: Testimonial) => Promise<boolean>;
  addTestimonial: (t: Omit<Testimonial, 'id'>) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;
  updateHeroMessage: (h: HeroMessage) => Promise<boolean>;
  addHeroMessage: (h: Omit<HeroMessage, 'id'>) => Promise<boolean>;
  deleteHeroMessage: (id: string) => Promise<boolean>;
  updateBusinessInfo: (info: BusinessInfo) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFAQs);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [heroMessages, setHeroMessages] = useState<HeroMessage[]>(defaultHeroMessages);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(defaultBusinessInfo);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load all data from Supabase on mount
  const loadData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    try {
      const [servicesData, faqsData, testimonialsData, heroData, businessData, enquiriesData] = await Promise.all([
        db.fetchServices(),
        db.fetchFAQs(),
        db.fetchTestimonials(),
        db.fetchHeroMessages(),
        db.fetchBusinessInfo(),
        db.fetchEnquiries(),
      ]);

      if (servicesData.length > 0) setServices(servicesData);
      if (faqsData.length > 0) setFaqs(faqsData);
      if (testimonialsData.length > 0) setTestimonials(testimonialsData);
      if (heroData.length > 0) setHeroMessages(heroData);
      if (businessData) setBusinessInfo(businessData);
      setEnquiries(enquiriesData);

      // Check auth state
      const user = await auth.getCurrentUser();
      if (user) setIsAdminAuthenticated(true);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Listen for auth state changes
    let unsubscribe: (() => void) | undefined;
    
    auth.onAuthStateChange((user) => {
      setIsAdminAuthenticated(!!user);
    }).then(unsub => {
      unsubscribe = unsub;
    });

    // For demo mode, persist auth state in localStorage
    // This is ONLY for development without Supabase
    if (!isSupabaseConfigured && import.meta.env.DEV) {
      const savedAuth = localStorage.getItem('ps_admin_auth');
      if (savedAuth === 'true') {
        setIsAdminAuthenticated(true);
      }
    }

    return () => { 
      if (unsubscribe) unsubscribe(); 
    };
  }, [loadData]);

  // Persist demo auth state (development only)
  useEffect(() => {
    if (!isSupabaseConfigured && import.meta.env.DEV) {
      localStorage.setItem('ps_admin_auth', String(isAdminAuthenticated));
    }
  }, [isAdminAuthenticated]);

  // ============================================
  // ENQUIRIES
  // ============================================
  const addEnquiry = async (data: Omit<Enquiry, 'id' | 'status' | 'adminNotes' | 'submittedAt' | 'statusHistory'>): Promise<boolean> => {
    if (isSupabaseConfigured) {
      const result = await db.createEnquiry(data);
      if (result) {
        setEnquiries(prev => [result, ...prev]);
        return true;
      }
      return false;
    }

    // Fallback for demo mode
    const enquiry: Enquiry = {
      ...data,
      id: `ENQ-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      status: 'new',
      adminNotes: '',
      submittedAt: new Date().toISOString(),
      statusHistory: [{ status: 'new', date: new Date().toISOString(), note: 'Enquiry received' }],
    };
    setEnquiries(prev => [enquiry, ...prev]);
    return true;
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status'], note?: string): Promise<boolean> => {
    // Optimistic update
    setEnquiries(prev => prev.map(e => {
      if (e.id === id) {
        return {
          ...e,
          status,
          statusHistory: [...e.statusHistory, { status, date: new Date().toISOString(), note: note || `Status changed to ${status}` }]
        };
      }
      return e;
    }));

    if (isSupabaseConfigured) {
      const success = await db.updateEnquiryStatus(id, status, note);
      if (!success) {
        // Revert on failure
        await loadData();
      }
      return success;
    }
    return true;
  };

  const updateEnquiryNotes = async (id: string, notes: string): Promise<boolean> => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, adminNotes: notes } : e));

    if (isSupabaseConfigured) {
      return await db.updateEnquiryNotes(id, notes);
    }
    return true;
  };

  // ============================================
  // SERVICES
  // ============================================
  const updateService = async (service: Service): Promise<boolean> => {
    setServices(prev => prev.map(s => s.id === service.id ? service : s));
    if (isSupabaseConfigured) {
      return await db.updateService(service);
    }
    return true;
  };

  const addService = async (service: Omit<Service, 'id'>): Promise<boolean> => {
    if (isSupabaseConfigured) {
      const result = await db.createService(service);
      if (result) {
        setServices(prev => [...prev, result]);
        return true;
      }
      return false;
    }
    setServices(prev => [...prev, { ...service, id: `srv-${Date.now()}` }]);
    return true;
  };

  const deleteService = async (id: string): Promise<boolean> => {
    setServices(prev => prev.filter(s => s.id !== id));
    if (isSupabaseConfigured) {
      return await db.deleteService(id);
    }
    return true;
  };

  // ============================================
  // FAQS
  // ============================================
  const updateFAQ = async (faq: FAQ): Promise<boolean> => {
    setFaqs(prev => prev.map(f => f.id === faq.id ? faq : f));
    if (isSupabaseConfigured) return await db.updateFAQ(faq);
    return true;
  };

  const addFAQ = async (faq: Omit<FAQ, 'id'>): Promise<boolean> => {
    if (isSupabaseConfigured) {
      const result = await db.createFAQ(faq);
      if (result) { setFaqs(prev => [...prev, result]); return true; }
      return false;
    }
    setFaqs(prev => [...prev, { ...faq, id: `faq-${Date.now()}` }]);
    return true;
  };

  const deleteFAQ = async (id: string): Promise<boolean> => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    if (isSupabaseConfigured) return await db.deleteFAQ(id);
    return true;
  };

  // ============================================
  // TESTIMONIALS
  // ============================================
  const updateTestimonial = async (t: Testimonial): Promise<boolean> => {
    setTestimonials(prev => prev.map(x => x.id === t.id ? t : x));
    if (isSupabaseConfigured) return await db.updateTestimonial(t);
    return true;
  };

  const addTestimonial = async (t: Omit<Testimonial, 'id'>): Promise<boolean> => {
    if (isSupabaseConfigured) {
      const result = await db.createTestimonial(t);
      if (result) { setTestimonials(prev => [...prev, result]); return true; }
      return false;
    }
    setTestimonials(prev => [...prev, { ...t, id: `tst-${Date.now()}` }]);
    return true;
  };

  const deleteTestimonial = async (id: string): Promise<boolean> => {
    setTestimonials(prev => prev.filter(x => x.id !== id));
    if (isSupabaseConfigured) return await db.deleteTestimonial(id);
    return true;
  };

  // ============================================
  // HERO MESSAGES
  // ============================================
  const updateHeroMessage = async (h: HeroMessage): Promise<boolean> => {
    setHeroMessages(prev => prev.map(x => x.id === h.id ? h : x));
    if (isSupabaseConfigured) return await db.updateHeroMessage(h);
    return true;
  };

  const addHeroMessage = async (h: Omit<HeroMessage, 'id'>): Promise<boolean> => {
    if (isSupabaseConfigured) {
      const result = await db.createHeroMessage(h);
      if (result) { setHeroMessages(prev => [...prev, result]); return true; }
      return false;
    }
    setHeroMessages(prev => [...prev, { ...h, id: `hero-${Date.now()}` }]);
    return true;
  };

  const deleteHeroMessage = async (id: string): Promise<boolean> => {
    setHeroMessages(prev => prev.filter(x => x.id !== id));
    if (isSupabaseConfigured) return await db.deleteHeroMessage(id);
    return true;
  };

  // ============================================
  // BUSINESS INFO
  // ============================================
  const updateBusinessInfo = async (info: BusinessInfo): Promise<boolean> => {
    setBusinessInfo(info);
    if (isSupabaseConfigured) return await db.updateBusinessInfo(info);
    return true;
  };

  // ============================================
  // AUTH
  // ============================================
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    const result = await auth.signIn(email, password);
    if (result.success) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const adminLogout = async (): Promise<void> => {
    await auth.signOut();
    setIsAdminAuthenticated(false);
  };

  const refreshData = async (): Promise<void> => {
    await loadData();
  };

  return (
    <AppContext.Provider value={{
      services, faqs, testimonials, heroMessages, enquiries, businessInfo,
      isAdminAuthenticated, isLoading, isSupabaseConnected: isSupabaseConfigured,
      addEnquiry, updateEnquiryStatus, updateEnquiryNotes,
      updateService, addService, deleteService,
      updateFAQ, addFAQ, deleteFAQ,
      updateTestimonial, addTestimonial, deleteTestimonial,
      updateHeroMessage, addHeroMessage, deleteHeroMessage,
      updateBusinessInfo, adminLogin, adminLogout, refreshData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
