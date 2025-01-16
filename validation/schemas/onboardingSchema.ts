import {
  ACCOUNT_TYPE_OPTIONS,
  HOW_DID_YOU_HEAR_OPTIONS,
  INTERESTS_OPTIONS,
  PROVINCE_OPTIONS as PROVINCE_OPTIONS_RAW,
  TITLES,
} from '@/constants/onboarding';

import { z } from 'zod';

const TITLE_OPTIONS = TITLES.map((title) => title.value) as [string, ...string[]];
const PROVINCE_OPTIONS = PROVINCE_OPTIONS_RAW as [string, ...string[]];

// Step 1: Title selection
export const step1Schema = z.object({
  title: z.enum([...TITLE_OPTIONS], {
    required_error: 'Please select your title.',
  }),
});

// Step 2: Interests selection
export const step2Schema = z.object({
  interests: z.array(z.enum([...INTERESTS_OPTIONS])).nonempty('Please select at least one interest.'),
});

// Step 3: Account Type selection
export const step3Schema = z.object({
  accountType: z.enum([...ACCOUNT_TYPE_OPTIONS], {
    required_error: 'Please select your account type.',
  }),
});

// Step 4: Company Information
export const step4Schema = z.object({
  location: z
    .enum([...PROVINCE_OPTIONS], {
      required_error: 'Please select a location.',
    })
    .refine((value) => PROVINCE_OPTIONS.includes(value), {
      message: 'Please select a valid location.',
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
  howDidYouHear: z.enum(HOW_DID_YOU_HEAR_OPTIONS as [string, ...string[]], {
    required_error: 'Please select how you heard about us.',
  }),
});

// Combined schema for all steps
export const onboardingSchema = z.object({
  title: step1Schema.shape.title,
  interests: step2Schema.shape.interests,
  accountType: step3Schema.shape.accountType,
  location: step4Schema.shape.location,
  companyName: step4Schema.shape.companyName,
  companyAddress: step4Schema.shape.companyAddress,
  companyEmail: step4Schema.shape.companyEmail,
  companyPhone: step4Schema.shape.companyPhone,
  howDidYouHear: step4Schema.shape.howDidYouHear,
});

// Type for form data inferred from combined schema
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
