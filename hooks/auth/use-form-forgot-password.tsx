'use client';

import { forgotPasswordSchema, resetPasswordSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useSignIn } from '@clerk/nextjs';
import { useFormStep } from '@/context/use-form-steps-context';

// Define types for SigninForm data
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface useFormForgotPasswordReturn {
  formMethods: UseFormReturn<ForgotPasswordFormData | ResetPasswordFormData>;
  onSubmit: (data: ForgotPasswordFormData | ResetPasswordFormData) => Promise<void>;
  handleBack: () => void;
}

// Helper to show toast errors
const showToastError = (toast: any, message: string) => {
  toast({
    variant: 'destructive',
    title: 'Error',
    description: message,
  });
};

// Helper to handle errors
const handleError = (err: unknown, toast: any, goBack?: () => void) => {
  let errorMessage = 'An unknown error occurred';

  if (err instanceof Error) {
    errorMessage = err.message;
  } else if (typeof err === 'object' && err && 'errors' in err) {
    errorMessage = (err as any).errors?.[0]?.longMessage || errorMessage;
  }

  toast({
    variant: 'destructive',
    title: 'Error',
    description: errorMessage,
  });

  // Call the goBack function if an error occurs
  if (goBack) {
    goBack();
  }
};

export const useFormForgotPassword = (): useFormForgotPasswordReturn => {
  const { toast } = useToast();
  const { step, setStep } = useFormStep();
  const { isLoaded, signIn, setActive } = useSignIn();

  const schema = step === 1 ? forgotPasswordSchema : resetPasswordSchema;
  const formMethods = useForm<ForgotPasswordFormData | ResetPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', code: '' },
  });

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: data.email,
      });
      setStep(2);
    } catch (err: unknown) {
      handleError(err, toast);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: data.code,
        password: data.password,
      });

      if (result?.status === 'complete') {
        setActive?.({ session: result.createdSessionId });
      } else {
        showToastError(toast, 'Something went wrong!');
      }
    } catch (err: unknown) {
      handleError(err, toast, handleBack);
    }
  };
  const onSubmit = async (data: ForgotPasswordFormData | ResetPasswordFormData) => {
    if (!isLoaded) return;

    if (step === 1) {
      await handleForgotPassword(data as ForgotPasswordFormData);
    } else {
      await handleResetPassword(data as ResetPasswordFormData);
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
