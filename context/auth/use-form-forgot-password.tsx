'use client';

import { forgotPasswordSchema, resetPasswordSchema } from '@/app/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { useFormStep } from '../shared/use-form-steps-context';

// Define types for SigninForm data
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

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

  // If the user is already signed in, redirect them to the home page
  if (isSignedIn) {
    router.push('/');
  }

  // Dynamic schema based on the current step
  const formMethods = useForm<ForgotPasswordFormData | ResetPasswordFormData>({
    resolver: zodResolver(step === 1 ? forgotPasswordSchema : resetPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData | ResetPasswordFormData) => {
    if (!isLoaded) return;
    try {
      if (step === 1) {
        const forgotPasswordData = data as ForgotPasswordFormData;
        await signIn
          ?.create({
            strategy: 'reset_password_email_code',
            identifier: forgotPasswordData.email,
          })
          .then((_) => {
            setStep(2);
          })
          .catch((err) => {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: err.errors[0].longMessage,
            });
          });
      } else if (step === 2) {
        const resetPasswordData = data as ResetPasswordFormData;
        await signIn
          ?.attemptFirstFactor({
            strategy: 'reset_password_email_code',
            code: resetPasswordData.code,
            password: resetPasswordData.password,
          })
          .then((result) => {
            if (result.status === 'complete') {
              setActive({ session: result.createdSessionId });
            } else {
              toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong!',
              });
            }
          })
          .catch((err) => {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: err.errors[0].longMessage,
            });
          });
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
