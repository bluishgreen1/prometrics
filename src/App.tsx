import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Users, 
  ShieldCheck, 
  MapPin, 
  Star 
} from 'lucide-react';

// Sub-components
import Navbar from './components/Navbar';
import ConsultationModal from './components/ConsultationModal';
import PricingCalculator from './components/PricingCalculator';
import PricingShowcase from './components/PricingShowcase';
import ServiceCard from './components/ServiceCard';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import TermsOfService from './components/TermsOfService';
import AnalyticsDashboard from './components/AnalyticsDashboard';

// Static Data & Metadata
import { SERVICES, BUSINESS_INFO, FAQ_ITEMS } from './data';
import { trackPageView } from './lib/analytics';

const SECTION_PATHS: Record<string, string> = {
  home: '/',
  services: '/services',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
};

export default function App() {
  const isAnalyticsRoute = window.location.pathname.startsWith('/analytics');
  const [isTermsPage, setIsTermsPage] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [showcaseServiceId, setShowcaseServiceId] = useState<string>('web-presence');
  const [showcaseTab, setShowcaseTab] = useState<'services' | 'bundles'>('services');
  
  // Highlighting active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      const sections = ['home', 'services', 'pricing', 'about', 'contact'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check the initial path on mount to handle direct deep link visits
  useEffect(() => {
    if (isAnalyticsRoute) return;

    const path = window.location.pathname;

    // Give a small delay so elements render, then navigate
    const timer = setTimeout(() => {
      if (path === '/services') {
        handleNavigate('services');
      } else if (path === '/pricing') {
        handleNavigate('pricing');
      } else if (path === '/contact') {
        handleNavigate('contact');
      } else if (path === '/about' || path === '/about-us') {
        handleNavigate('about');
      } else if (path === '/terms' || path === '/terms-of-service') {
        setIsTermsPage(true);
        trackPageView('/terms');
      } else {
        trackPageView('/');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Intercept any anchor click event globally to ensure smooth scrolling
  useEffect(() => {
    const handleAnchorLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorNode = target.closest('a');
      
      if (anchorNode) {
        const href = anchorNode.getAttribute('href');
        // Double check it's an internal on-page hash link
        if (href && href.startsWith('#') && href.length > 1) {
          const id = href.substring(1);
          const element = document.getElementById(id);
          if (element) {
            e.preventDefault();
            handleNavigate(id);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorLinkClick);
    return () => document.removeEventListener('click', handleAnchorLinkClick);
  }, []);

  // Manual smooth scrolling trigger
  const handleNavigate = (sectionId: string) => {
    setIsTermsPage(false);
    setActiveSection(sectionId);
    trackPageView(SECTION_PATHS[sectionId] || `/${sectionId}`);

    // Allow React screen state switcher to cycle
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        // Calculate offset to account for sticky nav height (80px)
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      }
    }, 50);
  };

  // Trigger book consult with target service pre-selected
  const handleBookWithService = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookModalOpen(true);
  };

  // Trigger book consult when modular pricing configurations are checked out
  const handleBookWithMultipleServices = (serviceIds: string[]) => {
    if (serviceIds && serviceIds.length > 0) {
      setPreselectedServiceId(serviceIds[0]);
    } else {
      setPreselectedServiceId(undefined);
    }
    setIsBookModalOpen(true);
  };

  const handleBookWithSpecialNotes = (serviceIds: string[], notes: string) => {
    if (serviceIds && serviceIds.length > 0) {
      setPreselectedServiceId(serviceIds[0]);
    } else {
      setPreselectedServiceId(undefined);
    }
    // Set notes draft in localStorage so ConsultationModal preloads it seamlessly
    localStorage.setItem('prometrics_draft_additionalNotes', notes);
    setIsBookModalOpen(true);
  };

  // Set calculator selection and scroll down
  const handleConfigureService = (serviceId: string) => {
    const el = document.getElementById('pricing');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLearnMore = (serviceId: string) => {
    setShowcaseServiceId(serviceId);
    setShowcaseTab('services');
    
    const el = document.getElementById('pricing');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (isAnalyticsRoute) {
    return <AnalyticsDashboard />;
  }

  return (
    <div className="min-h-screen bg-brand-950 font-sans antialiased text-brand-700 relative leading-relaxed overflow-x-hidden">
      
      {/* Top Banner indicating localized services */}
      <div className="w-full bg-emerald-600 border-b border-brand-800 py-3 text-center text-[11px] font-mono font-bold tracking-wider text-white flex items-center justify-center gap-2 px-4 shadow-sm relative z-20">
        <span className="h-2 w-2 rounded-full bg-brand-200 animate-pulse shrink-0" />
        <span>Delivering high-KPI technology and scaling services across Canada (GST/HST accredited)</span>
      </div>

      {/* Responsive Header Navbar */}
      <Navbar 
        onBookClick={() => handleBookWithService()} 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />

      {isTermsPage ? (
        <TermsOfService onBack={() => { setIsTermsPage(false); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
      ) : (
        <main className="relative">
        
        {/* HERO SECTION */}
        <section id="home" className="relative pt-20 pb-24 md:pt-28 md:pb-36 flex items-center justify-center overflow-hidden bg-brand-950">
          
          {/* Subtle ambient light gradient */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
              
              {/* Tagline pill */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full bg-brand-900 border border-brand-800 px-4 py-1.5 text-xs font-mono font-bold text-emerald-700 shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                <span>Premium Modular Operations Support</span>
              </motion.div>

              {/* Title */}
              <div className="space-y-4 max-w-3xl">
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.15] tracking-tight text-brand-700 text-center"
                >
                  We Engine the Metrics That <br className="hidden sm:inline" /> 
                  <span className="text-emerald-600">
                    Multiply Canadian Brands.
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg text-slate-505 font-sans leading-relaxed max-w-2xl mx-auto text-center"
                >
                  {BUSINESS_INFO.longTagline}
                </motion.p>
              </div>

              {/* Actions */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
              >
                <button
                  onClick={() => handleBookWithService()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand-700 hover:bg-slate-800 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-brand-800/10 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="h-4.5 w-4.5 text-emerald-300" />
                </button>
                
                <button
                  onClick={() => handleNavigate('pricing')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white border border-brand-800 text-brand-700 hover:bg-slate-50 px-6 py-4 text-sm font-bold transition-all cursor-pointer"
                >
                  Explore Price Calculator
                </button>
              </motion.div>

              {/* Telemetry Stats Rows */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-brand-800 w-full"
              >
                {[
                  { label: 'ACTIVE CANADIAN SYSTEMS', val: '80+' },
                  { label: 'HELPDESK SLA SLA', val: '<30s' },
                  { label: 'AVG CONVERSION BOOST', val: '4.2x' },
                  { label: 'OPERATION SCALE', val: '24/7' },
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1 text-center">
                    <p className="text-2xl sm:text-3xl font-black font-display text-brand-700 tracking-tight">{stat.val}</p>
                    <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* PRIMARY CAPABILITIES - WHAT WE DO */}
        <section id="services" className="py-24 bg-brand-950 border-t border-brand-800 relative">
          {/* Subtle decoration sphere */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 h-72 w-72 rounded-full bg-emerald-50/20 blur-[100px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
            
            {/* Header copy */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">
                Primary Modules
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-brand-700">
                Engineered systems built for maximum bottom-line impact.
              </h2>
              <p className="text-sm text-slate-505 leading-relaxed font-sans">
                Choose the modular operational additions your team requires. Our setups integrate smoothly in small ventures as well as high-volume big enterprises.
              </p>
            </div>

            {/* 5 primary services renders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((srv) => (
                <ServiceCard 
                  key={srv.id} 
                  service={srv} 
                  onBook={() => handleBookWithService(srv.id)} 
                  onSelectConfigure={() => handleConfigureService(srv.id)} 
                  onLearnMore={() => handleLearnMore(srv.id)}
                />
              ))}
              
              {/* Promotional call block to cap off the grid */}
              <div className="rounded-2xl border border-dashed border-brand-800 bg-brand-900/50 hover:bg-brand-900/80 transition-all p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded bg-brand-50 border border-brand-100 text-emerald-600 font-mono text-[9px] px-2.5 py-1 uppercase font-bold">
                    Custom Scoping Option
                  </div>
                  <h4 className="text-lg font-bold text-brand-700 font-display">Need a custom localized SLA or complete CRM migration?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    Other technical custom architectures (AWS instances, private API structures, custom bilingual support dialers) are scoping directly with Canadian directors on consultation calls.
                  </p>
                </div>
                
                <button
                  onClick={() => handleBookWithService()}
                  className="w-full py-3.5 text-xs font-bold text-brand-700 bg-white border border-brand-800 rounded-xl hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Scope Custom Setup</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* PRICING MODULAR CALCULATOR */}
        <section id="pricing" className="py-24 bg-brand-950 border-t border-brand-800 relative">
          {/* Subtle highlight ambient globe */}
          <div className="absolute top-1/3 left-10 h-80 w-80 rounded-full bg-emerald-50/20 blur-[120px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 relative z-10 animate-none">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 animate-none">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">
                Transparent Frameworks
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-700 tracking-tight">
                Two clear pricing structures. No hidden costs.
              </h2>
              <p className="text-sm text-slate-505 leading-relaxed font-sans">
                Select your option method: **Option 1 — One-Time Capital Fee** (intellectual property handover) or **Option 2 — Hybrid Model** (low setup fee + predictable monthly support subscription). Compare and explore exact budgets below.
              </p>
            </div>

            {/* High fidelity options, tiers & stacks showcase */}
            <PricingShowcase 
              onBookSpecial={handleBookWithSpecialNotes} 
              selectedServiceId={showcaseServiceId}
              onSelectedServiceIdChange={setShowcaseServiceId}
              activeTab={showcaseTab}
              onActiveTabChange={setShowcaseTab}
            />

             {/* Separator / Micro Indicator */}
            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-dashed border-brand-850"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-brand-950 px-4 text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest">
                  Custom Estimate Calculator
                </span>
              </div>
            </div>

            {/* Dynamic Custom package builder */}
            <div className="space-y-8 animate-none">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="text-lg font-bold font-display text-brand-700">Modular Package Multi-Mix Estimator</h3>
                <p className="text-xs text-slate-400 font-sans">Toggle multiple core services and adjust organization scale multiplier to see dynamic hybrid vs upfront estimates.</p>
              </div>
              <PricingCalculator onBookWithServices={handleBookWithMultipleServices} />
            </div>

          </div>
        </section>

        {/* DETAILS ABOUT US */}
        <AboutUs />

        {/* INTERACTIVE COMPREHENSIVE FAQs */}
        <section className="py-24 border-t border-brand-800 bg-brand-950 relative">
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-emerald-50/10 blur-[100px] pointer-events-none" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
            
            <div className="text-center space-y-2 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">FAQS</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-brand-700">Frequently Audited Questions</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-sans">Get direct clarity regarding contractual obligations, regional alignment, and timelines support.</p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className="rounded-xl border border-brand-800 bg-white overflow-hidden hover:border-emerald-500 transition-all font-sans"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-brand-700 hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      <span className="font-semibold">{item.q}</span>
                      <ChevronDown className={`h-4.5 w-4.5 text-slate-405 shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-brand-850 bg-slate-50/50 font-sans">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ACTIVE CONTACT VIEW */}
        <ContactForm />

      </main>
      )}

      {/* CORPORATE FOOTER */}
      <Footer onNavigate={handleNavigate} onTermsClick={() => { setIsTermsPage(true); trackPageView('/terms'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />

      {/* BOOKING SYSTEM MODAL BOX */}
      <AnimatePresence>
        {isBookModalOpen && (
          <ConsultationModal 
            isOpen={isBookModalOpen} 
            onClose={() => setIsBookModalOpen(false)}
            preselectedServiceId={preselectedServiceId}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
