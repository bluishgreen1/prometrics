import React from 'react';
import { Mail, Phone, MapPin, Building2, ShieldCheck, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onTermsClick: () => void;
}

export default function Footer({ onNavigate, onTermsClick }: FooterProps) {
  const year = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="bg-brand-700 border-t border-slate-800 text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Left Block description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => handleNavClick(e, 'home')}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 font-display text-base font-extrabold text-white">
                PM
              </span>
              <span className="font-display text-xl font-extrabold text-white">
                Pro<span className="text-emerald-400">Metrics</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-sm">
              We deploy custom web infrastructures, automated customer response desks, and lead generation systems tailored for small, medium, and enterprise corporate partners across Canada.
            </p>
            
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                Reg. Ontario
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                CASL / PIPEDA Compliant
              </span>
            </div>
          </div>

          {/* Center navigation links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Sitemap Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-slate-300 hover:text-emerald-400 transition">
                  Corporate Portal Home
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="text-slate-300 hover:text-emerald-400 transition">
                  Primary Capabilities (What We Do)
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-slate-300 hover:text-emerald-400 transition">
                  Investment Calculator & Pricing Tiers
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-slate-300 hover:text-emerald-400 transition">
                  Values & National Operations
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-slate-300 hover:text-emerald-400 transition">
                  Contact & Integration Inquiries
                </a>
              </li>
              <li>
                <button 
                  onClick={(e) => { e.preventDefault(); onTermsClick(); }} 
                  className="text-slate-300 hover:text-emerald-400 transition text-left cursor-pointer"
                >
                  Legal Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Right Panel contact list */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Toronto Support Hub</h4>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Call Directly: <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-white hover:text-emerald-450 transition font-semibold">{BUSINESS_INFO.phone}</a></span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Email: <a href={`mailto:${BUSINESS_INFO.email}`} className="text-white hover:text-emerald-450 transition break-all font-semibold">{BUSINESS_INFO.email}</a></span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{BUSINESS_INFO.location}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal baseline */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>© {year} {BUSINESS_INFO.name} Canada Inc. All Rights Reserved. All estimates in CAD.</p>
            <span className="hidden md:inline text-slate-600">|</span>
            <button 
              onClick={(e) => { e.preventDefault(); onTermsClick(); }} 
              className="text-slate-300 hover:text-emerald-405 hover:underline transition cursor-pointer font-bold uppercase"
            >
              Terms of Service
            </button>
          </div>
          
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-emerald-400 fill-emerald-400" /> in Canada for business growth.
          </p>
        </div>

      </div>
    </footer>
  );
}
