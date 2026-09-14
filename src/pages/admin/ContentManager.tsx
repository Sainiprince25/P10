import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, Eye, EyeOff, GripVertical } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Service, FAQ, Testimonial, HeroMessage, BusinessInfo } from '../../data/content';

// Services CMS
export function AdminServices() {
  const { services, updateService, addService, deleteService } = useApp();
  const [editing, setEditing] = useState<Service | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Partial<Service>>({});

  const startEdit = (s: Service) => { setEditing(s); setForm(s); setAdding(false); };
  const startAdd = () => { setAdding(true); setEditing(null); setForm({ name: '', slug: '', shortDescription: '', fullDescription: '', icon: '🛡️', category: 'general', active: true, order: services.length + 1 }); };

  const handleSave = async () => {
    if (!form.name) return;
    if (editing) {
      await updateService({ ...editing, ...form } as Service);
      setEditing(null);
    } else {
      await addService({ ...form, slug: form.name?.toLowerCase().replace(/\s+/g, '-') || '' } as Omit<Service, 'id'>);
      setAdding(false);
    }
    setForm({});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Services</h1><p className="text-sm text-gray-500 mt-1">Manage pest control services</p></div>
        <button onClick={startAdd} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {(adding || editing) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">{editing ? 'Edit Service' : 'New Service'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label><input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Icon (emoji)</label><input value={form.icon || ''} onChange={e => setForm({...form, icon: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Category</label><select value={form.category || 'general'} onChange={e => setForm({...form, category: e.target.value as Service['category']})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"><option value="general">General</option><option value="residential">Residential</option><option value="commercial">Commercial</option></select></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Order</label><input type="number" value={form.order || 1} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Short Description</label><textarea value={form.shortDescription || ''} onChange={e => setForm({...form, shortDescription: e.target.value})} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Full Description</label><textarea value={form.fullDescription || ''} onChange={e => setForm({...form, fullDescription: e.target.value})} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div className="flex items-center gap-2"><label className="text-xs font-medium text-gray-600">Active</label><input type="checkbox" checked={form.active !== false} onChange={e => setForm({...form, active: e.target.checked})} className="rounded" /></div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg"><Save className="w-4 h-4" /> Save</button>
            <button onClick={() => { setEditing(null); setAdding(false); setForm({}); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.sort((a, b) => a.order - b.order).map(s => (
          <div key={s.id} className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${s.active ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <span className="text-2xl">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{s.name}</p>
              <p className="text-xs text-gray-500 truncate">{s.shortDescription}</p>
            </div>
            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded capitalize">{s.category}</span>
            <div className="flex items-center gap-1">
              <button onClick={async () => { await updateService({...s, active: !s.active}); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">{s.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
              <button onClick={() => startEdit(s)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><Edit3 className="w-4 h-4" /></button>
              <button onClick={async () => { if(confirm('Delete this service?')) await deleteService(s.id); }} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQs CMS
export function AdminFAQs() {
  const { faqs, updateFAQ, addFAQ, deleteFAQ } = useApp();
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Partial<FAQ>>({});

  const startEdit = (f: FAQ) => { setEditing(f); setForm(f); setAdding(false); };
  const startAdd = () => { setAdding(true); setEditing(null); setForm({ question: '', answer: '', active: true, order: faqs.length + 1 }); };

  const handleSave = async () => {
    if (!form.question || !form.answer) return;
    if (editing) { await updateFAQ({ ...editing, ...form } as FAQ); setEditing(null); }
    else { await addFAQ(form as Omit<FAQ, 'id'>); setAdding(false); }
    setForm({});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">FAQs</h1><p className="text-sm text-gray-500 mt-1">Manage frequently asked questions</p></div>
        <button onClick={startAdd} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm"><Plus className="w-4 h-4" /> Add FAQ</button>
      </div>

      {(adding || editing) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">{editing ? 'Edit FAQ' : 'New FAQ'}</h3>
          <div className="space-y-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Question *</label><input value={form.question || ''} onChange={e => setForm({...form, question: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Answer *</label><textarea value={form.answer || ''} onChange={e => setForm({...form, answer: e.target.value})} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><label className="text-xs font-medium text-gray-600">Active</label><input type="checkbox" checked={form.active !== false} onChange={e => setForm({...form, active: e.target.checked})} className="rounded" /></div>
              <div><label className="text-xs font-medium text-gray-600 mr-2">Order</label><input type="number" value={form.order || 1} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className="w-20 px-3 py-1.5 rounded-lg border border-gray-200 text-sm" /></div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg"><Save className="w-4 h-4" /> Save</button>
            <button onClick={() => { setEditing(null); setAdding(false); setForm({}); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {faqs.sort((a, b) => a.order - b.order).map(f => (
          <div key={f.id} className={`bg-white rounded-xl border p-4 ${f.active ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{f.question}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={async () => { await updateFAQ({...f, active: !f.active}); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">{f.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                <button onClick={() => startEdit(f)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><Edit3 className="w-4 h-4" /></button>
                <button onClick={async () => { if(confirm('Delete this FAQ?')) await deleteFAQ(f.id); }} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Testimonials CMS
export function AdminTestimonials() {
  const { testimonials, updateTestimonial, addTestimonial, deleteTestimonial } = useApp();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Partial<Testimonial>>({});

  const startEdit = (t: Testimonial) => { setEditing(t); setForm(t); setAdding(false); };
  const startAdd = () => { setAdding(true); setEditing(null); setForm({ name: '', type: 'residential', location: 'Delhi', review: '', rating: 5, isDemo: true, active: true }); };

  const handleSave = async () => {
    if (!form.name || !form.review) return;
    if (editing) { await updateTestimonial({ ...editing, ...form } as Testimonial); setEditing(null); }
    else { await addTestimonial(form as Omit<Testimonial, 'id'>); setAdding(false); }
    setForm({});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Testimonials</h1><p className="text-sm text-gray-500 mt-1">Manage customer testimonials</p></div>
        <button onClick={startAdd} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm"><Plus className="w-4 h-4" /> Add Testimonial</button>
      </div>

      {(adding || editing) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">{editing ? 'Edit' : 'New'} Testimonial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label><input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Type</label><select value={form.type || 'residential'} onChange={e => setForm({...form, type: e.target.value as 'residential' | 'commercial'})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"><option value="residential">Residential</option><option value="commercial">Commercial</option></select></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Location</label><select value={form.location || 'Delhi'} onChange={e => setForm({...form, location: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"><option>Delhi</option><option>Gurugram</option><option>Noida</option><option>Faridabad</option></select></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating || 5} onChange={e => setForm({...form, rating: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Review *</label><textarea value={form.review || ''} onChange={e => setForm({...form, review: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><label className="text-xs font-medium text-gray-600">Active</label><input type="checkbox" checked={form.active !== false} onChange={e => setForm({...form, active: e.target.checked})} className="rounded" /></div>
              <div className="flex items-center gap-2"><label className="text-xs font-medium text-gray-600">Demo</label><input type="checkbox" checked={form.isDemo !== false} onChange={e => setForm({...form, isDemo: e.target.checked})} className="rounded" /></div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg"><Save className="w-4 h-4" /> Save</button>
            <button onClick={() => { setEditing(null); setAdding(false); setForm({}); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {testimonials.map(t => (
          <div key={t.id} className={`bg-white rounded-xl border p-4 ${t.active ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 text-sm">{t.name}</p>
                  {t.isDemo && <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">Demo</span>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{t.type} • {t.location} • {'★'.repeat(t.rating)}</p>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{t.review}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={async () => { await updateTestimonial({...t, active: !t.active}); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">{t.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                <button onClick={() => startEdit(t)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><Edit3 className="w-4 h-4" /></button>
                <button onClick={async () => { if(confirm('Delete?')) await deleteTestimonial(t.id); }} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero Messages CMS
export function AdminHero() {
  const { heroMessages, updateHeroMessage, addHeroMessage, deleteHeroMessage } = useApp();
  const [editing, setEditing] = useState<HeroMessage | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Partial<HeroMessage>>({});

  const startEdit = (h: HeroMessage) => { setEditing(h); setForm(h); setAdding(false); };
  const startAdd = () => { setAdding(true); setEditing(null); setForm({ text: '', active: true, order: heroMessages.length + 1 }); };

  const handleSave = async () => {
    if (!form.text) return;
    if (editing) { await updateHeroMessage({ ...editing, ...form } as HeroMessage); setEditing(null); }
    else { await addHeroMessage(form as Omit<HeroMessage, 'id'>); setAdding(false); }
    setForm({});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Hero Messages</h1><p className="text-sm text-gray-500 mt-1">Manage rotating hero section messages</p></div>
        <button onClick={startAdd} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm"><Plus className="w-4 h-4" /> Add Message</button>
      </div>

      {(adding || editing) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="space-y-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Message Text *</label><input value={form.text || ''} onChange={e => setForm({...form, text: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><label className="text-xs font-medium text-gray-600">Active</label><input type="checkbox" checked={form.active !== false} onChange={e => setForm({...form, active: e.target.checked})} className="rounded" /></div>
              <div><label className="text-xs font-medium text-gray-600 mr-2">Order</label><input type="number" value={form.order || 1} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className="w-20 px-3 py-1.5 rounded-lg border border-gray-200 text-sm" /></div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg"><Save className="w-4 h-4" /> Save</button>
            <button onClick={() => { setEditing(null); setAdding(false); setForm({}); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {heroMessages.sort((a, b) => a.order - b.order).map(h => (
          <div key={h.id} className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${h.active ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{h.text}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={async () => { await updateHeroMessage({...h, active: !h.active}); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">{h.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
              <button onClick={() => startEdit(h)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><Edit3 className="w-4 h-4" /></button>
              <button onClick={async () => { if(confirm('Delete?')) await deleteHeroMessage(h.id); }} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Business Settings CMS
export function AdminSettings() {
  const { businessInfo, updateBusinessInfo } = useApp();
  const [form, setForm] = useState<BusinessInfo>({ ...businessInfo });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    const success = await updateBusinessInfo(form);
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      alert('Failed to save business information. Please try again.');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Business Information</h1>
        <p className="text-sm text-gray-500 mt-1">Manage business details displayed on the website</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Business Name</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Phone</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">WhatsApp Number (with country code, no +)</label><input value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
          <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Address</label><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
          <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Business Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Business Hours</label><input value={form.businessHours} onChange={e => setForm({...form, businessHours: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Service Areas (comma-separated)</label><input value={form.serviceAreas.join(', ')} onChange={e => setForm({...form, serviceAreas: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition-colors">
            <Save className="w-4 h-4" /> Save Changes
          </button>
          {saved && <span className="text-sm text-emerald-600 font-medium">✓ Saved successfully!</span>}
        </div>
      </div>
    </div>
  );
}
