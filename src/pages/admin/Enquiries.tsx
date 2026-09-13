import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Enquiry } from '../../data/content';

export default function AdminEnquiries() {
  const { enquiries, updateEnquiryStatus, updateEnquiryNotes, businessInfo } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState('');

  const filteredEnquiries = useMemo(() => {
    let result = [...enquiries];
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(e => e.fullName.toLowerCase().includes(s) || e.mobile.includes(s) || e.id.toLowerCase().includes(s));
    }
    if (statusFilter) result = result.filter(e => e.status === statusFilter);
    if (serviceFilter) result = result.filter(e => e.service === serviceFilter);
    if (propertyFilter) result = result.filter(e => e.propertyType === propertyFilter);
    if (locationFilter) result = result.filter(e => e.location.toLowerCase().includes(locationFilter.toLowerCase()));
    result.sort((a, b) => sortBy === 'newest' ? new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime() : new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());
    return result;
  }, [enquiries, search, statusFilter, serviceFilter, propertyFilter, locationFilter, sortBy]);

  const uniqueServices = [...new Set(enquiries.map(e => e.service))];
  const uniqueProperties = [...new Set(enquiries.map(e => e.propertyType))];

  const clearFilters = () => {
    setSearch(''); setStatusFilter(''); setServiceFilter(''); setPropertyFilter(''); setLocationFilter('');
  };

  const hasFilters = search || statusFilter || serviceFilter || propertyFilter || locationFilter;

  const openWhatsApp = (enq: Enquiry) => {
    const msg = `*Pest Control Service - ${enq.fullName}*\n\nService: ${enq.service}\nLocation: ${enq.location}\nDate: ${enq.preferredDate}\nTime: ${enq.preferredTime}`;
    window.open(`https://wa.me/${enq.mobile.startsWith('91') ? enq.mobile : '91' + enq.mobile}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
        <p className="text-sm text-gray-500 mt-1">Manage customer service enquiries</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, or ID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none" />
            </div>
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 outline-none">
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="booked">Booked</option>
            <option value="completed">Completed</option>
          </select>
          <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 outline-none">
            <option value="">All Services</option>
            {uniqueServices.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={propertyFilter} onChange={e => setPropertyFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 outline-none">
            <option value="">All Types</option>
            {uniqueProperties.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'newest' | 'oldest')} className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 outline-none">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-medium mb-2">No enquiries found</p>
            <p className="text-sm">{hasFilters ? 'Try adjusting your filters' : 'Enquiries will appear here when customers submit the booking form'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredEnquiries.map(enq => (
                  <tr key={enq.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{enq.fullName}</p>
                      <p className="text-xs text-gray-500">{enq.mobile}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{enq.service}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{enq.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(enq.submittedAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <select value={enq.status} onChange={e => updateEnquiryStatus(enq.id, e.target.value as Enquiry['status'])}
                        className={`px-2.5 py-1 text-xs font-medium rounded-full border-0 outline-none cursor-pointer ${
                          enq.status === 'new' ? 'bg-blue-100 text-blue-700' :
                          enq.status === 'contacted' ? 'bg-amber-100 text-amber-700' :
                          enq.status === 'quoted' ? 'bg-purple-100 text-purple-700' :
                          enq.status === 'booked' ? 'bg-indigo-100 text-indigo-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="quoted">Quoted</option>
                        <option value="booked">Booked</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setSelectedEnquiry(enq); setNotes(enq.adminNotes); }}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">View</button>
                        <a href={`tel:${enq.mobile}`} className="text-xs text-blue-600 hover:text-blue-700 font-medium">Call</a>
                        <button onClick={() => openWhatsApp(enq)} className="text-xs text-green-600 hover:text-green-700 font-medium">WA</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEnquiry(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">Enquiry Details</h3>
                <p className="text-xs text-gray-500 font-mono">{selectedEnquiry.id}</p>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Name</p><p className="text-sm font-medium">{selectedEnquiry.fullName}</p></div>
                <div><p className="text-xs text-gray-500">Phone</p><p className="text-sm font-medium">{selectedEnquiry.mobile}</p></div>
                <div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium">{selectedEnquiry.email || '—'}</p></div>
                <div><p className="text-xs text-gray-500">Service</p><p className="text-sm font-medium">{selectedEnquiry.service}</p></div>
                <div><p className="text-xs text-gray-500">Property Type</p><p className="text-sm font-medium">{selectedEnquiry.propertyType}</p></div>
                <div><p className="text-xs text-gray-500">Location</p><p className="text-sm font-medium">{selectedEnquiry.location}</p></div>
                <div><p className="text-xs text-gray-500">Preferred Date</p><p className="text-sm font-medium">{selectedEnquiry.preferredDate}</p></div>
                <div><p className="text-xs text-gray-500">Preferred Time</p><p className="text-sm font-medium">{selectedEnquiry.preferredTime}</p></div>
              </div>
              {selectedEnquiry.details && (
                <div><p className="text-xs text-gray-500 mb-1">Details</p><p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{selectedEnquiry.details}</p></div>
              )}
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <select value={selectedEnquiry.status} onChange={e => { updateEnquiryStatus(selectedEnquiry.id, e.target.value as Enquiry['status']); setSelectedEnquiry({...selectedEnquiry, status: e.target.value as Enquiry['status']}); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="booked">Booked</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Admin Notes</p>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 outline-none" placeholder="Add notes..." />
                <button onClick={() => { updateEnquiryNotes(selectedEnquiry.id, notes); }}
                  className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">Save Notes</button>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Status History</p>
                <div className="space-y-2">
                  {selectedEnquiry.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <span className="font-medium capitalize">{h.status}</span>
                      <span>—</span>
                      <span>{new Date(h.date).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
