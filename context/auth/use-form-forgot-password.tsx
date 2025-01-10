'use client';

import { forgotPasswordSchema, otpSchema } from '@/app/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { useFormStep } from '../shared/use-form-steps-context';

// Define types for SigninForm data
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordFormData = z.infer<typeof otpSchema>;

interface useFormForgotPasswordReturn {
  formMethods: UseFormReturn<ForgotPasswordFormData | ResetPasswordFormData>;
  onSubmit: (data: ForgotPasswordFormData | ResetPasswordFormData) => Promise<void>;
  handleBack: () => void;
}

export const useFormForgotPassword = (): useFormForgotPasswordReturn => {
  const router = useRouter();
  const { toast } = useToast();
  const { step, setStep } = useFormStep();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push('/');
  }

  // Dynamic schema based on the current step
  const formMethods = useForm<ForgotPasswordFormData | ResetPasswordFormData>({
    resolver: zodResolver(step === 1 ? forgotPasswordSchema : otpSchema),
    defaultValues: {
      email: '',
      otp: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData | ResetPasswordFormData) => {
    if (!isLoaded) return;
    try {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return {
    formMethods,
    onSubmit,
    handleBack,
  };
};
