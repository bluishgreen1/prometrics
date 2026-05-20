import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { CompanySize, PaymentOption } from '../types';
import { Check, Info, Calculator, Calendar, ArrowRight } from 'lucide-react';

interface PricingCalculatorProps {
  onBookWithServices: (serviceIds: string[]) => void;
}

export default function PricingCalculator({ onBookWithServices }: PricingCalculatorProps) {
  const [selectedSize, setSelectedSize] = useState<CompanySize>('smb');
  const [selectedServices, setSelectedServices] = useState<string[]>(['web-presence', 'growth-engine']);
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('hybrid');

  const getServiceDataForScale = (srvId: string, size: CompanySize) => {
    switch (srvId) {
      case 'web-presence':
        if (size === 'smb') return { oneTime: 1200, setup: 600, labelSuffix: ' once', hybridSuffix: ' setup + monthly' };
        if (size === 'mid') return { oneTime: 3500, setup: 1800, labelSuffix: ' once', hybridSuffix: ' setup + monthly' };
        return { oneTime: 9500, setup: 4500, labelSuffix: ' once', hybridSuffix: ' setup + monthly' };

      case 'growth-engine':
        if (size === 'smb') return { oneTime: 1200, setup: 599, labelSuffix: '/mo', hybridSuffix: '/mo + per lead' };
        if (size === 'mid') return { oneTime: 2500, setup: 999, labelSuffix: '/mo', hybridSuffix: '/mo + per lead' };
        return { oneTime: 5000, setup: 1999, labelSuffix: '/mo', hybridSuffix: '/mo + per lead' };

      case 'customer-support':
        if (size === 'smb') return { oneTime: 299, setup: 199, labelSuffix: '/mo', hybridSuffix: ' setup + monthly' };
        if (size === 'mid') return { oneTime: 599, setup: 349, labelSuffix: '/mo', hybridSuffix: ' setup + monthly' };
        return { oneTime: 1299, setup: 699, labelSuffix: '/mo', hybridSuffix: ' setup + monthly' };

      case 'digital-marketing':
        if (size === 'smb') return { oneTime: 899, setup: 499, labelSuffix: '/mo', hybridSuffix: '/mo + % of ad spend' };
        if (size === 'mid') return { oneTime: 1999, setup: 899, labelSuffix: '/mo', hybridSuffix: '/mo + % of ad spend' };
        return { oneTime: 3999, setup: 1499, labelSuffix: '/mo', hybridSuffix: '/mo + % of ad spend' };

      default:
        return { oneTime: 0, setup: 0, labelSuffix: '', hybridSuffix: '' };
    }
  };

  // Toggle Services
  const toggleService = (id: string) => {
    setSelectedServices(prev => {
      if (prev.includes(id)) {
        // keep at least 1
        if (prev.length === 1) return prev;
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  };

  // Calculate costs
  const calculateTotal = () => {
    let oneTimeTotal = 0;
    let setupTotal = 0;

    selectedServices.forEach(srvId => {
      const data = getServiceDataForScale(srvId, selectedSize);
      oneTimeTotal += data.oneTime;
      setupTotal += data.setup;
    });

    return {
      oneTime: oneTimeTotal,
      setup: setupTotal,
      monthly: 0,
    };
  };

  const getServicePriceLabel = (id: string, option: PaymentOption, size: CompanySize) => {
    const data = getServiceDataForScale(id, size);
    if (option === 'one_time') {
      return `from $${data.oneTime.toLocaleString()}${data.labelSuffix}`;
    } else {
      return `from $${data.setup.toLocaleString()}${data.hybridSuffix}`;
    }
  };

  const totals = calculateTotal();

  return (
    <div id="pricing-calculator" className="relative rounded-3xl border border-brand-800 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Parameter Panel */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <Calculator className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-bold font-display text-brand-700">Interactive Investment Estimator</h4>
          </div>

          {/* 1. Company Size */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-700">
              Step 1: Define Organization Scale
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { key: 'smb', label: 'SMB (1-5 Staff)', desc: '1.0x Scale' },
                { key: 'mid', label: 'Mid-Market (5-30 Staff)', desc: '1.4x Scale' },
                { key: 'enterprise', label: 'Enterprise (30+ Staff)', desc: '2.2x Scale' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedSize(opt.key as CompanySize)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition cursor-pointer ${
                    selectedSize === opt.key
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-md shadow-emerald-100 font-semibold'
                      : 'border-brand-800 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold">{opt.label}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Toggle Services */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-700">
              Step 2: Choose Modular Modules
            </label>
            <div className="grid grid-cols-1 gap-2">
              {SERVICES.map((s) => {
                const isActive = selectedServices.includes(s.id);
                return (
                  <div
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-50/50 text-slate-800'
                        : 'border-brand-800 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-5 w-5 items-center justify-center rounded border transition ${
                        isActive ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 text-transparent'
                      }`}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800">{s.title.split(' (')[0]}</span>
                    </div>
                    
                    <span className="text-[11px] font-mono font-semibold text-emerald-600">
                      {getServicePriceLabel(s.id, paymentOption, selectedSize)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Toggles Option Path */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-700">
              Step 3: Compare Pricing Framework
            </label>
            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-slate-50 border border-brand-800 overflow-hidden">
              <button
                onClick={() => setPaymentOption('one_time')}
                className={`py-3 text-xs font-bold rounded-xl transition cursor-pointer ${
                  paymentOption === 'one_time'
                    ? 'bg-emerald-600 border border-emerald-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                1. One-Time Capital Fee
              </button>
              <button
                onClick={() => setPaymentOption('hybrid')}
                className={`py-3 text-xs font-bold rounded-xl transition cursor-pointer ${
                  paymentOption === 'hybrid'
                    ? 'bg-emerald-600 border border-emerald-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Hybrid Model (Optimized)
              </button>
            </div>
          </div>
        </div>

        {/* Right Dynamic Live Box */}
        <div className="w-full lg:w-96 flex flex-col justify-between rounded-2xl border border-brand-800 bg-white shadow-md p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded">
                Live Cost Summary
              </span>
              <h5 className="text-xl font-extrabold font-display text-slate-950 mt-3">Invoice Preview</h5>
              <p className="text-xs text-slate-500 mt-1">Configured for {selectedSize === 'smb' ? '1-5 Staff (SMB)' : selectedSize === 'mid' ? '5-30 Staff (Mid-Market)' : '30+ Staff (Enterprise)'}</p>
            </div>

            {/* Scope Summary Line items */}
            <div className="border-t border-b border-brand-800 py-4 space-y-2.5">
              {selectedServices.map(srvId => {
                const srvObj = SERVICES.find(s => s.id === srvId);
                if (!srvObj) return null;
                return (
                  <div key={srvId} className="flex justify-between items-center text-xs text-slate-605">
                    <span className="truncate max-w-[150px] text-slate-700 font-medium">{srvObj.title.split(' (')[0]}</span>
                    <span className="font-mono text-slate-900 font-semibold text-[11px] text-right">
                      {getServicePriceLabel(srvId, paymentOption, selectedSize)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Big pricing text */}
            <AnimatePresence mode="wait">
              {paymentOption === 'one_time' ? (
                <motion.div
                  key="one_time_view"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1"
                >
                  <p className="text-xs text-slate-500">Total Investment (Flat Capital Plan)</p>
                  <p className="text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                    from ${totals.oneTime.toLocaleString()}
                    <span className="text-xs font-normal text-emerald-500 font-mono ml-1.5">CAD</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Full intellectual property ownership given on project sign-off.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="hybrid_view"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold">One-time Setup</p>
                      <p className="text-2xl font-bold text-slate-900 tracking-tight font-display">
                        from ${totals.setup.toLocaleString()}
                        <span className="text-[10px] font-normal text-slate-400 ml-0.5"> CAD</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-550 uppercase tracking-wide font-semibold">Ongoing Monthly</p>
                      <p className="text-xl font-extrabold text-emerald-600 tracking-tight font-display mt-0.5">
                        Custom Quote
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 border-t border-slate-100 pt-3">
                    Subscription includes high-performance hosting setup, CRM pipeline optimizations, and continuous system support.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Book action CTA */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => onBookWithServices(selectedServices)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-800/10 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Call for this Package</span>
              <ArrowRight className="h-4 w-4 text-emerald-300" />
            </button>
            <div className="flex justify-center items-center gap-1 text-[10px] text-slate-400">
              <Info className="h-3 w-3 text-emerald-600" />
              <span>All estimates exclude local taxes (GST/HST).</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
