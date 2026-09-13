import React, { useState } from 'react';
import { Send, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { propertyTypes, timeSlots } from '../data/content';

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  service: string;
  propertyType: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  details: string;
}

interface FormErrors {
  [key: string]: string;
}

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const { services, businessInfo, addEnquiry } = useApp();
  const [formData, setFormData] = useState<FormData>({
    fullName: '', mobile: '', email: '', service: '', propertyType: '', location: '', preferredDate: '', preferredTime: '', details: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.mobile.trim()) newErrors.mobile = 'Please enter your mobile number';
    else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, '').replace(/^\+91/, ''))) newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.propertyType) newErrors.propertyType = 'Please select property type';
    if (!formData.location.trim()) newErrors.location = 'Please enter your location/area';
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred date';
    else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (selectedDate < today) newErrors.preferredDate = 'Date cannot be in the past';
    }
    if (!formData.preferredTime) newErrors.preferredTime = 'Please select a preferred time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      addEnquiry({
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        service: formData.service,
        propertyType: formData.propertyType,
        location: formData.location,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        details: formData.details,
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const openWhatsApp = () => {
    const msg = `*New Pest Control Service Enquiry*\n\nName: ${formData.fullName}\nMobile: ${formData.mobile}\nService: ${formData.service}\nCustomer Type: ${formData.propertyType}\nLocation: ${formData.location}\nPreferred Date: ${formData.preferredDate}\nPreferred Time: ${formData.preferredTime}\nDetails: ${formData.details || 'N/A'}`;
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 text-center border border-gray-100">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Enquiry Submitted Successfully!</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your enquiry has been received. Our team will review your requirement and contact you with a quotation.
        </p>
        <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-100">
          <p className="text-sm text-emerald-800 font-medium mb-2">Continue via WhatsApp for faster response:</p>
          <button onClick={openWhatsApp} className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-sm">
            <MessageCircle className="w-4 h-4" /> Send on WhatsApp
          </button>
        </div>
        <p className="text-sm text-gray-500">You can also call us directly at <a href={`tel:${businessInfo.phone}`} className="text-emerald-600 font-medium">{businessInfo.phone}</a></p>
        <button onClick={() => { setSubmitted(false); setFormData({ fullName: '', mobile: '', email: '', service: '', propertyType: '', location: '', preferredDate: '', preferredTime: '', details: '' }); }}
          className="mt-6 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          Submit another enquiry
        </button>
      </div>
    );
  }

  const inputClass = (field: string) => `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-300 bg-red-50/50' : 'border-gray-200 bg-gray-50/50'} focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm`;

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 ${compact ? '' : ''}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">Book a Service</h3>
        <p className="text-sm text-gray-500 mt-1">Fill in your details and we'll get back to you with a quotation.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
          <input type="text" value={formData.fullName} onChange={e => handleChange('fullName', e.target.value)} placeholder="Enter your full name" className={inputClass('fullName')} />
          {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
            <input type="tel" value={formData.mobile} onChange={e => handleChange('mobile', e.target.value)} placeholder="10-digit number" className={inputClass('mobile')} />
            {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-gray-400 text-xs">(optional)</span></label>
            <input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="your@email.com" className={inputClass('email')} />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Required <span className="text-red-500">*</span></label>
            <select value={formData.service} onChange={e => handleChange('service', e.target.value)} className={inputClass('service')}>
              <option value="">Select a service</option>
              {services.filter(s => s.active).map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
            {errors.service && <p className="text-xs text-red-600 mt-1">{errors.service}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Type <span className="text-red-500">*</span></label>
            <select value={formData.propertyType} onChange={e => handleChange('propertyType', e.target.value)} className={inputClass('propertyType')}>
              <option value="">Select type</option>
              {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.propertyType && <p className="text-xs text-red-600 mt-1">{errors.propertyType}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Location / Area <span className="text-red-500">*</span></label>
          <input type="text" value={formData.location} onChange={e => handleChange('location', e.target.value)} placeholder="e.g., Sector 62, Noida" className={inputClass('location')} />
          {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date <span className="text-red-500">*</span></label>
            <input type="date" value={formData.preferredDate} onChange={e => handleChange('preferredDate', e.target.value)} min={new Date().toISOString().split('T')[0]} className={inputClass('preferredDate')} />
            {errors.preferredDate && <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time <span className="text-red-500">*</span></label>
            <select value={formData.preferredTime} onChange={e => handleChange('preferredTime', e.target.value)} className={inputClass('preferredTime')}>
              <option value="">Select time slot</option>
              {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.preferredTime && <p className="text-xs text-red-600 mt-1">{errors.preferredTime}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Details <span className="text-gray-400 text-xs">(optional)</span></label>
          <textarea value={formData.details} onChange={e => handleChange('details', e.target.value)} placeholder="Describe your pest problem, property size, or any specific requirements..." rows={3} className={inputClass('details')} />
        </div>

        <button type="submit" disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-base">
          {isSubmitting ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
          ) : (
            <><Send className="w-5 h-5" /> Submit Enquiry</>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">By submitting, you agree to be contacted regarding your pest control enquiry.</p>
      </div>
    </form>
  );
}
