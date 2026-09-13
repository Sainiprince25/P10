import React from 'react';
import { BrowserRouter, Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import AboutPage from './pages/About';
import { ResidentialPage, CommercialPage } from './pages/ResidentialCommercial';
import { ServiceAreasPage, LocationPage } from './pages/ServiceAreas';
import ContactPage from './pages/Contact';
import FAQPage from './pages/FAQPage';
import { PrivacyPage, TermsPage } from './pages/Legal';
import { AdminLogin, AdminLayout } from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminEnquiries from './pages/admin/Enquiries';
import { AdminServices, AdminFAQs, AdminTestimonials, AdminHero, AdminSettings } from './pages/admin/ContentManager';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Layout><ScrollToTop /><HomePage /></Layout>} />
          <Route path="/services" element={<Layout><ScrollToTop /><ServicesPage /></Layout>} />
          <Route path="/about" element={<Layout><ScrollToTop /><AboutPage /></Layout>} />
          <Route path="/residential" element={<Layout><ScrollToTop /><ResidentialPage /></Layout>} />
          <Route path="/commercial" element={<Layout><ScrollToTop /><CommercialPage /></Layout>} />
          <Route path="/service-areas" element={<Layout><ScrollToTop /><ServiceAreasPage /></Layout>} />
          <Route path="/service-areas/:slug" element={<Layout><ScrollToTop /><LocationSlugWrapper /></Layout>} />
          <Route path="/contact" element={<Layout><ScrollToTop /><ContactPage /></Layout>} />
          <Route path="/faq" element={<Layout><ScrollToTop /><FAQPage /></Layout>} />
          <Route path="/privacy" element={<Layout><ScrollToTop /><PrivacyPage /></Layout>} />
          <Route path="/terms" element={<Layout><ScrollToTop /><TermsPage /></Layout>} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="faqs" element={<AdminFAQs />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="hero" element={<AdminHero />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

function LocationSlugWrapper() {
  const { slug } = useParams<{ slug: string }>();
  return <LocationPage slug={slug || ''} />;
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-200 mb-4">404</h1>
        <p className="text-xl font-bold text-gray-900 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default App;
