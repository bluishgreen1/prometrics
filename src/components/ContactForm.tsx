import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Query');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<ContactMessage | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Dynamic validations
    if (!name.trim()) {
      setError('Your name is required');
      return;
    }
    if (!email.trim()) {
      setError('Your email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid business email address');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError('Message must be at least 10 characters long');
      return;
    }

    const newMessage: ContactMessage = {
      id: 'msg-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone: phone.trim() ? phone : undefined,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    const existing = localStorage.getItem('prometrics_contact_messages');
    const messages = existing ? JSON.parse(existing) : [];
    messages.push(newMessage);
    localStorage.setItem('prometrics_contact_messages', JSON.stringify(messages));

    setLastMessage(newMessage);
    setSubmitted(true);

    // Reset fields
    setName('');
    setEmail('');
    setPhone('');
    setSubject('General Query');
    setMessage('');
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden border-t border-brand-800">
      {/* Decorative accent blur bubble */}
      <div className="absolute top-1/2 left-2/3 h-80 w-80 rounded-full bg-emerald-50/20 blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title container */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">
            Let’s Integrate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-700 tracking-tight">
            Initiate connection with ProMetrics Canada.
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-sans">
            Have questions about standard pricing tiers or specific timeline delivery slots? Send our team a message or call us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left panel info */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-display text-brand-700">Direct Coordinates</h3>
              <p className="text-xs text-slate-500 font-sans">Our analytics headquarters are based in Toronto, managing client pipelines across all Canadian provinces.</p>
              
              <div className="space-y-4">
                {/* Mail */}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl border border-brand-800 bg-brand-950/40 hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="mt-0.5 rounded-lg bg-brand-50 p-2 text-emerald-600 group-hover:bg-brand-100">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block tracking-wider">Official Email</span>
                    <span className="text-sm font-semibold text-brand-700 group-hover:text-emerald-700 break-all">{BUSINESS_INFO.email}</span>
                  </div>
                </a>

                {/* Telephone */}
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-start gap-4 p-4 rounded-xl border border-brand-800 bg-brand-950/40 hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="mt-0.5 rounded-lg bg-brand-50 p-2 text-emerald-600 group-hover:bg-brand-100">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block tracking-wider">Telephone Line</span>
                    <span className="text-sm font-semibold text-brand-700 group-hover:text-emerald-700">{BUSINESS_INFO.phone}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-brand-800 bg-brand-950/40 hover:bg-white hover:shadow-lg transition-all group">
                  <div className="mt-0.5 rounded-lg bg-brand-50 p-2 text-emerald-600 group-hover:bg-brand-100">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block tracking-wider">HQ Operations</span>
                    <span className="text-sm font-semibold text-brand-700 group-hover:text-emerald-700">{BUSINESS_INFO.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support and Hours */}
            <div className="rounded-2xl border border-brand-850 bg-brand-900/40 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600">Service Availability</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Our support team manages active networks 24/7/365. General and billing integration inquiries are responded to natively by administrative agents Monday through Friday.
              </p>
              <p className="text-[11px] font-mono text-brand-700 font-bold">
                {BUSINESS_INFO.operatingHours}
              </p>
            </div>
          </div>

          {/* Right form submission panel */}
          <div className="lg:col-span-7 rounded-2xl border border-brand-800 bg-slate-50 p-6 md:p-10 relative shadow-sm">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form-key"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold font-display text-brand-700 mb-6">Send an Integration Proposal</h3>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 animate-pulse" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jennifer Wu"
                        className="w-full bg-white border border-brand-800 rounded-xl py-2.5 px-4 text-xs text-brand-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Business email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.ca"
                        className="w-full bg-white border border-brand-800 rounded-xl py-2.5 px-4 text-xs text-brand-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 437 000-0000"
                        className="w-full bg-white border border-brand-800 rounded-xl py-2.5 px-4 text-xs text-brand-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-505 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Topic Focus</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-white border border-brand-800 rounded-xl py-2.5 px-4 text-xs text-brand-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition h-[40px] font-sans"
                      >
                        <option className="bg-white text-slate-900" value="General Query">General Administration Query</option>
                        <option className="bg-white text-slate-900" value="Web Presence Inquiry">Web Presence Modules Build</option>
                        <option className="bg-white text-slate-900" value="Growth Engine Deployment">Growth Engine (Outreach & Lead Gen)</option>
                        <option className="bg-white text-slate-900" value="Support Operations Outsourcing">24/7 Support Setup</option>
                        <option className="bg-white text-slate-900" value="Automated Call Routing Integration">Smart Receptionist</option>
                        <option className="bg-white text-slate-900" value="Corporate Performance Ads">Digital Marketing Proposal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">Details of your request *</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Outline any current issues you are experiencing, such as high missed-call volumes or outdated legacy website components."
                      className="w-full bg-white border border-brand-800 rounded-xl py-2.5 px-4 text-xs text-brand-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-700 hover:bg-slate-800 px-6 py-4 text-xs font-bold text-white shadow-lg shadow-brand-800/10 transition duration-300 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Transmit Message to Toronto Office</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success-key"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-brand-50 text-emerald-600 border border-brand-100 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 animate-none" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-brand-700 font-semibold">Message Transmitted!</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-sans">
                      Thank you for contacting us. We have successfully logged your inquiry in our local operations dashboard.
                    </p>
                  </div>

                  {lastMessage && (
                    <div className="mx-auto text-left bg-brand-900 p-4 border border-brand-800 rounded-xl max-w-md space-y-2 text-xs text-slate-600 font-sans shadow-md">
                      <p className="border-b border-brand-850 pb-1 text-[10px] font-mono text-emerald-605 uppercase tracking-widest font-extrabold font-mono">Logged Proposal ID: {lastMessage.id}</p>
                      <p><strong className="text-brand-705">Name:</strong> {lastMessage.name}</p>
                      <p><strong className="text-brand-705">Subject:</strong> {lastMessage.subject}</p>
                      <p><strong className="text-brand-705">Message excerpt:</strong> <span className="text-slate-505 line-clamp-2">{lastMessage.message}</span></p>
                    </div>
                  )}

                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
