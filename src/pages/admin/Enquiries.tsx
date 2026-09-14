import React, { useState, useMemo } from 'react';
import { Search, X, Phone, MessageCircle, Mail, MapPin, Calendar, Clock, FileText, ChevronRight, ChevronLeft, StickyNote, Send, ExternalLink, User, Building2, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Enquiry } from '../../data/content';

const statusConfig: Record<Enquiry['status'], { label: string; bg: string; text: string; next?: Enquiry['status'] }> = {
  new: { label: 'New', bg: 'bg-blue-100', text: 'text-blue-700', next: 'contacted' },
  contacted: { label: 'Contacted', bg: 'bg-amber-100', text: 'text-amber-700', next: 'quoted' },
  quoted: { label: 'Quoted', bg: 'bg-purple-100', text: 'text-purple-700', next: 'booked' },
  booked: { label: 'Booked', bg: 'bg-indigo-100', text: 'text-indigo-700', next: 'completed' },
  completed: { label: 'Completed', bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

export default function AdminEnquiries() {
  const { enquiries, updateEnquiryStatus, updateEnquiryNotes, businessInfo } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredEnquiries = useMemo(() => {
    let result = [...enquiries];
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(e =>
        e.fullName.toLowerCase().includes(s) ||
        e.mobile.includes(s) ||
        e.email.toLowerCase().includes(s) ||
        e.id.toLowerCase().includes(s) ||
        e.location.toLowerCase().includes(s)
      );
    }
    if (statusFilter) result = result.filter(e => e.status === statusFilter);
    if (serviceFilter) result = result.filter(e => e.service === serviceFilter);
    if (propertyFilter) result = result.filter(e => e.propertyType === propertyFilter);
    result.sort((a, b) =>
      sortBy === 'newest'
        ? new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        : new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
    );
    return result;
  }, [enquiries, search, statusFilter, serviceFilter, propertyFilter, sortBy]);

  const selectedEnquiry = enquiries.find(e => e.id === selectedId) || null;

  const uniqueServices = [...new Set(enquiries.map(e => e.service))];
  const uniqueProperties = [...new Set(enquiries.map(e => e.propertyType))];

  const clearFilters = () => {
    setSearch(''); setStatusFilter(''); setServiceFilter(''); setPropertyFilter('');
  };

  const hasFilters = search || statusFilter || serviceFilter || propertyFilter;

  const openWhatsApp = (enq: Enquiry) => {
    const msg = `Hi ${enq.fullName}, this is ${businessInfo.name}. Regarding your pest control enquiry for ${enq.service}...`;
    const phone = enq.mobile.replace(/\D/g, '');
    const waNumber = phone.startsWith('91') ? phone : '91' + phone;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSaveNotes = () => {
    if (selectedEnquiry) {
      updateEnquiryNotes(selectedEnquiry.id, notes);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    }
  };

  const advanceStatus = (enq: Enquiry) => {
    const next = statusConfig[enq.status].next;
    if (next) updateEnquiryStatus(enq.id, next);
  };

  // Navigate between enquiries
  const currentIndex = filteredEnquiries.findIndex(e => e.id === selectedId);
  const goToPrev = () => {
    if (currentIndex > 0) {
      const prev = filteredEnquiries[currentIndex - 1];
      setSelectedId(prev.id);
      setNotes(prev.adminNotes);
    }
  };
  const goToNext = () => {
    if (currentIndex < filteredEnquiries.length - 1) {
      const next = filteredEnquiries[currentIndex + 1];
      setSelectedId(next.id);
      setNotes(next.adminNotes);
    }
  };

  // When selecting an enquiry, load its notes
  const selectEnquiry = (id: string) => {
    setSelectedId(id);
    const enq = enquiries.find(e => e.id === id);
    if (enq) setNotes(enq.adminNotes);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Left: List */}
      <div className={`flex-1 min-w-0 flex flex-col ${selectedEnquiry ? 'hidden lg:flex' : ''}`}>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Customer Enquiries</h1>
          <p className="text-sm text-gray-500 mt-1">
            {enquiries.length} total • {enquiries.filter(e => e.status === 'new').length} new
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 mb-4 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[180px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, phone, email, location..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
              />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 outline-none">
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="booked">Booked</option>
              <option value="completed">Completed</option>
            </select>
            <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 outline-none">
              <option value="">All Services</option>
              {uniqueServices.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={propertyFilter} onChange={e => setPropertyFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 outline-none hidden sm:block">
              <option value="">All Types</option>
              {uniqueProperties.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as 'newest' | 'oldest')} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 outline-none hidden sm:block">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                <X className="w-4 h-4" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Enquiry List */}
        <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-gray-100 shadow-sm">
          {filteredEnquiries.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="font-medium text-gray-500">No enquiries found</p>
              <p className="text-sm mt-1">{hasFilters ? 'Try adjusting your filters' : 'Enquiries will appear here when customers submit the booking form'}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredEnquiries.map(enq => {
                const cfg = statusConfig[enq.status];
                const isSelected = enq.id === selectedId;
                return (
                  <button
                    key={enq.id}
                    onClick={() => selectEnquiry(enq.id)}
                    className={`w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'border-l-4 border-transparent'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900 text-sm truncate">{enq.fullName}</p>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{enq.mobile}</span>
                          <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{enq.service}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{enq.location}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(enq.submittedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          {enq.adminNotes && <span className="ml-2 text-amber-600">📝 Has notes</span>}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right: Detail Panel */}
      {selectedEnquiry && (
        <div className="w-full lg:w-[480px] xl:w-[520px] flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-gray-50">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedId(null)} className="lg:hidden p-1.5 hover:bg-gray-200 rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-bold text-gray-900">{selectedEnquiry.fullName}</h2>
                <p className="text-xs text-gray-500 font-mono">{selectedEnquiry.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {currentIndex > 0 && (
                <button onClick={goToPrev} className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500" title="Previous">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {currentIndex < filteredEnquiries.length - 1 && (
                <button onClick={goToNext} className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500" title="Next">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => setSelectedId(null)} className="hidden lg:block p-1.5 hover:bg-gray-200 rounded-lg text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Status Bar */}
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusConfig[selectedEnquiry.status].bg} ${statusConfig[selectedEnquiry.status].text}`}>
                  {statusConfig[selectedEnquiry.status].label}
                </span>
              </div>
              {/* Status workflow */}
              <div className="flex items-center gap-1">
                {(['new', 'contacted', 'quoted', 'booked', 'completed'] as const).map((status, i) => {
                  const isCurrentOrPast = ['new', 'contacted', 'quoted', 'booked', 'completed'].indexOf(selectedEnquiry.status) >= i;
                  return (
                    <React.Fragment key={status}>
                      <button
                        onClick={() => updateEnquiryStatus(selectedEnquiry.id, status)}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          isCurrentOrPast
                            ? status === selectedEnquiry.status
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {statusConfig[status].label}
                      </button>
                      {i < 4 && <div className={`w-2 h-0.5 ${isCurrentOrPast && ['new', 'contacted', 'quoted', 'booked', 'completed'].indexOf(selectedEnquiry.status) > i ? 'bg-emerald-300' : 'bg-gray-200'}`} />}
                    </React.Fragment>
                  );
                })}
              </div>
              {statusConfig[selectedEnquiry.status].next && (
                <button
                  onClick={() => advanceStatus(selectedEnquiry)}
                  className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Move to {statusConfig[selectedEnquiry.status].next} <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Contact Info */}
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Customer Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-sm font-medium text-gray-900">{selectedEnquiry.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Mobile</p>
                    <a href={`tel:${selectedEnquiry.mobile}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">{selectedEnquiry.mobile}</a>
                  </div>
                </div>
                {selectedEnquiry.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Email</p>
                      <a href={`mailto:${selectedEnquiry.email}`} className="text-sm font-medium text-purple-600 hover:text-purple-700 truncate block">{selectedEnquiry.email}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Details */}
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Service Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Service</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEnquiry.service}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Property Type</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEnquiry.propertyType}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> Location / Area</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEnquiry.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1"><Calendar className="w-3 h-3" /> Preferred Date</p>
                  <p className="text-sm font-medium text-gray-900">{new Date(selectedEnquiry.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> Preferred Time</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEnquiry.preferredTime}</p>
                </div>
              </div>
              {selectedEnquiry.details && (
                <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg p-3">
                  <p className="text-xs text-amber-700 font-medium mb-1">Customer Message</p>
                  <p className="text-sm text-amber-900">{selectedEnquiry.details}</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <a href={`tel:${selectedEnquiry.mobile}`} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <button onClick={() => openWhatsApp(selectedEnquiry)} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
                {selectedEnquiry.email && (
                  <a href={`mailto:${selectedEnquiry.email}`} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors col-span-2">
                    <Mail className="w-4 h-4" /> Send Email
                  </a>
                )}
              </div>
            </div>

            {/* Admin Notes */}
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <StickyNote className="w-3.5 h-3.5" /> Admin Notes
              </h3>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={4}
                placeholder="Add internal notes about this enquiry..."
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <StickyNote className="w-3.5 h-3.5" /> Save Notes
                </button>
                {notesSaved && <span className="text-xs text-emerald-600 font-medium">✓ Saved!</span>}
              </div>
            </div>

            {/* Status History Timeline */}
            <div className="px-5 py-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Activity Timeline</h3>
              <div className="relative pl-6">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200" />
                {[...selectedEnquiry.statusHistory].reverse().map((h, i) => (
                  <div key={i} className="relative mb-4 last:mb-0">
                    <div className={`absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-white ${
                      i === 0 ? 'bg-emerald-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">{h.status}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(h.date).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {h.note && <p className="text-xs text-gray-400 mt-0.5">{h.note}</p>}
                    </div>
                  </div>
                ))}
                <div className="relative">
                  <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-gray-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Enquiry Received</p>
                    <p className="text-xs text-gray-400">
                      {new Date(selectedEnquiry.submittedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 text-center text-xs text-gray-400 border-t border-gray-100">
              Showing {currentIndex + 1} of {filteredEnquiries.length}
            </div>
          </div>
        </div>
      )}

      {/* Empty state when no enquiry selected on desktop */}
      {!selectedEnquiry && (
        <div className="hidden lg:flex w-[480px] xl:w-[520px] flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500 mb-1">Select an enquiry</p>
            <p className="text-sm text-gray-400">Click on any enquiry from the list to view full details</p>
          </div>
        </div>
      )}
    </div>
  );
}
