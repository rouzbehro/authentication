import { z } from 'zod';
import { TITLES, INTERESTS_OPTIONS, ACCOUNT_TYPE_OPTIONS, PROVINCE_OPTIONS, HOW_DID_YOU_HEAR_OPTIONS } from '@/constants/onboarding';

// Extracting pure value arrays for validation
const TITLE_OPTIONS = TITLES.map((t) => t.value) as [string, ...string[]];
const INTERESTS = [...INTERESTS_OPTIONS] as [string, ...string[]];
const ACCOUNT_TYPES = [...ACCOUNT_TYPE_OPTIONS] as [string, ...string[]];
const PROVINCES = [...PROVINCE_OPTIONS] as [string, ...string[]];
const HOW_DID_YOU_HEAR = [...HOW_DID_YOU_HEAR_OPTIONS] as [string, ...string[]];

// Helper functions for reusable validation patterns
const singleSelect = <T extends readonly [string, ...string[]]>(options: T, message: string) => z.enum(options, { required_error: message });

const nonEmptyArray = <T extends readonly [string, ...string[]]>(options: T, message: string) => z.array(z.enum(options)).nonempty(message);

// Step-specific schemas
export const step1Schema = z.object({
  title: singleSelect(TITLE_OPTIONS, 'Please select your title.'),
});

export const step2Schema = z.object({
  interests: nonEmptyArray(INTERESTS, 'Please select at least one interest.'),
});

export const step3Schema = z.object({
  accountType: singleSelect(ACCOUNT_TYPES, 'Please select your account type.').default('INDIVIDUAL'),
});

export const step4Schema = z.object({
  location: singleSelect(PROVINCES, 'Please select a location.'),
  companyName: z.string().max(100, 'Company name must be under 100 characters.').optional(),
  companyAddress: z.string().max(200, 'Company address must be under 200 characters.').optional(),
  companyEmail: z.string().email('Invalid email format').optional(),
  companyPhone: z
    .string()
    .regex(/^\+?[0-9\s-]+$/, 'Invalid phone number format')
    .optional(),
  howDidYouHear: singleSelect(HOW_DID_YOU_HEAR, 'Please select how you heard about us.'),
});

// Combined schema for all steps
export const onboardingSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);

// Type inference
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
