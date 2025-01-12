'use client';

import { otpSchema, signUpSchema } from '@/app/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useFormStep } from '@/context/use-form-steps-context';
import { z } from 'zod';
import { createUserWithDetails } from '@/actions/user';
import { useState } from 'react';

// Define types for SignUpForm data and OTP data
type SignUpFormData = z.infer<typeof signUpSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

interface UseFormSignUpReturn {
  formMethods: UseFormReturn<SignUpFormData | OtpFormData>;
  onSubmit: (data: SignUpFormData | OtpFormData) => Promise<void>;
  handleBack: () => void;
}

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

  if (goBack) {
    goBack();
  }
};

export const useFormSignUp = (): UseFormSignUpReturn => {
  const router = useRouter();
  const { toast } = useToast();
  const { step, setStep } = useFormStep();
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signUpData, setSignUpData] = useState<SignUpFormData | null>(null);
  const userPortalUrl = process.env.USER_PORTAL_URL || '/dashboard';

  const schema = step === 1 ? signUpSchema : otpSchema;
  const formMethods = useForm<SignUpFormData | OtpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      otp: '',
    },
  });

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      setIsSubmitting(true);
      await signUp?.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setSignUpData(data); // Store data from the first step
      setStep(2); // Go to OTP step
    } catch (err: unknown) {
      handleError(err, toast);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpVerification = async (data: OtpFormData) => {
    try {
      const signUpAttempt = await signUp?.attemptEmailAddressVerification({
        code: data.otp,
      });

      if (signUpAttempt?.status === 'complete' && signUpData) {
        const signedUpUser = await createUserWithDetails({
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          email: signUpData.email,
          clerkId: signUp?.createdUserId!,
        });

        if (signedUpUser?.status === 200 && signedUpUser.user) {
          await setActive?.({ session: signUpAttempt.createdSessionId });
          router.push(userPortalUrl);
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: 'Please try again with a different email address.',
        });
        setStep(1); // Go back to the first step
      }
    } catch (err: unknown) {
      handleError(err, toast, () => setStep(1)); // Go back to step 1 on error
    }
  };

  const onSubmit = async (data: SignUpFormData | OtpFormData) => {
    if (!isLoaded || isSubmitting) return;

    if (step === 1) {
      await handleSignUp(data as SignUpFormData);
    } else {
      await handleOtpVerification(data as OtpFormData);
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
