/**
 * Type declarations for ProMetrics Canada
 */

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Dynamic mapping for Lucide icons
  features: string[];
  targetSectors: ('Small Business' | 'Medium Business' | 'Enterprise')[];
  basePriceOneTime: number;
  basePriceSetup: number;
  basePriceMonthly: number;
  metricLabel: string;
  metricValue: string;
}

export type CompanySize = 'smb' | 'mid' | 'enterprise';
export type PaymentOption = 'one_time' | 'hybrid';

export interface ConsultationRequest {
  id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  companySize: CompanySize;
  selectedServices: string[];
  preferredDate: string;
  preferredTime: string;
  pricingPreference: PaymentOption | 'undecided';
  additionalNotes?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  location: string; // e.g., "Toronto, ON" or "Vancouver, BC"
  text: string;
  rating: number;
}
