import React, { useState } from 'react';
import { Navigate, Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, HelpCircle, Star, MessageSquare, Settings, LogOut, Shield, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AdminLogin() {
  const { isAdminAuthenticated, adminLogin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAdminAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminLogin(email, password)) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">P.S Service Provider Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4">{error}</div>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@psserviceprovider.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm" required />
            </div>
          </div>

          <button type="submit" className="w-full mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-lg">
            Sign In
          </button>

          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-700"><strong>Demo Credentials:</strong></p>
            <p className="text-xs text-blue-600 mt-1">Email: admin@psserviceprovider.com</p>
            <p className="text-xs text-blue-600">Password: admin123</p>
          </div>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">← Back to Website</Link>
        </div>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const { isAdminAuthenticated, adminLogout } = useApp();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAdminAuthenticated) return <Navigate to="/admin/login" replace />;

  const navItems = [
    { to: '/admin', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { to: '/admin/enquiries', icon: <FileText className="w-5 h-5" />, label: 'Enquiries' },
    { to: '/admin/services', icon: <MessageSquare className="w-5 h-5" />, label: 'Services' },
    { to: '/admin/faqs', icon: <HelpCircle className="w-5 h-5" />, label: 'FAQs' },
    { to: '/admin/testimonials', icon: <Star className="w-5 h-5" />, label: 'Testimonials' },
    { to: '/admin/hero', icon: <MessageSquare className="w-5 h-5" />, label: 'Hero Messages' },
    { to: '/admin/settings', icon: <Settings className="w-5 h-5" />, label: 'Business Info' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Admin Panel</p>
            <p className="text-xs text-gray-500">P.S Service Provider</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === item.to ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 mb-1">
            <span>🌐</span> View Website
          </Link>
          <button onClick={() => { adminLogout(); }} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Admin</span>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-emerald-700">A</span>
            </div>
          </div>
        </header>
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
