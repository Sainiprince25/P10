import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar, ChevronRight, Shield, CheckCircle, Users, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Hero() {
  const { heroMessages, businessInfo } = useApp();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeMessages = heroMessages.filter(m => m.active);
  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Hi, I need pest control services. Please share details.')}`;

  useEffect(() => {
    if (activeMessages.length <= 1) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentMessage(prev => (prev + 1) % activeMessages.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeMessages.length]);

  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-600/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-emerald-200 text-sm font-medium mb-6 border border-white/10">
              <Shield className="w-4 h-4" />
              Trusted Pest Control in Delhi NCR
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              <span className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                {activeMessages[currentMessage]?.text || 'Professional Pest Control Services'}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100/80 mb-8 max-w-lg leading-relaxed">
              Safe, reliable, and effective pest management solutions for your home and business. Serving Delhi, Gurugram, Noida & Faridabad.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl text-base">
                <Calendar className="w-5 h-5" /> Book Service
              </Link>
              <a href={`tel:${businessInfo.phone}`} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600/30 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-emerald-600/50 transition-all border border-white/20 text-base">
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600/30 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-green-600/50 transition-all border border-white/20 text-base">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-emerald-200/70">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> 5+ Years Experience</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> 1,000+ Customers</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-400" /> 1-Month Guarantee</span>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 xl:w-96 xl:h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                <div className="w-64 h-64 xl:w-80 xl:h-80 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <div className="text-7xl xl:text-8xl mb-4">🛡️</div>
                    <p className="text-white/80 font-semibold text-lg">Your Protection<br/>Our Priority</p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20 text-white text-sm font-medium animate-bounce" style={{ animationDuration: '3s' }}>
                🏠 Home Safe
              </div>
              <div className="absolute bottom-8 left-0 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20 text-white text-sm font-medium animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                🏢 Business Ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronRight className="w-6 h-6 rotate-90" />
      </div>
    </section>
  );
}
