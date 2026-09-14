import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock } from 'lucide-react';
import { BookingForm } from '../components/BookingForm';
import { AnimatedSection } from '../components/Sections';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const { businessInfo } = useApp();
  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Hi, I need pest control services. Please share details.')}`;

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Book a Service</h1>
          <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">Fill in the form below or contact us directly. We'll get back to you with a quotation.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <BookingForm />
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={200}>
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>

                  <div className="space-y-5">
                    <a href={`tel:${businessInfo.phone}`} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-base font-semibold text-gray-900 group-hover:text-emerald-700">{businessInfo.phone}</p>
                      </div>
                    </a>

                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors group">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">WhatsApp</p>
                        <p className="text-base font-semibold text-gray-900 group-hover:text-green-700">Send Message</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="text-sm text-gray-900">{businessInfo.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Business Hours</p>
                        <p className="text-sm text-gray-900">{businessInfo.businessHours}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-sm text-gray-900">{businessInfo.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps */}
                  <div className="mt-6">
                    {businessInfo.googleMapsEmbed ? (
                      <div className="rounded-xl overflow-hidden border border-gray-200">
                        <iframe
                          src={businessInfo.googleMapsEmbed}
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Business Location"
                        />
                      </div>
                    ) : (
                      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100 h-48 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <MapPin className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">Map not configured</p>
                          <p className="text-xs">Add Google Maps embed in admin settings</p>
                        </div>
                      </div>
                    )}
                    {businessInfo.googleMapsUrl && (
                      <a
                        href={businessInfo.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        <MapPin className="w-4 h-4" /> Open in Google Maps
                      </a>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-sm text-emerald-800 font-medium">Service Areas</p>
                    <p className="text-sm text-emerald-700 mt-1">{businessInfo.serviceAreas.join(', ')}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
