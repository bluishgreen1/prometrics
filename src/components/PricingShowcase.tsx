import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Sparkles, Percent, Tag, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { DETAILED_PRICING_SERVICES, BUNDLE_DEALS } from '../data';

interface PricingShowcaseProps {
  onBookSpecial: (serviceIds: string[], notes: string) => void;
  selectedServiceId?: string;
  onSelectedServiceIdChange?: (id: string) => void;
  activeTab?: 'services' | 'bundles';
  onActiveTabChange?: (tab: 'services' | 'bundles') => void;
}

export default function PricingShowcase({ 
  onBookSpecial,
  selectedServiceId: controlledServiceId,
  onSelectedServiceIdChange,
  activeTab: controlledActiveTab,
  onActiveTabChange
}: PricingShowcaseProps) {
  const [localActiveTab, setLocalActiveTab] = useState<'services' | 'bundles'>('services');
  const [localSelectedServiceId, setLocalSelectedServiceId] = useState<string>('web-presence');
  const [pricingOption, setPricingOption] = useState<'option1' | 'option2'>('option1');

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : localActiveTab;
  const setActiveTab = onActiveTabChange !== undefined ? onActiveTabChange : setLocalActiveTab;

  const selectedServiceId = controlledServiceId !== undefined ? controlledServiceId : localSelectedServiceId;
  const setSelectedServiceId = onSelectedServiceIdChange !== undefined ? onSelectedServiceIdChange : setLocalSelectedServiceId;

  const currentService = DETAILED_PRICING_SERVICES.find(s => s.id === selectedServiceId) || DETAILED_PRICING_SERVICES[0];

  return (
    <div className="space-y-12">
      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-brand-900 rounded-2xl border border-brand-800">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/10'
                : 'text-slate-500 hover:text-brand-700'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Core Operational Services</span>
          </button>
          <button
            onClick={() => setActiveTab('bundles')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeTab === 'bundles'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/10'
                : 'text-slate-500 hover:text-brand-700'
            }`}
          >
            <Tag className="h-4 w-4" />
            <span>Bundle Deals (Stack & Save)</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'services' ? (
          <motion.div
            key="services_pane"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Service & Option Selection Control Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-brand-800 bg-white p-6 rounded-3xl shadow-sm">
              
              {/* Service Selectors */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">
                  Step 1: Choose Operational Service
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                  {DETAILED_PRICING_SERVICES.map((srv) => {
                    const isActive = srv.id === selectedServiceId;
                    return (
                      <button
                        key={srv.id}
                        onClick={() => setSelectedServiceId(srv.id)}
                        className={`p-3 rounded-xl border text-center transition duration-300 cursor-pointer flex flex-col justify-center items-center h-20 ${
                          isActive
                            ? 'border-emerald-500 bg-brand-50 text-emerald-700 font-semibold shadow-md shadow-emerald-100'
                            : 'border-brand-800 bg-brand-950 text-slate-600 hover:bg-brand-900'
                        }`}
                      >
                        <span className="text-[11px] font-bold block leading-snug">{srv.title.split(' & ')[0]}</span>
                        <span className="text-[9px] text-slate-500 mt-1 uppercase font-mono tracking-tighter">
                          {srv.id === 'web-presence' ? '🌐 Web build' : srv.id === 'growth-engine' ? '📈 Outreach' : srv.id === 'customer-support' ? '📞 Support' : '📢 Marketing'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option Selector Slider */}
              <div className="lg:col-span-5 space-y-3 lg:border-l lg:border-brand-850 lg:pl-6 w-full">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 block">
                  Step 2: Compare Pricing Framework
                </span>
                <div className="grid grid-cols-2 gap-2.5 p-1 bg-brand-900 border border-brand-800 rounded-xl">
                  <button
                    onClick={() => setPricingOption('option1')}
                    className={`py-3 text-2xs sm:text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                      pricingOption === 'option1'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-500 hover:text-brand-700'
                    }`}
                  >
                    1. One-Time / Flat Fee
                  </button>
                  <button
                    onClick={() => setPricingOption('option2')}
                    className={`py-3 text-2xs sm:text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                      pricingOption === 'option2'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-500 hover:text-brand-700'
                    }`}
                  >
                    2. Hybrid Structure
                  </button>
                </div>
              </div>

            </div>

            {/* Price Description / Context Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-brand-900 border border-brand-850 px-6 py-4 rounded-2xl shadow-sm">
              <div>
                <h4 className="text-sm font-bold text-brand-700 flex items-center gap-2">
                  <Percent className="h-4 w-4 text-emerald-600" />
                  <span>{currentService.title} Pricing Framework</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{currentService.marketHeader}</p>
              </div>
              <span className="text-2xs font-mono font-extrabold uppercase tracking-widest text-emerald-700 bg-brand-50 px-2.5 py-1 rounded border border-brand-200">
                {pricingOption === 'option1' ? 'One-time CapEx' : 'Optimized Cashflow'}
              </span>
            </div>

            {/* 3 Tier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingOption === 'option1'
                ? currentService.option1Tiers.map((tier, i) => (
                    <div
                      key={i}
                      className={`relative flex flex-col justify-between rounded-3xl border p-6 md:p-8 bg-white transition-all duration-350 hover:scale-[1.01] ${
                        tier.highlighted
                          ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-xl shadow-emerald-500/5 animate-none'
                          : 'border-brand-800 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {tier.highlighted && (
                        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 px-3.5 py-1 text-[10px] font-mono font-extrabold uppercase tracking-widest text-white shadow-sm">
                          Most Popular
                        </div>
                      )}

                      <div className="space-y-6">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                            {tier.name} Package
                          </span>
                          <p className="text-4xl font-extrabold tracking-tight font-display text-brand-700 mt-2 flex items-baseline">
                            {tier.price.startsWith('from') ? tier.price : `$${tier.price}`}
                            <span className="text-xs font-normal text-slate-500 font-mono ml-1.5">{tier.subtitle}</span>
                          </p>
                          {tier.marketText && (
                            <p className="text-[10px] font-bold text-emerald-700 bg-brand-50 rounded px-2 py-0.5 inline-block mt-2 font-mono border border-brand-200">
                              {tier.marketText}
                            </p>
                          )}
                        </div>

                        {/* Features list */}
                        <ul className="space-y-3.5 border-t border-brand-850 pt-6">
                          {tier.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                              <div className="mt-0.5 rounded-full bg-brand-50 p-0.5 text-emerald-600 border border-brand-100">
                                <Check className="h-2.5 w-2.5" />
                              </div>
                              <span className="text-slate-600 leading-relaxed font-sans">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => onBookSpecial(
                          [currentService.id], 
                          `Interested in: ${currentService.title} - ${tier.name} Tier (Option 1: Flat/One-time)`
                        )}
                        className={`w-full mt-8 flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-bold rounded-xl transition cursor-pointer ${
                          tier.highlighted
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/10'
                            : 'bg-white hover:bg-slate-50 text-brand-700 border border-brand-800 shadow-sm'
                        }`}
                      >
                        <span>Secure {tier.name} Plan</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                : currentService.option2Tiers.map((tier, i) => (
                    <div
                      key={i}
                      className={`relative flex flex-col justify-between rounded-3xl border p-6 md:p-8 bg-white transition-all duration-350 hover:scale-[1.01] ${
                        tier.name === 'Medium'
                          ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-xl shadow-emerald-500/5'
                          : 'border-brand-800 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {tier.name === 'Medium' && (
                        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 px-3.5 py-1 text-[10px] font-mono font-extrabold uppercase tracking-widest text-white shadow-sm">
                          Optimized Value
                        </div>
                      )}

                      <div className="space-y-6">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                            {tier.name} Hybrid Setup
                          </span>
                          
                          <div className="mt-4 bg-brand-900 p-3 rounded-2xl border border-dashed border-brand-800">
                            <div>
                              <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold tracking-wider">Estimated Term</span>
                              <span className="text-sm font-extrabold text-brand-700 block mt-1 leading-snug">
                                {tier.setupFee} & {tier.monthlyFee}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-brand-850 pt-3">
                            <span className="text-[10px] text-slate-500">Estimated Total (Year 1)</span>
                            <span className="text-xs font-mono font-bold text-emerald-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                              {tier.year1Total}
                            </span>
                          </div>
                        </div>

                        {/* Hybrid Service inclusions summary */}
                        <div className="space-y-3 pt-4 border-t border-brand-850">
                          <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                            {currentService.id === 'web-presence' && `Configures a custom-tailored layout and responsive build designed for the ${tier.name} business scale under a lower setup capital margin.`}
                            {currentService.id === 'growth-engine' && `Establishes a baseline operating setup targeting target decision makers, paired with a success fee per qualified lead.`}
                            {currentService.id === 'customer-support' && `Setup fee covers localized voice receptionist configuration and active CRM pipeline onboarding, paired with priority customer desk maintenance.`}
                            {currentService.id === 'digital-marketing' && `Establishes a managed growth campaign retainer, paired with ad optimization performance management.`}
                          </p>
                          <div className="flex gap-2 items-center text-[10px] text-slate-500 font-sans">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Full priority support audit included.</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onBookSpecial(
                          [currentService.id], 
                          `Interested in: ${currentService.title} - ${tier.name} Hybrid Structure (Option 2)`
                        )}
                        className={`w-full mt-8 flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-bold rounded-xl transition cursor-pointer ${
                          tier.name === 'Medium'
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/10'
                            : 'bg-white hover:bg-slate-50 text-brand-700 border border-brand-800 shadow-sm'
                        }`}
                      >
                        <span>Secure Hybrid Plan</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
              }
            </div>

            {/* General hybrid footnotes */}
            {pricingOption === 'option2' && currentService.hybridNotes && (
              <div className="text-center max-w-2xl mx-auto p-4 bg-brand-900 rounded-xl border border-dashed border-brand-850 text-[10px] text-slate-500 font-sans">
                💡 {currentService.hybridNotes}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="bundles_pane"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Introductory copy */}
            <div className="p-5 bg-brand-50 border border-brand-250 rounded-2xl text-center space-y-1">
              <h4 className="text-sm font-bold text-brand-700">Stack Operational Modules & Save Capital</h4>
              <p className="text-xs text-slate-600 font-sans">Combine our foundational systems into seamless corporate bundles and lock in major discount benefits.</p>
            </div>

            {/* List of Bundle deals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
              {BUNDLE_DEALS.map((bundle) => (
                <div
                  key={bundle.id}
                  className="flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-brand-800 bg-white hover:shadow-xl hover:border-emerald-500 transition-all duration-300 relative overflow-hidden group"
                >
                  {bundle.badge && (
                    <div className="absolute top-3 right-3 bg-brand-50 text-emerald-700 border border-brand-200 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider font-mono">
                      {bundle.badge}
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase tracking-wider">{bundle.tierSummary}</span>
                      <h4 className="text-xl font-extrabold font-display text-brand-700 mt-1">{bundle.name}</h4>
                      <p className="text-xs text-emerald-600 font-semibold font-sans mt-0.5">{bundle.servicesIncluded}</p>
                    </div>

                    {/* Price structure */}
                    <div className="flex items-center gap-4 bg-brand-900 p-4 rounded-xl border border-brand-850">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono block uppercase">Bundle Investment</span>
                        <span className="text-base font-extrabold text-brand-700">{bundle.dealPrice}</span>
                      </div>
                      <div className="ml-auto bg-brand-50 border border-brand-250 text-emerald-700 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                        {bundle.saveText}
                      </div>
                    </div>

                    {/* Inclusions list */}
                    <ul className="space-y-2 pt-4 border-t border-brand-850">
                      {bundle.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <span className="mt-0.5 text-emerald-600 font-mono font-extrabold">✓</span>
                          <span className="text-slate-600 leading-relaxed font-sans">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      // Map bundle identifiers to relevant database keys
                      let keys: string[] = [];
                      if (bundle.id.includes('starter')) keys = ['web-presence', 'growth-engine'];
                      else if (bundle.id.includes('visibility')) keys = ['web-presence', 'digital-marketing'];
                      else if (bundle.id.includes('popular')) keys = ['web-presence', 'growth-engine', 'customer-support'];
                      else if (bundle.id.includes('machine')) keys = ['growth-engine', 'customer-support', 'digital-marketing'];
                      else keys = ['web-presence', 'growth-engine', 'customer-support', 'digital-marketing'];

                      onBookSpecial(keys, `Unlock Bundle Offer: ${bundle.name} (${bundle.servicesIncluded})`);
                    }}
                    className="w-full mt-6 flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-bold rounded-xl text-slate-700 bg-white border border-brand-800 hover:border-emerald-500 hover:text-emerald-700 hover:bg-slate-50 transition-all duration-300 cursor-pointer"
                  >
                    <span>Secure Bundle Discount</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
