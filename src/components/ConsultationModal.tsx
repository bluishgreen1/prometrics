import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Check, Calendar, Mail, Phone, User, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data';
import { CompanySize, PaymentOption, ConsultationRequest } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

type Step = 'profile' | 'services' | 'schedule' | 'success';

export default function ConsultationModal({ isOpen, onClose, preselectedServiceId }: ConsultationModalProps) {
  const [step, setStep] = useState<Step>('profile');
  
  // Lazy state initialization from LocalStorage to persist form drafts across refreshes
  const [clientName, setClientName] = useState(() => localStorage.getItem('prometrics_draft_clientName') || '');
  const [companyName, setCompanyName] = useState(() => localStorage.getItem('prometrics_draft_companyName') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('prometrics_draft_email') || '');
  const [phone, setPhone] = useState(() => localStorage.getItem('prometrics_draft_phone') || '');
  const [companySize, setCompanySize] = useState<CompanySize>(() => (localStorage.getItem('prometrics_draft_companySize') as CompanySize) || 'smb');
  
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('prometrics_draft_selectedServices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [preferredDate, setPreferredDate] = useState(() => localStorage.getItem('prometrics_draft_preferredDate') || '');
  const [preferredTime, setPreferredTime] = useState(() => localStorage.getItem('prometrics_draft_preferredTime') || '14:00');
  const [pricingPreference, setPricingPreference] = useState<PaymentOption | 'undecided'>(() => (localStorage.getItem('prometrics_draft_pricingPreference') as PaymentOption | 'undecided') || 'undecided');
  const [additionalNotes, setAdditionalNotes] = useState(() => localStorage.getItem('prometrics_draft_additionalNotes') || '');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationRequest | null>(null);

  // Sync draft inputs to LocalStorage as they type / make choices
  useEffect(() => {
    localStorage.setItem('prometrics_draft_clientName', clientName);
    localStorage.setItem('prometrics_draft_companyName', companyName);
    localStorage.setItem('prometrics_draft_email', email);
    localStorage.setItem('prometrics_draft_phone', phone);
    localStorage.setItem('prometrics_draft_companySize', companySize);
    localStorage.setItem('prometrics_draft_selectedServices', JSON.stringify(selectedServices));
    localStorage.setItem('prometrics_draft_preferredDate', preferredDate);
    localStorage.setItem('prometrics_draft_preferredTime', preferredTime);
    localStorage.setItem('prometrics_draft_pricingPreference', pricingPreference);
    localStorage.setItem('prometrics_draft_additionalNotes', additionalNotes);
  }, [clientName, companyName, email, phone, companySize, selectedServices, preferredDate, preferredTime, pricingPreference, additionalNotes]);

  // Set initial selected service if pre-passed, or fall back to draft if opened normally
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServices([preselectedServiceId]);
    } else if (isOpen) {
      const saved = localStorage.getItem('prometrics_draft_selectedServices');
      if (saved) {
        try {
          setSelectedServices(JSON.parse(saved));
        } catch {
          setSelectedServices([]);
        }
      } else {
        setSelectedServices([]);
      }
    }
  }, [preselectedServiceId, isOpen]);

  // Handle outside clicks/escapes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 'profile') {
      if (!clientName.trim()) newErrors.clientName = 'Full Name is required';
      if (!companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please provide a valid email';
      }
      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[+]?[0-9\s\-()]{7,18}$/.test(phone)) {
        newErrors.phone = 'Please provide a valid phone number';
      }
    }

    if (currentStep === 'services') {
      if (selectedServices.length === 0) {
        newErrors.services = 'Please select at least one service standard of interest';
      }
    }

    if (currentStep === 'schedule') {
      if (!preferredDate) {
        newErrors.preferredDate = 'Consultation date is required';
      } else {
        const today = new Date();
        today.setHours(0,0,0,0);
        const selected = new Date(preferredDate);
        if (selected < today) {
          newErrors.preferredDate = 'Consultation date cannot be in the past';
        }
      }
      if (!preferredTime) {
        newErrors.preferredTime = 'Consultation time is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 'profile' && validateStep('profile')) {
      setStep('services');
    } else if (step === 'services' && validateStep('services')) {
      setStep('schedule');
    }
  };

  const handleBack = () => {
    if (step === 'services') setStep('profile');
    if (step === 'schedule') setStep('services');
  };

  const clearDraft = () => {
    localStorage.removeItem('prometrics_draft_clientName');
    localStorage.removeItem('prometrics_draft_companyName');
    localStorage.removeItem('prometrics_draft_email');
    localStorage.removeItem('prometrics_draft_phone');
    localStorage.removeItem('prometrics_draft_companySize');
    localStorage.removeItem('prometrics_draft_selectedServices');
    localStorage.removeItem('prometrics_draft_preferredDate');
    localStorage.removeItem('prometrics_draft_preferredTime');
    localStorage.removeItem('prometrics_draft_pricingPreference');
    localStorage.removeItem('prometrics_draft_additionalNotes');

    setClientName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setCompanySize('smb');
    setSelectedServices([]);
    setPreferredDate('');
    setPreferredTime('14:00');
    setPricingPreference('undecided');
    setAdditionalNotes('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep('schedule')) return;

    const request: ConsultationRequest = {
      id: 'cons-' + Math.random().toString(36).substr(2, 9),
      clientName,
      companyName,
      email,
      phone,
      companySize,
      selectedServices,
      preferredDate,
      preferredTime,
      pricingPreference,
      additionalNotes,
      createdAt: new Date().toISOString()
    };

    // Save locally
    const existing = localStorage.getItem('prometrics_bookings');
    const bookings = existing ? JSON.parse(existing) : [];
    bookings.push(request);
    localStorage.setItem('prometrics_bookings', JSON.stringify(bookings));

    // Clear form draft items from local storage and state upon booking completion
    clearDraft();

    setConfirmedBooking(request);
    setStep('success');
  };

  const resetForm = () => {
    // Reset wizard view/step and clear error configurations, but preserve draft in state and localStorage so users can resume
    setStep('profile');
    setErrors({});
    setConfirmedBooking(null);
  };

  const handleCloseAndReset = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleCloseAndReset}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl text-slate-800 z-10"
      >
        {/* Top Header Grid */}
        <div className="border-b border-slate-100 bg-slate-50 p-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900">Book Free Consultation</h3>
            <p className="text-xs text-slate-500 mt-0.5">Let’s map your roadmap to digital authority. (Canada-focused)</p>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Indicators */}
        {step !== 'success' && (
          <div className="bg-slate-50/50 px-6 py-3 border-b border-slate-100 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-6">
              <span className={`flex items-center gap-1.5 ${step === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step === 'profile' ? 'bg-emerald-600 text-white font-bold animate-pulse' : 'bg-slate-200 text-slate-500'}`}>1</span>
                Profile
              </span>
              <span className={`flex items-center gap-1.5 ${step === 'services' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step === 'services' ? 'bg-emerald-600 text-white font-bold animate-pulse' : 'bg-slate-200 text-slate-500'}`}>2</span>
                Services
              </span>
              <span className={`flex items-center gap-1.5 ${step === 'schedule' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step === 'schedule' ? 'bg-emerald-600 text-white font-bold animate-pulse' : 'bg-slate-200 text-slate-500'}`}>3</span>
                Schedule
              </span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              {step === 'profile' && 'Step 1 of 3'}
              {step === 'services' && 'Step 2 of 3'}
              {step === 'schedule' && 'Step 3 of 3'}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 'profile' && (
              <motion.div
                key="step-profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 font-sans"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Your Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g., Jennifer Wu"
                        className="w-full bg-white border border-slate-250 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                      />
                    </div>
                    {errors.clientName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.clientName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Company Name *</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g., Maplewood Retail"
                        className="w-full bg-white border border-slate-250 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                      />
                    </div>
                    {errors.companyName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.companyName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Business Mail *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@business.ca"
                        className="w-full bg-white border border-slate-250 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Canadian Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 437 123-4567"
                        className="w-full bg-white border border-slate-250 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Company Classification</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'smb', label: 'Small Business', desc: '1 - 5 Staff' },
                      { key: 'mid', label: 'Mid-Market', desc: '5 - 30 Staff' },
                      { key: 'enterprise', label: 'Enterprise', desc: '30+ Staff' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setCompanySize(opt.key as CompanySize)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer ${
                          companySize === opt.key
                            ? 'border-emerald-500 bg-emerald-50 text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs font-bold">{opt.label}</span>
                        <span className="text-[10px] text-slate-450 mt-0.5">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'services' && (
              <motion.div
                key="step-services"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 font-sans"
              >
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  Select the tailored corporate services you wish to scope during the free consultation call. You can choose multiple.
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Services of Interest *</label>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {SERVICES.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                          selectedServices.includes(s.id)
                            ? 'border-emerald-500 bg-emerald-50/50'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border transition ${
                          selectedServices.includes(s.id) ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 text-transparent'
                        }`}>
                          <Check className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{s.title}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{s.shortDescription}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.services && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.services}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Preferred Investment Structure</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'one_time', label: 'One-Time Fee', desc: 'Direct Capital Asset' },
                      { key: 'hybrid', label: 'Hybrid Model', desc: 'Setup + Monthly Sub' },
                      { key: 'undecided', label: 'Undecided / Custom', desc: 'Discuss during call' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setPricingPreference(opt.key as PaymentOption | 'undecided')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer ${
                          pricingPreference === opt.key
                            ? 'border-emerald-500 bg-emerald-50 text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs font-bold">{opt.label}</span>
                        <span className="text-[10px] text-slate-450 mt-0.5">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'schedule' && (
              <motion.div
                key="step-schedule"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 font-sans"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Preferred Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-white border border-slate-250 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                      />
                    </div>
                    {errors.preferredDate && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.preferredDate}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Preferred Time (EST) *</label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-white border border-slate-250 rounded-xl py-3 px-4 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition h-[45px]"
                    >
                      <option value="09:00">09:00 AM EST (Morning Check)</option>
                      <option value="10:30">10:30 AM EST (Peak Focus)</option>
                      <option value="13:00">01:00 PM EST (After Lunch)</option>
                      <option value="14:30">02:30 PM EST (Afternoon Focus)</option>
                      <option value="16:00">04:00 PM EST (End of Day)</option>
                    </select>
                    {errors.preferredTime && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.preferredTime}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Additional Project Context (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <textarea
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={3}
                      placeholder="Briefly state your primary objectives, target demographic constraint, or legacy software you are utilizing."
                      className="w-full bg-white border border-slate-250 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed font-sans">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    What happens next?
                  </span>
                  A senior analyst from our Toronto team will call you on your provided number for a 15-minute diagnostic. We will review compatibility and deliver an initial modular proposal structure.
                </div>
              </motion.div>
            )}

            {step === 'success' && confirmedBooking && (
              <motion.div
                key="step-success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-6 space-y-5 font-sans"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold font-display text-slate-900">Consultation Requested!</h4>
                  <p className="text-sm text-slate-650 mt-1 max-w-md mx-auto leading-relaxed">
                    Thank you, {confirmedBooking.clientName}. Your diagnostic session has been logged in our Toronto calendar server.
                  </p>
                </div>

                <div className="mx-auto max-w-sm rounded-xl border border-slate-200 bg-slate-50 p-5 text-left space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2">Diagnostic Session Details</h5>
                  <div className="space-y-2 text-xs leading-relaxed">
                    <p className="text-slate-600"><strong className="text-slate-900">Organization:</strong> {confirmedBooking.companyName} ({confirmedBooking.companySize.toUpperCase()})</p>
                    <p className="text-slate-600"><strong className="text-slate-900">Selected Services:</strong> {confirmedBooking.selectedServices.map(id => SERVICES.find(s => s.id === id)?.title ? SERVICES.find(s => s.id === id)?.title?.split(' (')[0] : id).join(', ')}</p>
                    <p className="text-slate-600"><strong className="text-slate-900">Date & Time:</strong> {confirmedBooking.preferredDate} @ {confirmedBooking.preferredTime} EST</p>
                    <p className="text-slate-600"><strong className="text-slate-900">Contact Info:</strong> {confirmedBooking.phone} / {confirmedBooking.email}</p>
                    <p className="text-slate-600"><strong className="text-slate-900">Payment Focus:</strong> {confirmedBooking.pricingPreference === 'one_time' ? 'One-Time Fee' : confirmedBooking.pricingPreference === 'hybrid' ? 'Hybrid (Setup + Sub)' : 'Undecided'}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCloseAndReset}
                    className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 text-sm font-bold transition cursor-pointer"
                  >
                    Close & Finish
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        {step !== 'success' && (
          <div className="border-t border-slate-150 bg-slate-50 p-5 flex items-center justify-between font-sans">
            <div>
              {step !== 'profile' ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <span className="text-[11px] text-slate-450 font-mono font-bold tracking-wider">ONTARIO SLA METRICS</span>
              )}
            </div>

            <div>
              {step !== 'schedule' ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-6 py-2.5 text-xs font-bold text-white transition shadow-sm cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  Request Booking
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
