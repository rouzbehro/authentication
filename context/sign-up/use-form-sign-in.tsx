'use client';

import { otpSchema, signInSchema, signUpSchema } from '@/app/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Define types for SigninForm data
type SignInFormData = z.infer<typeof signInSchema>;

interface useFormSignInReturn {
  formMethods: UseFormReturn<SignInFormData>;
  onSubmit: (data: SignInFormData) => Promise<void>;
}

export const useFormSignIn = (): useFormSignInReturn => {
  const router = useRouter();
  const { toast } = useToast();
  const { signUp, isLoaded, setActive } = useSignUp();

  // Dynamic schema based on the current step
  const formMethods = useForm<SignInFormData>({
    resolver: zodResolver(step === 1 ? signUpSchema : otpSchema),
    defaultValues: {
      email: '',

      password: '',
    },
  });

  const onSubmit = async () => {
    if (!isLoaded) return;
  };

  return {
    formMethods,
    onSubmit,
  };
};
