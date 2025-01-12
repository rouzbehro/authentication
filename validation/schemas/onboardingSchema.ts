import { z } from 'zod';

// Step 1: Title selection
export const Step1Schema = z.object({
  title: z.enum(['Appraiser', 'Real Estate Agent', 'Real Estate Investor', 'Landlord', 'Other'], {
    required_error: 'Please select your title.',
  }),
});

// Step 2: Interests selection
export const INTERESTS_OPTIONS = [
  'Rental and Desktop Reports',
  'Investment Analysis',
  'Pre-construction Homes',
  'Neighborhood Analytics',
  'Cash Flow Analysis',
  'Property Appraisals',
  'Market Trends Performance',
  'Comparable Market Analysis',
  'Mortgage Rates',
] as const;

export const Step2Schema = z.object({
  interests: z.array(z.enum([...INTERESTS_OPTIONS])).nonempty('Please select at least one interest.'),
});

// Step 3: Account Type selection
export const Step3Schema = z.object({
  accountType: z.enum(['Individual', 'Team'], {
    required_error: 'Please select your account type.',
  }),
});

// Step 4: Company Information
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

export const Step4Schema = z.object({
  province: z.enum(PROVINCE_OPTIONS, {
    required_error: 'Please select a province.',
  }),
  companyName: z.string().min(1, 'Company name is required.').max(100, 'Company name must be under 100 characters.'),
  companyAddress: z.string().min(1, 'Company address is required.').max(200, 'Company address must be under 200 characters.'),
  companyEmail: z.string().email('Invalid email format.').min(1, 'Company email is required.'),
  companyPhone: z
    .string()
    .regex(/^\+?[0-9\s-]+$/, 'Invalid phone number format.')
    .min(1, 'Company phone is required.'),
  companyLogo: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'File size must be less than 5MB.' })
    .optional(),
});

// Combined schema for all steps
export const OnboardingSchema = z.object({
  title: Step1Schema.shape.title,
  interests: Step2Schema.shape.interests,
  accountType: Step3Schema.shape.accountType,
  province: Step4Schema.shape.province,
  companyName: Step4Schema.shape.companyName,
  companyAddress: Step4Schema.shape.companyAddress,
  companyEmail: Step4Schema.shape.companyEmail,
  companyPhone: Step4Schema.shape.companyPhone,
  companyLogo: Step4Schema.shape.companyLogo.optional(),
});

// Type for form data inferred from combined schema
export type OnboardingFormData = z.infer<typeof OnboardingSchema>;
