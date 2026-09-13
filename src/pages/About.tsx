import React from 'react';
import { Shield, Award, Users, CheckCircle, Building2, Home, Clock, Target } from 'lucide-react';
import { AnimatedSection, StatsCounter, CTABanner } from '../components/Sections';
import { useApp } from '../context/AppContext';

export default function AboutPage() {
  const { businessInfo } = useApp();

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">About {businessInfo.name}</h1>
          <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">Professional pest control services trusted by homes and businesses across Delhi NCR.</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">Who We Are</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Trusted Pest Control Partner</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {businessInfo.name} is a professional pest control company serving Delhi, Gurugram, Noida, and Faridabad. With over 5 years of experience and 1,000+ satisfied customers, we provide safe, reliable, and effective pest management solutions for both residential and commercial properties.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our approach combines modern techniques with environmentally responsible products to deliver results that protect your property, your health, and your peace of mind. Every treatment is customized to address your specific pest challenges.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <CheckCircle className="w-5 h-5" /> Licensed & Professional
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <CheckCircle className="w-5 h-5" /> Safe Products
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <CheckCircle className="w-5 h-5" /> Service Guarantee
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-12 text-center border border-emerald-100">
                <div className="text-7xl mb-6">🛡️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600">To provide safe, effective, and reliable pest control solutions that protect families, businesses, and communities across Delhi NCR.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection><StatsCounter /></AnimatedSection>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Safe, reliable, and effective pest control through a systematic process.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Target className="w-6 h-6" />, title: 'Inspection', desc: 'Thorough assessment to identify pest types, severity, and entry points.' },
              { icon: <Shield className="w-6 h-6" />, title: 'Treatment Plan', desc: 'Customized treatment strategy using safe, approved products and methods.' },
              { icon: <CheckCircle className="w-6 h-6" />, title: 'Execution', desc: 'Professional application by trained technicians with proper safety equipment.' },
              { icon: <Clock className="w-6 h-6" />, title: 'Follow-up', desc: 'Post-treatment support and 1-month service guarantee for peace of mind.' },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">{i + 1}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Customers Choose Us</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Award className="w-6 h-6" />, title: '5+ Years Experience', desc: 'Proven track record serving Delhi NCR with professional pest control.' },
              { icon: <Users className="w-6 h-6" />, title: '1,000+ Customers', desc: 'Trusted by homeowners, businesses, and institutions across the region.' },
              { icon: <Shield className="w-6 h-6" />, title: 'Safety First', desc: 'Family-safe and pet-friendly products with proper safety protocols.' },
              { icon: <CheckCircle className="w-6 h-6" />, title: 'Service Guarantee', desc: '1-month warranty on our services for complete peace of mind.' },
              { icon: <Home className="w-6 h-6" />, title: 'Residential Expertise', desc: 'Specialized solutions for homes, apartments, and residential complexes.' },
              { icon: <Building2 className="w-6 h-6" />, title: 'Commercial Expertise', desc: 'Professional pest management for offices, restaurants, hotels, and more.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Note about credentials */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Founder information, certifications, licenses, and registrations will be displayed here once provided by the client. We never fabricate credentials.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection><CTABanner title="Ready to Experience Professional Pest Control?" subtitle="Get in touch with our team for a free consultation and quotation." /></AnimatedSection>
        </div>
      </section>
    </>
  );
}
