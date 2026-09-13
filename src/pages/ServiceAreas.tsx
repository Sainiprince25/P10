import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { AnimatedSection, CTABanner } from '../components/Sections';
import { useApp } from '../context/AppContext';
import { locationData } from '../data/content';

export function ServiceAreasPage() {
  const { businessInfo } = useApp();
  const locations = Object.values(locationData);

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Our Service Areas</h1>
          <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">Professional pest control services across Delhi NCR. Find your location below.</p>
        </div>
      </section>

      {/* Map Area */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-12 border border-emerald-100 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Serving Delhi NCR</h2>
                <p className="text-gray-600">We provide pest control services in the following areas</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {locations.map((loc, i) => (
                  <Link key={loc.slug} to={`/service-areas/${loc.slug}`}
                    className="group bg-white rounded-xl p-6 text-center border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all">
                    <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{loc.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">View Details</p>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Location Cards */}
          <div className="space-y-6">
            {locations.map((loc, i) => (
              <AnimatedSection key={loc.slug} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Pest Control in {loc.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{loc.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {loc.areas.slice(0, 6).map(area => (
                          <span key={area} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{area}</span>
                        ))}
                        {loc.areas.length > 6 && <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">+{loc.areas.length - 6} more</span>}
                      </div>
                    </div>
                    <Link to={`/service-areas/${loc.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors text-sm flex-shrink-0">
                      Book Service <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection><CTABanner title="Don't See Your Area?" subtitle="Contact us to check service availability in your location. We cover all of Delhi NCR." /></AnimatedSection>
        </div>
      </section>
    </>
  );
}

export function LocationPage({ slug }: { slug: string }) {
  const loc = locationData[slug as keyof typeof locationData];
  const { businessInfo } = useApp();
  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(`Hi, I need pest control services in ${loc?.name || slug}.`)}`;

  if (!loc) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <Link to="/service-areas" className="text-emerald-600 hover:text-emerald-700 font-medium">View all service areas</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-emerald-200 text-sm mb-4">
            <Link to="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <ArrowRight className="w-3 h-3" />
            <span>{loc.name}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Pest Control in {loc.name}</h1>
          <p className="text-lg text-emerald-100/80 max-w-2xl mb-8">{loc.description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
              Book Service in {loc.name}
            </Link>
            <a href={`tel:${businessInfo.phone}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600/30 text-white font-semibold rounded-xl border border-white/20">
              Call Now
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas We Cover in {loc.name}</h2>
              <div className="grid grid-cols-2 gap-3">
                {loc.areas.map(area => (
                  <div key={area} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us in {loc.name}</h2>
              <ul className="space-y-4">
                {[
                  'Professional pest control technicians serving your area',
                  'Safe, approved products for residential and commercial use',
                  'Quick response times across all localities',
                  '1-month service guarantee on all treatments',
                  '5+ years of experience in Delhi NCR pest management',
                  'Customized solutions for your specific pest problems',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    </div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors">
                  Book Service in {loc.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection><CTABanner title={`Need Pest Control in ${loc.name}?`} subtitle="Book your service today. Our team is ready to help with all types of pest problems." /></AnimatedSection>
        </div>
      </section>
    </>
  );
}
