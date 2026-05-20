import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface NavbarProps {
  onBookClick: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onBookClick, activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'What We Do' },
    { id: 'pricing', label: 'Investment & Pricing' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full border-b border-brand-800 bg-brand-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 font-display text-xl font-extrabold text-white shadow-md shadow-emerald-400/20">
              PM
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight text-brand-700">
              Pro<span className="text-emerald-600">Metrics</span>
            </span>
            <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-brand-900 px-2 py-0.5 rounded border border-brand-800 hidden sm:inline">
              Canada
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-sm font-medium transition-colors hover:text-emerald-600 cursor-pointer ${
                  activeSection === item.id ? 'text-emerald-600 font-semibold' : 'text-brand-700/70 hover:text-brand-700'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call to Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-medium text-brand-700/85 hover:text-emerald-600 transition-colors"
            >
              <Phone className="h-4 w-4 text-emerald-600" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={onBookClick}
              className="flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-800/10 hover:bg-slate-800 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4 text-emerald-200" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={onBookClick}
              className="p-2 rounded-full bg-brand-900 text-emerald-600 border border-brand-800 hover:bg-brand-800 transition"
              title="Book Free Consultation"
            >
              <Calendar className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-brand-700 hover:bg-brand-900 transition"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-brand-800 bg-brand-950 overflow-hidden"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full py-3 text-left text-base font-semibold border-b border-brand-900/60 transition-colors ${
                    activeSection === item.id ? 'text-emerald-600 pl-2 border-l-2 border-emerald-500 bg-emerald-50/50' : 'text-brand-700/80 hover:text-brand-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-brand-900 border border-brand-800 py-3 text-sm font-semibold text-brand-700 hover:bg-slate-200 transition-colors"
                >
                  <Phone className="h-4 w-4 text-emerald-600" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onBookClick();
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-brand-700 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-emerald-200" />
                  <span>Book Free Consultation</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
