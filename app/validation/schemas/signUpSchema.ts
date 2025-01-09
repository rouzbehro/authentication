import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address.'),
  firstName: z.string().min(1, 'First name is required.').max(50, 'First name is too long.'),
  lastName: z.string().min(1, 'Last name is required.').max(50, 'Last name is too long.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(128, 'Password is too long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one digit.')
    .regex(/[\W_]/, 'Password must contain at least one special character.'),
});

export const otpSchema = z.object({
  otp: z.string().min(6, { message: 'Please enter the 6 digit code sent to your email.' }),
});
