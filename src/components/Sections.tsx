import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Star, MapPin, Quote, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Service } from '../data/content';

// Service Card with expand/collapse
export function ServiceCard({ service }: { service: Service }) {
  const [expanded, setExpanded] = useState(false);
  const { businessInfo } = useApp();
  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${service.name}. Please share details.`)}`;

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${expanded ? 'ring-2 ring-emerald-200' : ''}`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0">{service.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{service.shortDescription}</p>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
            <p className="text-sm text-gray-600 leading-relaxed">{service.fullDescription}</p>
          </div>
        )}

        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
            {expanded ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Learn More</>}
          </button>
          <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">
            <ArrowRight className="w-3 h-3" /> Book Service
          </Link>
        </div>
      </div>
    </div>
  );
}

// Testimonials Section
export function TestimonialsSection({ limit = 6 }: { limit?: number }) {
  const { testimonials } = useApp();
  const active = testimonials.filter(t => t.active).slice(0, limit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {active.map(t => (
        <div key={t.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <div className="relative mb-4">
            <Quote className="absolute -top-1 -left-1 w-6 h-6 text-emerald-100" />
            <p className="text-sm text-gray-600 leading-relaxed pl-4">{t.review}</p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <div>
              <p className="text-sm font-semibold text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-500 capitalize">{t.type}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin className="w-3 h-3" /> {t.location}
            </div>
          </div>
          {t.isDemo && <p className="text-xs text-gray-300 mt-2 italic">Demo testimonial</p>}
        </div>
      ))}
    </div>
  );
}

// FAQ Accordion
export function FAQAccordion({ faqs }: { faqs: { id: string; question: string; answer: string }[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map(faq => (
        <div key={faq.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors">
            <span className="text-sm font-semibold text-gray-900 pr-4">{faq.question}</span>
            {openId === faq.id ? <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
          </button>
          {openId === faq.id && (
            <div className="px-6 pb-4 animate-fadeIn">
              <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Stats Counter
export function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 1000, suffix: '+', label: 'Customers Served' },
    { value: 10, suffix: '+', label: 'Services Offered' },
    { value: 4, suffix: '', label: 'Cities Covered' },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-3xl lg:text-4xl font-extrabold text-emerald-600 mb-1">
            {isVisible ? stat.value : 0}{stat.suffix}
          </div>
          <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

// Section wrapper with scroll animation
export function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// CTA Banner
export function CTABanner({ title, subtitle }: { title: string; subtitle?: string }) {
  const { businessInfo } = useApp();
  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Hi, I need pest control services.')}`;

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 lg:p-12 text-center text-white">
      <h2 className="text-2xl lg:text-3xl font-bold mb-3">{title}</h2>
      {subtitle && <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
          Book Service
        </Link>
        <a href={`tel:${businessInfo.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700/30 text-white font-semibold rounded-xl hover:bg-emerald-700/50 transition-colors border border-white/20">
          Call Now
        </a>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600/30 text-white font-semibold rounded-xl hover:bg-green-600/50 transition-colors border border-white/20">
          WhatsApp
        </a>
      </div>
    </div>
  );
}
