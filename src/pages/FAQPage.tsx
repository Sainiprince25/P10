import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FAQAccordion, AnimatedSection, CTABanner } from '../components/Sections';

export default function FAQPage() {
  const { faqs } = useApp();
  const activeFaqs = faqs.filter(f => f.active).sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">Find answers to common questions about our pest control services.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FAQAccordion faqs={activeFaqs} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <CTABanner title="Still Have Questions?" subtitle="Contact us directly. We're happy to help with any queries about our pest control services." />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
