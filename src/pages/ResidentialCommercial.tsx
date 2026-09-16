import React from 'react';
import { Home, Shield, CheckCircle, Users, Award, Bug, ArrowRight } from 'lucide-react';
import { AnimatedSection, StatsCounter, CTABanner, TestimonialsSection } from '../components/Sections';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export function ResidentialPage() {
  const { services, businessInfo } = useApp();
  const residentialServices = services.filter(s => s.active && (s.category === 'residential' || s.category === 'general')).slice(0, 6);
  const pests = ['Cockroaches', 'Termites', 'Bed Bugs', 'Mosquitoes', 'Ants', 'Rats/Rodents', 'Flies'];
  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Hi, I need residential pest control services.')}`;

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-emerald-200 text-sm font-medium mb-6 border border-white/10">
              <Home className="w-4 h-4" /> Residential Pest Control
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Protect Your Home From Unwanted Pests</h1>
            <p className="text-lg text-emerald-100/80 mb-8">Safe, effective pest control solutions designed for homes and families. Protect your living spaces with professional treatments.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
                Book Service
              </Link>
              <a href={`tel:${businessInfo.phone}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600/30 text-white font-semibold rounded-xl border border-white/20">
                Call Now
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600/30 text-white font-semibold rounded-xl border border-white/20">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Common Pests */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Residential Pests</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">We handle all types of household pest problems with targeted, effective treatments.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pests.map((pest, i) => (
              <AnimatedSection key={pest} delay={i * 80}>
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                  <Bug className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 text-sm">{pest}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Residential Service Process</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Enquiry / Booking', desc: 'Submit your request through our website, call, or WhatsApp.' },
              { step: 2, title: 'Inspection', desc: 'We assess your property to understand the pest problem and requirements.' },
              { step: 3, title: 'Treatment', desc: 'Professional pest control treatment using safe, approved products.' },
              { step: 4, title: 'Follow-up & Guarantee', desc: 'Follow-up support with our 1-month service guarantee.' },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center h-full">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">{s.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection><StatsCounter /></AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Residential Pest Control Services</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentialServices.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.shortDescription}</p>
                  <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                    Book This Service <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Homeowners Say</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <TestimonialsSection limit={3} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection><CTABanner title="Protect Your Home Today" subtitle="Book a professional residential pest control service. Serving Delhi, Gurugram, Noida & Faridabad." /></AnimatedSection>
        </div>
      </section>
    </>
  );
}

export function CommercialPage() {
  const { services, businessInfo } = useApp();
  const commercialServices = services.filter(s => s.active && (s.category === 'commercial' || s.category === 'general')).slice(0, 6);
  const businesses = ['Offices', 'Restaurants', 'Hotels', 'Shops', 'Warehouses', 'Schools', 'Hospitals', 'Other Commercial Spaces'];
  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Hi, I need commercial pest control services.')}`;

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-emerald-200 text-sm font-medium mb-6 border border-white/10">
              <Shield className="w-4 h-4" /> Commercial Pest Control
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Protect Your Business From Unwanted Pests</h1>
            <p className="text-lg text-emerald-100/80 mb-8">Professional pest management solutions for commercial properties. Maintain hygiene standards and protect your business reputation.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
                Book Service
              </Link>
              <a href={`tel:${businessInfo.phone}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600/30 text-white font-semibold rounded-xl border border-white/20">
                Call Now
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600/30 text-white font-semibold rounded-xl border border-white/20">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Businesses Served */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Businesses We Serve</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Professional pest management tailored to the unique requirements of different commercial environments.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {businesses.map((biz, i) => (
              <AnimatedSection key={biz} delay={i * 80}>
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                  <Building className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 text-sm">{biz}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Advantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Businesses Choose Us</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: 'Hygiene Compliance', desc: 'Help maintain hygiene standards required for food businesses, hospitals, and institutions.' },
              { icon: <CheckCircle className="w-6 h-6" />, title: 'Professional Approach', desc: 'Trained technicians with proper safety equipment and professional conduct.' },
              { icon: <Award className="w-6 h-6" />, title: 'Scheduled Maintenance', desc: 'Regular treatment schedules to prevent pest problems before they occur.' },
              { icon: <Users className="w-6 h-6" />, title: 'Customized Plans', desc: 'Treatment plans designed for your specific business type and requirements.' },
              { icon: <CheckCircle className="w-6 h-6" />, title: 'Detailed Reporting', desc: 'Service documentation and treatment records for compliance requirements.' },
              { icon: <Shield className="w-6 h-6" />, title: 'Reputation Protection', desc: 'Keep your business pest-free and maintain customer confidence.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection><StatsCounter /></AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Businesses Say</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <TestimonialsSection limit={3} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection><CTABanner title="Protect Your Business Today" subtitle="Get a customized commercial pest management plan. Serving Delhi, Gurugram, Noida & Faridabad." /></AnimatedSection>
        </div>
      </section>
    </>
  );
}

function Building(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  );
}
