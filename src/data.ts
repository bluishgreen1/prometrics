import { Service, Testimonial } from './types';

export const BUSINESS_INFO = {
  name: 'ProMetrics',
  phone: '+1 (437) 435-2669',
  phoneRaw: '+14374352669',
  email: 'info@prometrics.ca',
  location: '30 Charles St E, Toronto ON, M4Y 1T1, Canada',
  operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM EST (24/7 Critical Support)',
  shortTagline: 'Engineered Growth for Canadian Businesses.',
  longTagline: 'We build high-performance web presences, launch algorithmic growth systems, and scale operations with 24/7 customer workflows for small, mid, and enterprise enterprises across Canada.',
};

export const SERVICES: Service[] = [
  {
    id: 'web-presence',
    title: 'Web Presence',
    shortDescription: 'Modern, blazing-fast web platforms engineered for peak conversion, mobile-first design, and exceptional search optimization.',
    fullDescription: 'Custom React Web Applications engineered for speed, mobile viewports, and regional business growth. No generic page-builders—complete semantic SEO integration and responsive design with high-fidelity branding.',
    iconName: 'Globe',
    features: [
      'Custom design, mobile-first architecture',
      'Advanced regional on-page SEO integration',
      'Contact Form + interactive Google Maps systems',
      'High-performance static hosting setup',
      'Responsive view-scaling across all screens',
    ],
    targetSectors: ['Small Business', 'Medium Business', 'Enterprise'],
    basePriceOneTime: 1200,
    basePriceSetup: 600,
    basePriceMonthly: 0,
    metricLabel: 'Page Auditing Score Baseline',
    metricValue: '99/100',
  },
  {
    id: 'growth-engine',
    title: 'Growth Engine',
    shortDescription: 'Algorithmic multi-channel systems designed to automate outreach and funnel qualified buy-ready leads directly to you.',
    fullDescription: 'Outbound and inbound campaigns utilizing optimized landing pages, active client message builders, and structured pipeline management to turn cold prospects into warm consultation bookings.',
    iconName: 'TrendingUp',
    features: [
      'Multi-channel outreach: Email + social channels',
      'Warmed, premium outbound domain infrastructure',
      'Advanced personalizations & segmented follow-up blocks',
      'Automatic CRMs synchronization & pipeline telemetry',
      'Regular analysis & strategic optimization reviews',
    ],
    targetSectors: ['Small Business', 'Medium Business', 'Enterprise'],
    basePriceOneTime: 1200,
    basePriceSetup: 599,
    basePriceMonthly: 0,
    metricLabel: 'Average Pipeline Jump Rate',
    metricValue: '3.6x',
  },
  {
    id: 'customer-support',
    title: '24/7 Receptionist & Support',
    shortDescription: 'Round-the-clock professional live-chat, ticketing desk, and interactive digital calling modules for flawless coverage.',
    fullDescription: 'Never drop an online ticket or a telephone call again. Customer-care experts alongside conversational scheduling solutions handle bookings, rescheduling, standard FAQs, and owner escalations 24/7/365.',
    iconName: 'Headphones',
    features: [
      'Complete coverage: 24/7/365 multi-location triage',
      'Omnichannel: Web Chat + Email + Automated AI systems',
      'Interactive appointment reservation, changes, & cancellations',
      'Instant SMS text-back options for missed calls',
      'Direct, real-time CRM updates & owner notification alerts',
    ],
    targetSectors: ['Small Business', 'Medium Business', 'Enterprise'],
    basePriceOneTime: 299,
    basePriceSetup: 199,
    basePriceMonthly: 0,
    metricLabel: 'Missed Calls Recaptured',
    metricValue: '100%',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    shortDescription: 'High-ROI local map SEO, keyword optimization, and targeted Google & Meta ad administration driving immediate growth.',
    fullDescription: 'Maximize market presence through high-octane local SEO strategies, Maps optimizations, and paid search campaigns designed for maximum conversions.',
    iconName: 'Megaphone',
    features: [
      'Full SEO (On-page + Off-page authority building)',
      'Localized Google Business Profile supremacy optimizations',
      'Google Ads & Meta campaign design and copywriting',
      'High-converting landing layout variants & tracking',
      'Regular strategy briefs and performance attribution matrices',
    ],
    targetSectors: ['Small Business', 'Medium Business', 'Enterprise'],
    basePriceOneTime: 899,
    basePriceSetup: 499,
    basePriceMonthly: 0,
    metricLabel: 'Local Authority Uplift',
    metricValue: '+240%',
  }
];

