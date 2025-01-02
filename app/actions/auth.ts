'use server';

import { z } from 'zod';

interface signUpProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const signUp = async ({ email, firstName, lastName, password }: signUpProps) => {
  const newUserSchema = z.object({
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

  const newUserValidation = newUserSchema.safeParse({
    email,
    firstName,
    lastName,
    password,
  });

  if (!newUserValidation.success) {
    return { error: true, message: newUserValidation.error.issues[0]?.message ?? 'Error' };
  }

  
};
