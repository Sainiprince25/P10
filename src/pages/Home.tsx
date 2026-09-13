import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home, Building2, MapPin, Clock, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ServiceCard, TestimonialsSection, StatsCounter, AnimatedSection, CTABanner, FAQAccordion } from '../components/Sections';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { services, faqs, businessInfo } = useApp();
  const activeServices = services.filter(s => s.active).slice(0, 6);
  const activeFaqs = faqs.filter(f => f.active).slice(0, 5);

  return (
    <>
      <Hero />

      {/* Services Preview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">Our Services</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comprehensive Pest Control Solutions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Professional treatments for all types of pest problems in residential and commercial properties across Delhi NCR.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 100}>
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">Why Choose Us</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by 1,000+ Customers</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">We deliver safe, reliable, and effective pest control solutions backed by experience and a service guarantee.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Award className="w-6 h-6" />, title: '5+ Years Experience', desc: 'Years of professional pest control expertise serving Delhi NCR.' },
              { icon: <Shield className="w-6 h-6" />, title: 'Safe Treatments', desc: 'Government-approved products safe for families, children, and pets.' },
              { icon: <CheckCircle className="w-6 h-6" />, title: '1-Month Guarantee', desc: 'Service guarantee ensures follow-up if pests return within a month.' },
              { icon: <Home className="w-6 h-6" />, title: 'Residential Expertise', desc: 'Specialized solutions for homes, apartments, and residential complexes.' },
              { icon: <Building2 className="w-6 h-6" />, title: 'Commercial Solutions', desc: 'Professional pest management for offices, restaurants, hotels, and more.' },
              { icon: <MapPin className="w-6 h-6" />, title: 'Wide Coverage', desc: 'Serving Delhi, Gurugram, Noida, and Faridabad with prompt service.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <StatsCounter />
          </AnimatedSection>
        </div>
      </section>

      {/* Service Areas Preview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">Service Areas</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Serving Across Delhi NCR</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Professional pest control services available in your area.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {businessInfo.serviceAreas.map((area, i) => (
              <AnimatedSection key={area} delay={i * 100}>
                <Link to={`/service-areas/${area.toLowerCase()}`} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all text-center">
                  <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{area}</h3>
                  <p className="text-xs text-gray-500 mt-1">Pest Control Services</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">Testimonials</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Real experiences from residential and commercial customers across Delhi NCR.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <TestimonialsSection limit={3} />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">FAQ</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <FAQAccordion faqs={activeFaqs} />
          </AnimatedSection>
          <div className="text-center mt-8">
            <Link to="/faq" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold">
              View All FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <CTABanner title="Ready to Get Rid of Pests?" subtitle="Book a professional pest control service today. We serve Delhi, Gurugram, Noida, and Faridabad." />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