// Rich, comprehensive, complete details for pricing tiers, options, and bundle calculations
export interface PricingTierDetails {
  name: string;
  price: string;
  subtitle?: string;
  marketText?: string;
  highlighted?: boolean;
  features: string[];
}

export interface HybridTierDetails {
  name: string;
  setupFee: string;
  monthlyFee: string;
  year1Total: string;
  features?: string[];
}

export interface DetailedPricingService {
  id: string;
  title: string;
  marketHeader: string;
  option1Title: string;
  option1Tiers: PricingTierDetails[];
  option2Title: string;
  option2Tiers: HybridTierDetails[];
  hybridNotes: string;
}

export const DETAILED_PRICING_SERVICES: DetailedPricingService[] = [
  {
    id: 'web-presence',
    title: 'Web Presence',
    marketHeader: 'Market Rate: starts from $2,500',
    option1Title: 'Option 1 — One-Time Fee',
    option1Tiers: [
      {
        name: 'Small',
        price: 'from $1,200',
        subtitle: 'one-time',
        marketText: 'Cost Optimization Strategy',
        features: [
          'Custom layout & fast turnaround',
          'Custom design, mobile-first',
          'Basic on-page SEO targeting',
          'Contact form + Google Maps positioning',
          'Adaptive revision cycles',
          'Premium hosting setup included'
        ]
      },
      {
        name: 'Medium',
        price: 'from $3,500',
        subtitle: 'one-time',
        marketText: 'High Fidelity Branding',
        highlighted: true,
        features: [
          'Standard multi-page layout & fast turnaround',
          'Advanced design + sleek animations',
          'Full on-page SEO optimization package',
          'Blog engine + booking integrations',
          'Iterative revision rounds',
          'Premium hosting setup & ongoing delivery'
        ]
      },
      {
        name: 'Enterprise',
        price: 'from $9,500',
        subtitle: 'one-time',
        marketText: 'Maximum Enterprise Scale',
        features: [
          'Enterprise-grade custom layout structure',
          'Custom development + backend integrations',
          'CRM + secure payment integrations',
          'Advanced analytics telemetry dashboard',
          'Comprehensive revision coverage',
          'Dedicated premium cloud hosting & priority support'
        ]
      }
    ],
    option2Title: 'Option 2 — Hybrid Model (Setup Fee + Monthly)',
    option2Tiers: [
      {
        name: 'Small',
        setupFee: 'from $600 setup',
        monthlyFee: 'monthly',
        year1Total: 'Custom Quote'
      },
      {
        name: 'Medium',
        setupFee: 'from $1,800 setup',
        monthlyFee: 'monthly',
        year1Total: 'Custom Quote'
      },
      {
        name: 'Enterprise',
        setupFee: 'from $4,500 setup',
        monthlyFee: 'monthly',
        year1Total: 'Custom Quote'
      }
    ],
    hybridNotes: 'Hybrid option includes: production hosting setup, continuous content changes, priority system support, and routine SEO performance healthchecks.'
  },
  {
    id: 'growth-engine',
    title: 'Growth Engine',
    marketHeader: 'Market Rate: starts from $2,000 / month',
    option1Title: 'Option 1 — Monthly Flat Retainer',
    option1Tiers: [
      {
        name: 'Small',
        price: 'from $1,200',
        subtitle: 'per month',
        marketText: 'Targeted High-Intent Outreach',
        features: [
          'Targeted quality leads outreach',
          'Email outbound campaigns',
          'Basic personalization triggers',
          'Automated sequence follow-up',
          'Insight performance reports',
          'Custom geographic targeting parameters'
        ]
      },
      {
        name: 'Medium',
        price: 'from $2,500',
        subtitle: 'per month',
        marketText: 'Multi-Channel Pipeline Engine',
        highlighted: true,
        features: [
          'Expanded quality lead outreach campaigns',
          'Email + social resonance messaging',
          'Advanced personalized data-enrichment parameters',
          'Comprehensive outreach sequences & follow-ups',
          'Regular analysis & strategic optimization reviews',
          'Cross-geographic targeting strategies'
        ]
      },
      {
        name: 'Enterprise',
        price: 'from $5,000',
        subtitle: 'per month',
        marketText: 'Maximum Market Dominion',
        features: [
          'High-intensity active leads campaigns',
          'All channels activation & social campaign integration',
          'Custom premium copywriting setups',
          'Strategic follow-up sequences',
          'Dedicated CRM and campaign lead agent assigned',
          'Weekly consulting and optimization briefs'
        ]
      }
    ],
    option2Title: 'Option 2 — Hybrid Model (Base Retainer + Per Qualified Lead)',
    option2Tiers: [
      {
        name: 'Small',
        setupFee: 'from $599/mo',
        monthlyFee: 'per lead',
        year1Total: 'Custom Quote'
      },
      {
        name: 'Medium',
        setupFee: 'from $999/mo',
        monthlyFee: 'per lead',
        year1Total: 'Custom Quote'
      },
      {
        name: 'Enterprise',
        setupFee: 'from $1,999/mo',
        monthlyFee: 'per lead',
        year1Total: 'Custom Quote'
      }
    ],
    hybridNotes: 'Hybrid outreach features low base monthly operating components + performance success fees on qualified leads.'
  },
  {
    id: 'customer-support',
    title: '24/7 Receptionist & Customer Support',
    marketHeader: 'Market Rate: starts from $300 / month',
    option1Title: 'Option 1 — Monthly Flat Fee (All-In)',
    option1Tiers: [
      {
        name: 'Small',
        price: 'from $299',
        subtitle: 'per month',
        marketText: 'Essential Omnichannel Coverage',
        features: [
          'Inbound interaction logging',
          'Active live web-chat + email triage',
          'Appointment and scheduling support',
          'FAQ answering & business hours routing',
          'Urgent notification escalation to owner',
          'Bilingual workflow configurations'
        ]
      },
      {
        name: 'Medium',
        price: 'from $599',
        subtitle: 'per month',
        marketText: 'Smarter Autonomous Receptionist',
        highlighted: true,
        features: [
          'High-frequency logging coverage',
          'Web Chat + Email + conversational AI voice receptionist',
          'Calendar booking, rescheduling, and cancellations',
          'Custom scripts based on business rules',
          'Automated real-time CRM updates',
          'Priority direct escalation & summaries'
        ]
      },
      {
        name: 'Enterprise',
        price: 'from $1,299',
        subtitle: 'per month',
        marketText: 'Complete Corporate SLA Support',
        features: [
          'Full-coverage support desk workflows',
          'All channels operating 24/7/365',
          'Multi-location support desk coordination',
          'Dedicated customized voice + chat brand persona',
          'Complete custom CRM + calendar integrations',
          'Regular log audits & performance reports'
        ]
      }
    ],
    option2Title: 'Option 2 — Hybrid Model (Setup Fee + Lower Monthly)',
    option2Tiers: [
      {
        name: 'Small',
        setupFee: 'from $199 setup',
        monthlyFee: 'monthly',
        year1Total: 'Custom Quote'
      },
      {
        name: 'Medium',
        setupFee: 'from $349 setup',
        monthlyFee: 'monthly',
        year1Total: 'Custom Quote'
      },
      {
        name: 'Enterprise',
        setupFee: 'from $699 setup',
        monthlyFee: 'monthly',
        year1Total: 'Custom Quote'
      }
    ],
    hybridNotes: 'Hybrid support systems include initial configuration setup, voice reception training, and custom automatic pipelines within the setup fee.'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    marketHeader: 'Market Rate: starts from $1,000 / month',
    option1Title: 'Option 1 — Monthly Flat Retainer',
    option1Tiers: [
      {
        name: 'Small',
        price: 'from $899',
        subtitle: 'per month',
        marketText: 'Targeted Local Brand Boost',
        features: [
          'Performance channel marketing support',
          'Local business SEO optimization',
          'Google Business Profile supremacy',
          'Creative social feed outreach',
          'Targeted keyword rank tracking',
          'Performance attribution briefs'
        ]
      },
      {
        name: 'Medium',
        price: 'from $1,999',
        subtitle: 'per month',
        marketText: 'Cross-Channel Traffic Driver',
        highlighted: true,
        features: [
          'Multi-channel design (Google, Meta, Maps, SEO)',
          'Full technical SEO (on-page + link authority)',
          'High-converting Google Search + Facebook/Insta ads',
          'Dynamic posts and stories production',
          'Ad allocation management parameters',
          'Regular strategy briefs'
        ]
      },
      {
        name: 'Enterprise',
        price: 'from $3,999',
        subtitle: 'per month',
        marketText: 'High Velocity Omnichannel Scaling',
        features: [
          'Comprehensive growth channels activation',
          'Advanced technical SEO & content production',
          'Complete cross-channel ad configuration & testing',
          'Daily social feed posting & active engagement',
          'High-performance ad setup & management',
          'Weekly strategy calls + monthly audit ledger'
        ]
      }
    ],
    option2Title: 'Option 2 — Hybrid Model (Base Retainer + % of Ad Spend Managed)',
    option2Tiers: [
      {
        name: 'Small',
        setupFee: 'from $499/mo',
        monthlyFee: '% of ad spend',
        year1Total: 'Custom Quote'
      },
      {
        name: 'Medium',
        setupFee: 'from $899/mo',
        monthlyFee: '% of ad spend',
        year1Total: 'Custom Quote'
      },
      {
        name: 'Enterprise',
        setupFee: 'from $1,499/mo',
        monthlyFee: '% of ad spend',
        year1Total: 'Custom Quote'
      }
    ],
    hybridNotes: "Ad spend budgets are administered directly inside client dashboard console tools. Orion's fee covers management only."
  }
];

