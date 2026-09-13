import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Calendar, Menu, X, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { businessInfo } = useApp();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/residential', label: 'Residential' },
    { to: '/commercial', label: 'Commercial' },
    { to: '/service-areas', label: 'Service Areas' },
    { to: '/about', label: 'About Us' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Hi, I need pest control services. Please share details.')}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-gray-900">{businessInfo.name}</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.to ? 'text-emerald-700 bg-emerald-50' : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a href={`tel:${businessInfo.phone}`} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <Link to="/contact" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm">
              <Calendar className="w-4 h-4" /> Book Service
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`block px-4 py-3 rounded-lg text-base font-medium ${location.pathname === link.to ? 'text-emerald-700 bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}>
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t mt-4 space-y-2">
              <a href={`tel:${businessInfo.phone}`} className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-medium text-gray-700 border border-gray-200 rounded-lg">
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <Link to="/contact" className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-semibold text-white bg-emerald-600 rounded-lg">
                <Calendar className="w-5 h-5" /> Book Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { businessInfo } = useApp();
  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Hi, I need pest control services.')}`;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-white">{businessInfo.name}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{businessInfo.description}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors text-sm">
              <Calendar className="w-4 h-4" /> Book a Service
            </Link>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' }, { to: '/services', label: 'Services' },
                { to: '/residential', label: 'Residential' }, { to: '/commercial', label: 'Commercial' },
                { to: '/service-areas', label: 'Service Areas' }, { to: '/about', label: 'About Us' },
                { to: '/faq', label: 'FAQ' }, { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.to}><Link to={link.to} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {['Cockroach Control', 'Termite Control', 'Bed Bug Control', 'Mosquito Control', 'Rodent Control', 'General Pest Control'].map(s => (
                <li key={s}><Link to="/services" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li><a href={`tel:${businessInfo.phone}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"><Phone className="w-4 h-4" /> {businessInfo.phone}</a></li>
              <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"><MessageCircle className="w-4 h-4" /> WhatsApp Enquiry</a></li>
              <li className="flex items-center gap-2 text-sm text-gray-400"><span className="w-4 h-4 text-center">📍</span> {businessInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileCTA() {
  const { businessInfo } = useApp();
  const whatsappLink = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Hi, I need pest control services.')}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl">
      <div className="grid grid-cols-3 gap-0">
        <a href={`tel:${businessInfo.phone}`} className="flex flex-col items-center justify-center py-3 text-gray-700 hover:text-emerald-700 transition-colors">
          <Phone className="w-5 h-5 mb-0.5" />
          <span className="text-xs font-medium">Call Now</span>
        </a>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-3 text-green-700 hover:text-green-800 transition-colors border-x border-gray-100">
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-xs font-medium">WhatsApp</span>
        </a>
        <Link to="/contact" className="flex flex-col items-center justify-center py-3 text-emerald-700 hover:text-emerald-800 transition-colors">
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-xs font-medium">Book Service</span>
        </Link>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20 pb-20 lg:pb-0">{children}</main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
