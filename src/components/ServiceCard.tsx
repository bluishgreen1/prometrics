import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, TrendingUp, Headphones, PhoneCall, Megaphone, HelpCircle, Check, ArrowRight, Star, ArrowUpRight } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  key?: string;
  service: Service;
  onBook: () => void;
  onSelectConfigure: () => void;
  onLearnMore: () => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'Globe': return Globe;
    case 'TrendingUp': return TrendingUp;
    case 'Headphones': return Headphones;
    case 'PhoneCall': return PhoneCall;
    case 'Megaphone': return Megaphone;
    default: return HelpCircle;
  }
};

export default function ServiceCard({ service, onBook, onSelectConfigure, onLearnMore }: ServiceCardProps) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const Icon = getIcon(service.iconName);

  const getPricingLabels = () => {
    switch (service.id) {
      case 'web-presence':
        return {
          opt1: 'from $1,200',
          opt1Suffix: 'one-time',
          opt2: 'from $600 setup + monthly'
        };
      case 'growth-engine':
        return {
          opt1: 'from $1,200',
          opt1Suffix: 'per month',
          opt2: 'from $599/mo + per lead'
        };
      case 'customer-support':
        return {
          opt1: 'from $299',
          opt1Suffix: 'per month',
          opt2: 'from $199 setup + monthly'
        };
      case 'digital-marketing':
        return {
          opt1: 'from $899',
          opt1Suffix: 'per month',
          opt2: 'from $499/mo + % of ad spend'
        };
      default:
        return {
          opt1: `from $${service.basePriceOneTime}`,
          opt1Suffix: 'one-time',
          opt2: 'setup + monthly'
        };
    }
  };

  const labels = getPricingLabels();

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-brand-800 bg-white hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 p-6 md:p-8">
      
      {/* Decorative vertical gradient strip on hover */}
      <div className="absolute top-0 left-0 h-1 w-full bg-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div>
        {/* Header content */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 border border-brand-800 group-hover:bg-brand-50 group-hover:border-emerald-500 transition-all duration-300">
            <Icon className="h-6 w-6 text-emerald-600 group-hover:text-emerald-700 transition-all duration-300" />
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase tracking-wider">PRIMARY METRIC</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-sm font-extrabold text-emerald-600 mt-0.5">
              <Star className="h-3 w-3 fill-emerald-500 text-emerald-500" />
              {service.metricValue}
            </span>
          </div>
        </div>

        {/* Title */}
        <h4 className="mt-5 text-xl font-extrabold font-display text-brand-700 tracking-tight transition-all duration-300">
          {service.title}
        </h4>
        
        {/* Metric Label */}
        <p className="text-[10px] font-mono font-medium text-slate-400 mt-1 uppercase">
          {service.metricLabel}
        </p>

        {/* Short Description */}
        <p className="mt-3.5 text-xs text-slate-500 leading-relaxed font-sans">
          {service.shortDescription}
        </p>

        {/* Feature bullet list */}
        <ul className="mt-5 space-y-2 border-t border-brand-850 pt-5">
          {service.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <div className="mt-0.5 rounded-full bg-brand-50 p-0.5 text-emerald-600 border border-brand-100">
                <Check className="h-2.5 w-2.5" />
              </div>
              <span className="text-slate-600 leading-relaxed font-sans">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Toggleable extended detailed pitch */}
        <div className="mt-4">
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{showFullDesc ? 'Show less' : 'Read absolute specification'}</span>
            <motion.span animate={{ rotate: showFullDesc ? 180 : 0 }}>↓</motion.span>
          </button>

          <AnimatePresence>
            {showFullDesc && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-slate-600 leading-relaxed bg-brand-900 border border-brand-800 p-3.5 rounded-xl mt-3 font-sans">
                  {service.fullDescription}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pricing and Action Drawer */}
      <div className="mt-8 pt-5 border-t border-brand-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Starting from</span>
          <p className="text-sm font-extrabold text-brand-700">
            {labels.opt1}{' '}
            <span className="text-[10px] text-emerald-605 font-normal font-mono">{labels.opt1Suffix}</span>
          </p>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            or {labels.opt2}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={onSelectConfigure}
              className="flex-1 sm:flex-initial py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-brand-800 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 focus:outline-none"
              title="Interact with custom config"
            >
              <span>Preview Cost</span>
              <ArrowUpRight className="h-3 w-3 text-emerald-600" />
            </button>
            
            <button
              onClick={onBook}
              className="flex-1 sm:flex-initial py-2 px-4 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-100 transition-all cursor-pointer flex items-center justify-center gap-1 focus:outline-none"
            >
              <span>Secure Plan</span>
              <ArrowRight className="h-3.5 w-3.5 text-white/90" />
            </button>
          </div>

          <button
            onClick={onLearnMore}
            className="w-full py-1.5 px-3 text-[11px] font-semibold text-slate-500 hover:text-brand-700 hover:bg-slate-100/50 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 border border-transparent hover:border-brand-800"
          >
            <span>Learn More Details</span>
            <ArrowRight className="h-3 w-3 text-slate-400" />
          </button>
        </div>
      </div>

    </div>
  );
}