export interface BundleDealDetails {
  id: string;
  name: string;
  badge?: string;
  servicesIncluded: string;
  tierSummary: string;
  regularPrice: string;
  dealPrice: string;
  saveText: string;
  features: string[];
}

export const BUNDLE_DEALS: BundleDealDetails[] = [
  {
    id: 'starter-pack',
    name: 'Starter pack',
    badge: 'Launch Fast',
    servicesIncluded: 'Web Presence + Growth Engine',
    tierSummary: 'Small tier scale setup',
    regularPrice: 'Custom Quote',
    dealPrice: 'Custom Quote',
    saveText: 'Custom Discount',
    features: [
      'Web Presence: custom design, mobile-first, and SEO setup',
      'Growth Engine outreach: email outreach campaigns planning',
      'Primary on-page rank optimization strategy'
    ]
  },
  {
    id: 'visibility-pack',
    name: 'Visibility pack',
    badge: 'Establish Presence',
    servicesIncluded: 'Web Presence + Digital Marketing',
    tierSummary: 'Small tier scale setup',
    regularPrice: 'Custom Quote',
    dealPrice: 'Custom Quote',
    saveText: 'Custom Discount',
    features: [
      'Web Presence: mobile layout, Google Maps, and contact configurations',
      'Digital Marketing: Google SEO authority plus social posts templates',
      'Continuous performance management baseline'
    ]
  },
  {
    id: 'most-popular-bundle',
    name: 'Most popular',
    badge: 'Best Value Deal',
    servicesIncluded: 'Full presence — Web Presence + Growth Engine + Receptionist',
    tierSummary: 'Medium tier scale setup',
    regularPrice: 'Custom Quote',
    dealPrice: 'Custom Quote',
    saveText: 'Custom Discount',
    features: [
      'Web Presence: responsive layout, customizable animations, full SEO package',
      'Growth Engine: active multi-channel outreach, email plus social resonance sequences',
      'Receptionist Support: conversation flow, web-chat desk, voice automation'
    ]
  },
  {
    id: 'growth-machine',
    name: 'Growth machine',
    badge: 'Pipeline Engine',
    servicesIncluded: 'Growth Engine + Receptionist + Digital Marketing',
    tierSummary: 'Medium tier scale setup',
    regularPrice: 'Custom Quote',
    dealPrice: 'Custom Quote',
    saveText: 'Custom Discount',
    features: [
      'Growth Engine: advanced outbound outreach email and social profiles tracking',
      'Receptionist Support: operational customer logging and calendar system onboarding',
      'Digital Marketing: technical SEO audits and Google/Meta ad layouts'
    ]
  },
  {
    id: 'enterprise-suite',
    name: 'Enterprise suite',
    badge: 'Complete Corporate System',
    servicesIncluded: 'All 4 services — Enterprise tier scale setup',
    tierSummary: 'Comprehensive Enterprise operations suite',
    regularPrice: 'Custom Quote',
    dealPrice: 'Custom Quote',
    saveText: 'Custom Discount',
    features: [
      'Custom Web Presence, full CRM integrations, and billing modules',
      'Outreach campaigns across premium channels and selected market niches',
      'Sovereign support coverage, customized voice training, and dedicated coordination'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Jean-Sebastien Roy',
    role: 'Operations Director',
    company: 'Apex Supply Co.',
    location: 'Montreal, QC',
    text: 'ProMetrics transformed our customer response system. Their 24/7 support setup reduced ticket wait times from hours to under 20 seconds. Being in Quebec, they seamlessly integrated bilingual options which was essential for our expansion.',
    rating: 5,
  },
  {
    id: 't2',
    author: 'Sarah Jenkins',
    role: 'Founder & CEO',
    company: 'Maple Leaf Retail Tech',
    location: 'Toronto, ON',
    text: 'The Web Presence and Growth Engine combined has completely revolutionized our pipeline. We received over 85 qualified consultation requests in our first month after launch. ProMetrics is absolute class.',
    rating: 5,
  },
  {
    id: 't3',
    author: 'David Vance',
    role: 'Managing Partner',
    company: 'West Coast Logistics',
    location: 'Vancouver, BC',
    text: 'As a mid-market enterprise, we needed reliable call capturing. The Smart Receptionist configuration paid for itself in key contract bookings within the first week alone. The hybrid pricing model was perfectly tailored for our cash flow.',
    rating: 5,
  }
];

export const FAQ_ITEMS = [
  {
    q: 'How does the Hybrid pricing model compare to the One-Time Fee?',
    a: 'Our One-Time Fee covers full design, development, and system rollout with a single capital expense, handing over complete ownership immediately. The Hybrid option lowers upfront costs significantly by introducing a balanced setup fee followed by a predictable monthly subscription, which covers continuous updates, active support, hosting oversight, and ongoing parameter tuning.'
  },
  {
    q: 'Are your services customized for Canadian business regulations?',
    a: 'Absolutely. We are headquartered in Canada. We configure web presences to be fully CASL (Canada\'s Anti-Spam Legislation) compliant, ensure GDPR/PIPEDA privacy protocol alignment, and design bilingual workflows (English/French) for maximum provincial reach.'
  },
  {
    q: 'Can services be scaled up or down as we grow?',
    a: 'Yes. Features are built modularly. You can start with a basic Web Presence and gradually incorporate the Growth Engine, Smart Receptionist, or 24/7 Customer Support. Your subscription tier is customizable on the fly inside the Hybrid payment path.'
  },
  {
    q: 'What is the turnaround time for a custom Web Presence build?',
    a: 'For small and mid-sized businesses, ready-for-launch deployment is generally achieved within 3 to 4 weeks. Enterprise structures requiring customized client database architectures range from 6 to 8 weeks, including complete sandboxed user-acceptance testing before deployment.'
  }
];
