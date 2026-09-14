import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, Calendar, Phone, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { enquiries, services, faqs, testimonials } = useApp();

  const newCount = enquiries.filter(e => e.status === 'new').length;
  const contactedCount = enquiries.filter(e => e.status === 'contacted').length;
  const bookedCount = enquiries.filter(e => e.status === 'booked').length;
  const completedCount = enquiries.filter(e => e.status === 'completed').length;
  const recentEnquiries = enquiries.slice(0, 5);

  const stats = [
    { label: 'New Enquiries', value: newCount, icon: <FileText className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600', link: '/admin/enquiries' },
    { label: 'Contacted', value: contactedCount, icon: <Phone className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600', link: '/admin/enquiries' },
    { label: 'Booked', value: bookedCount, icon: <Calendar className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600', link: '/admin/enquiries' },
    { label: 'Completed', value: completedCount, icon: <CheckCircle className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-600', link: '/admin/enquiries' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your pest control business</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.link} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/admin/enquiries" className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
              <FileText className="w-4 h-4" /> View All Enquiries
            </Link>
            <Link to="/admin/services" className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
              <FileText className="w-4 h-4" /> Manage Services
            </Link>
            <Link to="/admin/faqs" className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
              <HelpCircle className="w-4 h-4" /> Manage FAQs
            </Link>
            <Link to="/" className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
              <span>🌐</span> View Website
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Content Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Services</span>
              <span className="text-sm font-bold text-gray-900">{services.filter(s => s.active).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active FAQs</span>
              <span className="text-sm font-bold text-gray-900">{faqs.filter(f => f.active).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Testimonials</span>
              <span className="text-sm font-bold text-gray-900">{testimonials.filter(t => t.active).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Enquiries</span>
              <span className="text-sm font-bold text-gray-900">{enquiries.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">System Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Version</span>
              <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">1.0.0 Demo</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Environment</span>
              <span className="text-xs font-mono bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Staging</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Data Storage</span>
              <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">Local (Demo)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Recent Enquiries</h3>
            <p className="text-xs text-gray-500 mt-0.5">Click any enquiry to view full customer details</p>
          </div>
          <Link to="/admin/enquiries" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All →</Link>
        </div>
        {recentEnquiries.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-gray-500 mb-1">No enquiries yet</p>
            <p className="text-sm">Enquiries will appear here when customers submit the booking form on the website.</p>
            <Link to="/contact" className="inline-block mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Try submitting a test enquiry →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentEnquiries.map(enq => (
              <Link key={enq.id} to="/admin/enquiries" className="block px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{enq.fullName}</p>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        enq.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        enq.status === 'contacted' ? 'bg-amber-100 text-amber-700' :
                        enq.status === 'quoted' ? 'bg-purple-100 text-purple-700' :
                        enq.status === 'booked' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>{enq.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span>📞 {enq.mobile}</span>
                      <span>🏷️ {enq.service}</span>
                      <span>📍 {enq.location}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">{new Date(enq.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">View Details →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HelpCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
    </svg>
  );
}
