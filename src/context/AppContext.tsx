import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Service, FAQ, Testimonial, HeroMessage, Enquiry, BusinessInfo,
  defaultServices, defaultFAQs, defaultTestimonials, defaultHeroMessages, defaultBusinessInfo
} from '../data/content';

interface AppState {
  services: Service[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  heroMessages: HeroMessage[];
  enquiries: Enquiry[];
  businessInfo: BusinessInfo;
  isAdminAuthenticated: boolean;
}

interface AppContextType extends AppState {
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'status' | 'adminNotes' | 'submittedAt' | 'statusHistory'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status'], note?: string) => void;
  updateEnquiryNotes: (id: string, notes: string) => void;
  updateService: (service: Service) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;
  updateFAQ: (faq: FAQ) => void;
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  deleteFAQ: (id: string) => void;
  updateTestimonial: (t: Testimonial) => void;
  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  updateHeroMessage: (h: HeroMessage) => void;
  addHeroMessage: (h: Omit<HeroMessage, 'id'>) => void;
  deleteHeroMessage: (id: string) => void;
  updateBusinessInfo: (info: BusinessInfo) => void;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) { /* ignore */ }
  return defaultValue;
}

function saveToStorage(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(() => loadFromStorage('ps_services', defaultServices));
  const [faqs, setFaqs] = useState<FAQ[]>(() => loadFromStorage('ps_faqs', defaultFAQs));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadFromStorage('ps_testimonials', defaultTestimonials));
  const [heroMessages, setHeroMessages] = useState<HeroMessage[]>(() => loadFromStorage('ps_hero', defaultHeroMessages));
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => loadFromStorage('ps_enquiries', []));
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => loadFromStorage('ps_business', defaultBusinessInfo));
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => loadFromStorage('ps_admin_auth', false));

  useEffect(() => { saveToStorage('ps_services', services); }, [services]);
  useEffect(() => { saveToStorage('ps_faqs', faqs); }, [faqs]);
  useEffect(() => { saveToStorage('ps_testimonials', testimonials); }, [testimonials]);
  useEffect(() => { saveToStorage('ps_hero', heroMessages); }, [heroMessages]);
  useEffect(() => { saveToStorage('ps_enquiries', enquiries); }, [enquiries]);
  useEffect(() => { saveToStorage('ps_business', businessInfo); }, [businessInfo]);
  useEffect(() => { saveToStorage('ps_admin_auth', isAdminAuthenticated); }, [isAdminAuthenticated]);

  const addEnquiry = (data: Omit<Enquiry, 'id' | 'status' | 'adminNotes' | 'submittedAt' | 'statusHistory'>) => {
    const enquiry: Enquiry = {
      ...data,
      id: `ENQ-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      status: 'new',
      adminNotes: '',
      submittedAt: new Date().toISOString(),
      statusHistory: [{ status: 'new', date: new Date().toISOString(), note: 'Enquiry received' }],
    };
    setEnquiries(prev => [enquiry, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status'], note?: string) => {
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
  };

  const updateEnquiryNotes = (id: string, notes: string) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, adminNotes: notes } : e));
  };

  const updateService = (service: Service) => setServices(prev => prev.map(s => s.id === service.id ? service : s));
  const addService = (service: Omit<Service, 'id'>) => setServices(prev => [...prev, { ...service, id: `srv-${Date.now()}` }]);
  const deleteService = (id: string) => setServices(prev => prev.filter(s => s.id !== id));

  const updateFAQ = (faq: FAQ) => setFaqs(prev => prev.map(f => f.id === faq.id ? faq : f));
  const addFAQ = (faq: Omit<FAQ, 'id'>) => setFaqs(prev => [...prev, { ...faq, id: `faq-${Date.now()}` }]);
  const deleteFAQ = (id: string) => setFaqs(prev => prev.filter(f => f.id !== id));

  const updateTestimonial = (t: Testimonial) => setTestimonials(prev => prev.map(x => x.id === t.id ? t : x));
  const addTestimonial = (t: Omit<Testimonial, 'id'>) => setTestimonials(prev => [...prev, { ...t, id: `tst-${Date.now()}` }]);
  const deleteTestimonial = (id: string) => setTestimonials(prev => prev.filter(x => x.id !== id));

  const updateHeroMessage = (h: HeroMessage) => setHeroMessages(prev => prev.map(x => x.id === h.id ? h : x));
  const addHeroMessage = (h: Omit<HeroMessage, 'id'>) => setHeroMessages(prev => [...prev, { ...h, id: `hero-${Date.now()}` }]);
  const deleteHeroMessage = (id: string) => setHeroMessages(prev => prev.filter(x => x.id !== id));

  const updateBusinessInfo = (info: BusinessInfo) => setBusinessInfo(info);

  const adminLogin = (email: string, password: string): boolean => {
    // Demo credentials - in production this would be server-side
    if (email === 'admin@psserviceprovider.com' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => setIsAdminAuthenticated(false);

  return (
    <AppContext.Provider value={{
      services, faqs, testimonials, heroMessages, enquiries, businessInfo, isAdminAuthenticated,
      addEnquiry, updateEnquiryStatus, updateEnquiryNotes,
      updateService, addService, deleteService,
      updateFAQ, addFAQ, deleteFAQ,
      updateTestimonial, addTestimonial, deleteTestimonial,
      updateHeroMessage, addHeroMessage, deleteHeroMessage,
      updateBusinessInfo, adminLogin, adminLogout,
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
