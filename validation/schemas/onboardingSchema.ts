import { z } from 'zod';

// Step 1: Title selection
export const step1Schema = z.object({
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

export const step2Schema = z.object({
  interests: z.array(z.enum([...INTERESTS_OPTIONS])).nonempty('Please select at least one interest.'),
});

// Step 3: Account Type selection
export const step3Schema = z.object({
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

export const step4Schema = z.object({
  province: z
    .enum(PROVINCE_OPTIONS, {
      required_error: 'Please select a province.',
    })
    .refine((value) => PROVINCE_OPTIONS.includes(value), {
      message: 'Please select a valid province.',
    }),
  companyName: z.string().max(100, 'Company name must be under 100 characters.').optional(),
  companyAddress: z.string().max(200, 'Company address must be under 200 characters.').optional(),
  companyEmail: z.preprocess((value) => (value === '' ? undefined : value), z.string().email('Invalid email format').optional()),
  companyPhone: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z
      .string()
      .regex(/^\+?[0-9\s-]+$/, 'Invalid phone number format')
      .optional()
  ),
  companyLogo: z
    .any()
    .refine((file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024), {
      message: 'File size must be less than 5MB.',
    })
    .optional(),
});

// Combined schema for all steps
export const onboardingSchema = z.object({
  title: step1Schema.shape.title,
  interests: step2Schema.shape.interests,
  accountType: step3Schema.shape.accountType,
  province: step4Schema.shape.province,
  companyName: step4Schema.shape.companyName,
  companyAddress: step4Schema.shape.companyAddress,
  companyEmail: step4Schema.shape.companyEmail,
  companyPhone: step4Schema.shape.companyPhone,
  companyLogo: step4Schema.shape.companyLogo.optional(),
});

// Type for form data inferred from combined schema
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
