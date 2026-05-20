import React from 'react';
import { Building2, Award, Users, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function AboutUs() {
  const coreValues = [
    {
      icon: Award,
      title: 'Metrics-First Engineering',
      desc: 'We don’t believe in styling vanity metrics. Every line of web code and advertising spend we direct is tied to concrete conversions, customer response times, or cold revenue pipeline.'
    },
    {
      icon: ShieldCheck,
      title: 'CASL & PIPEDA Compliant',
      desc: 'Fully structured around Canadian privacy regimes. Our smart responders, messaging setups, and contact capture pipelines conform tightly to federal anti-spam and privacy constraints.'
    },
    {
      icon: Users,
      title: 'Modular Scale-Matching',
      desc: 'Our modular solutions allow a small Montreal boutique to leverage the same high-performing support protocols and reception automation as a major, high-volume logistics enterprise in BC.'
    }
  ];

  const businessTiers = [
    {
      id: 'smb-tier',
      title: 'Small Businesses',
      desc: 'Establish powerful local credibility. Ideal for family services, regional physical retail, and boutiques needing an initial Web Presence and Smart Receptionist call protection.',
      focus: 'Cost efficiency, zero missed office calls, instant local brand positioning.'
    },
    {
      id: 'mid-tier',
      title: 'Medium Businesses',
      desc: 'Deploy performance-driven Growth Engines and automated inbound customer lines to compete effectively against national giants without expanding headcount.',
      focus: 'CRM pipeline automation, Google Maps local supremacy, and continuous performance marketing.'
    },
    {
      id: 'enterprise-tier',
      title: 'Big Enterprises',
      desc: 'Support huge traffic spikes, bilingual regional configurations, and custom CRM API nodes. Built with strict enterprise SLAs and dedicated account management.',
      focus: '24/7 client ticket desk infrastructure, full technical support integrations, custom database architectures.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 relative overflow-hidden border-t border-brand-800">
      {/* Decorative side blur glow background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-80 w-80 rounded-full bg-emerald-50/40 blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-700 tracking-tight">
            We are the scaling architects for Canadian business.
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-sans">
            At ProMetrics, based in Toronto, Ontario, we build visual infrastructures, configure high-intent lead systems, and manage critical continuous front-desk operations. We don’t talk about ideas; we engineer outcomes.
          </p>
        </div>

        {/* 1. Core values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-brand-800 p-6 md:p-8 space-y-4 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-emerald-600 border border-brand-100">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-lg font-bold font-display text-brand-700">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{v.desc}</p>
              </div>
            );
          })}
        </div>

        {/* 2. Target Markets Segment */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold font-display text-brand-700">Engineered for Your Specific Scale</h3>
            <p className="text-xs text-slate-400 font-sans">Our modular packages match the pace of your development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessTiers.map((tier) => (
              <div key={tier.id} className="relative rounded-2xl border border-brand-800 bg-white p-6 md:p-8 flex flex-col justify-between hover:shadow-lg hover:border-emerald-500 transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-emerald-600" />
                    <h4 className="text-base font-bold text-brand-700 group-hover:text-emerald-600 transition-colors">{tier.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{tier.desc}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-brand-850 font-mono">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">CORE CRITERIA FIT</span>
                  <p className="text-xs text-emerald-605 mt-1 font-semibold">{tier.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. National Testimonials Grid */}
        <div className="space-y-8 bg-white rounded-3xl p-6 md:p-10 border border-brand-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase block tracking-wider">CLIENT STORIES</span>
              <h3 className="text-2xl font-bold font-display text-brand-700 mt-1">Validated by Leaders Across Canada</h3>
            </div>
            <p className="text-xs text-slate-500 max-w-sm font-sans">From Vancouver logistics firms to Montreal retail distributors, we support businesses that expect performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-brand-950/40 p-5 rounded-2xl border border-brand-850 space-y-4 flex flex-col justify-between hover:border-emerald-500/30 transition-colors duration-350">
                <p className="text-xs text-slate-600 italic leading-relaxed font-sans">
                  "{t.text}"
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-brand-850">
                  <div>
                    <h5 className="text-xs font-bold text-brand-700">{t.author}</h5>
                    <p className="text-[10px] text-slate-400 font-sans">{t.role}, {t.company}</p>
                  </div>
                  <span className="text-[10px] font-mono text-brand-700 bg-brand-900 px-2.5 py-1 rounded border border-brand-800 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-emerald-600" />
                    {t.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
