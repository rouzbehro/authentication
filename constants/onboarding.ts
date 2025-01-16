export const TITLES = [
  {
    value: 'Appraiser',
    label: 'Appraiser',
    description: 'I evaluate properties and create rental or value reports.',
    icon: 'Clipboard',
  },
  {
    value: 'Real Estate Agent',
    label: 'Real Estate Agent',
    description: 'I help clients buy, sell, or rent properties.',
    icon: 'Home',
  },
  {
    value: 'Real Estate Investor',
    label: 'Real Estate Investor',
    description: 'I invest in properties to maximize my returns.',
    icon: 'TrendingUp',
  },
  {
    value: 'Landlord',
    label: 'Landlord',
    description: 'I own rental properties and manage tenants.',
    icon: 'Key',
  },
  {
    value: 'Other',
    label: 'Other',
    description: "I'm just exploring for now.",
    icon: 'User',
  },
] as const;

// Interest options
export const INTERESTS_OPTIONS = [
  'rental-reports',
  'investment-analysis',
  'pre-construction',
  'neighborhood-analytics',
  'cash-flow',
  'property-appraisals',
  'market-trends',
  'comparable-analysis',
  'mortgage-rates',
] as const;

// Account type options
export const ACCOUNT_TYPE_OPTIONS = ['INDIVIDUAL', 'TEAM'] as const;

// Province options
export const PROVINCE_OPTIONS = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Northwest Territories',
  'Nunavut',
  'Yukon',
] as const;

// How did you hear options
export const HOW_DID_YOU_HEAR_OPTIONS = ['Google', 'Social Media', 'Friend/Family', 'Advertisement', 'Other'] as const;

export const INTERESTS: { id: string; label: string; icon: string }[] = [
  { id: 'rental-reports', label: 'Rental and Desktop Reports', icon: 'FileText' },
  { id: 'investment-analysis', label: 'Investment Analysis', icon: 'BarChart2' },
  { id: 'pre-construction', label: 'Pre-construction Homes', icon: 'Home' },
  { id: 'neighborhood-analytics', label: 'Neighborhood Analytics', icon: 'MapPin' },
  { id: 'cash-flow', label: 'Cash Flow Analysis', icon: 'DollarSign' },
  { id: 'property-appraisals', label: 'Property Appraisals', icon: 'Calculator' },
  { id: 'market-trends', label: 'Market Trends Performance', icon: 'TrendingUp' },
  { id: 'comparable-analysis', label: 'Comparable Market Analysis', icon: 'Layers' },
  { id: 'mortgage-rates', label: 'Mortgage Rates', icon: 'Percent' },
] as const;

export const ACCOUNT_OPTIONS = [
  {
    value: 'INDIVIDUAL',
    label: 'Individual Account',
    description: 'Perfect for independent appraisers, real estate agents, and investors managing their own workflow.',
    icon: 'User',
    features: ['Access to all main features.', 'Manage reports and data independently.', 'Personalized tools for your needs.'],
  },
  {
    value: 'TEAM',
    label: 'Team Account',
    description: 'Ideal for teams of 5 or more, looking for collaborative tools, centralized billing, and performance tracking.',
    icon: 'Users',
    features: ['Multi-member access under one account.', 'Centralized management and billing.', 'Up to 30% volume discount.'],
  },
] as const;
