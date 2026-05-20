import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Scale, FileText, CheckCircle, MapPin, Building2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  // Ensure we are scrolled to the top when the legal document opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    {
      id: "acceptance",
      icon: Scale,
      title: "1. Acceptance of Terms",
      content: `By accessing, registering for, or utilizing the modular architectural platforms, custom software, localized growth services, or customer retention pipelines ("Services") provided by ${BUSINESS_INFO.name} Canada Inc. ("Company," "we," "us," or "our"), you agree to be bound legally by these Terms of Service. If you are entering into this agreement on behalf of a Canadian small, medium, or enterprise company, you declare that you possess the full legal authority to bind that corporate entity to these terms.`
    },
    {
      id: "services-jurisdiction",
      icon: Building2,
      title: "2. Services & Canadian Jurisdiction",
      content: `These terms and any transaction or engagement between ProMetrics and our clients shall be governed by and interpreted strictly in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any legal dispute, claim, or arbitration initiated under these terms shall be brought exclusively in the provincial or federal courts located within the City of Toronto, Ontario.`
    },
    {
      id: "payment-sla",
      icon: FileText,
      title: "3. Modular Price Calculations, Payments & Refunds",
      content: `All prices specified across our modular estimation calculator are listed in Canadian Dollars (CAD) and are subject to applicable federal and provincial sales taxes (HST/GST), which will be registered, itemized, and charged in accordance with Canada Revenue Agency guidelines. Payments under Option 1 (One-Time Capital Fee) require a 50% deposit before engineering initialization, with the remaining balance due upon production handover. Hybrid plans (Option 2) will be processed as automatic repeating monthly subscription runs. In order to keep administrative overhead low, all recurring operations are non-refundable once a monthly cycle starts.`
    },
    {
      id: "ip-handover",
      icon: CheckCircle,
      title: "4. Intellectual Property & Code Handover rights",
      content: `Upon final billing settlement and complete handover of any custom website code, visual design assets, local SEO configurations, or digital assets built during our engagement, all proprietary code and delivery files are legally assigned to the Client. ProMetrics retains administrative non-exclusive rights to list visual prototypes and high-level case metrics within our Canadian portfolio, unless a signed Non-Disclosure Agreement (NDA) or custom Service Level Agreement (SLA) is specifically executed prior to deployment.`
    },
    {
      id: "casl-pipeda",
      icon: ShieldCheck,
      title: "5. CASL & PIPEDA Regulatory Compliance",
      content: `ProMetrics builds and deploys outbound marketing components and automatic support ticket routing systems that strictly follow Canadian Anti-Spam Legislation (CASL) and the Personal Information Protection and Electronic Documents Act (PIPEDA). The Client is solely responsible for ensuring that all physical lead databases, customer lists, or warm outbound campaigns loaded into or integrated with our Systems conform to clear double opt-in requirements and privacy policy structures.`
    },
    {
      id: "liability",
      icon: ShieldCheck,
      title: "6. Limitation of Liability & Warranty",
      content: `Our web development and algorithmic systems are provided "as-is" and "as-available" without warranties of any kind, whether express or implied. In no event shall ${BUSINESS_INFO.name} Canada Inc., its directors, employees, or Canadian regional agents be liable for any indirect, incidental, special, exemplary, or consequential losses, including but not limited to lost profit margins, downtime, or CRM lead synchronization failures, exceeding the total amount paid by the client in the 3 months immediately preceding the event.`
    },
    {
      id: "modifications",
      icon: MapPin,
      title: "7. Modifications & Termination of Account",
      content: `We reserve the right to revise, update, or modify these terms at any time to reflect changing Canadian regulatory statutes. Your continued utilization of our performance portals or custom modular setups after any updates constitute binding acceptance. If an active client wishes to dissolve a subscription under our hybrid SLAs, they must provide at least 15 days written notices prior to the next billing interval.`
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="bg-white text-slate-900 pb-24"
    >
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 py-16 md:py-20 relative">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-505 hover:text-emerald-700 transition cursor-pointer mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Core Corporate Portal</span>
          </button>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-[11px] font-mono font-bold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Effective Date: May 20, 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-slate-900">
              Terms of Service
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans max-w-2xl leading-relaxed">
              Please review the following contractual terms guiding the development, deployment, SLAs, and usage of modular solutions provided across Canada by {BUSINESS_INFO.name} Canada Inc.
            </p>
          </div>
        </div>
      </div>

      {/* Main Document Body Layout */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Quick jump navigation table for large displays */}
          <div className="hidden lg:block space-y-4 sticky top-28 self-start">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2.5">Document Jump Links</h3>
            <nav className="flex flex-col gap-2.5 text-xs">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="text-slate-505 hover:text-emerald-700 font-medium transition italic"
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal content core cards */}
          <div className="lg:col-span-3 space-y-12">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div key={sec.id} id={sec.id} className="scroll-mt-28 space-y-3">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-md font-bold font-display text-slate-900 tracking-tight">
                      {sec.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 font-sans whitespace-pre-line">
                    {sec.content}
                  </p>
                </div>
              );
            })}

            {/* Canadian corporate declaration callout box */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 space-y-3 font-sans">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Legal Inquiries & Administration Hub
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you have queries regarding our Canadian hosting networks, federal CASL opt-in audits, or require a physical signed counterpart of our modular services SLA agreement, please reach out directly:
              </p>
              <div className="pt-2 text-xs text-slate-650 space-y-1 font-mono">
                <p><strong>Entity:</strong> {BUSINESS_INFO.name} Canada Inc. (Ontario Registered)</p>
                <p><strong>Corporate Head Office:</strong> {BUSINESS_INFO.location}</p>
                <p><strong>Administrative Email:</strong> <a href={`mailto:${BUSINESS_INFO.email}`} className="text-emerald-700 hover:underline">{BUSINESS_INFO.email}</a></p>
                <p><strong>Hotline:</strong> <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-emerald-700 hover:underline">{BUSINESS_INFO.phone}</a></p>
              </div>
            </div>

            {/* Back action */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 text-xs font-bold transition cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Home Portal</span>
              </button>
              <span className="text-[10px] text-slate-400 font-mono font-medium">DOCUMENT NO: PM-TS-2026-CA</span>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
