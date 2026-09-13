import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard, AnimatedSection, CTABanner } from '../components/Sections';

export default function ServicesPage() {
  const { services } = useApp();
  const activeServices = services.filter(s => s.active).sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Our Pest Control Services</h1>
          <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">Comprehensive pest management solutions for residential and commercial properties. Click any service to learn more.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeServices.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 80}>
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <CTABanner title="Need a Specific Pest Control Solution?" subtitle="Contact us to discuss your requirements and receive a customized quotation." />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
