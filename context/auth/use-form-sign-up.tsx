'use client';

import { otpSchema, signUpSchema } from '@/app/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useFormStep } from '@/context/shared/use-form-steps-context';
import { z } from 'zod';

// Define types for SignUpForm data and OTP data
type SignUpFormData = z.infer<typeof signUpSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

interface UseFormSignUpReturn {
  formMethods: UseFormReturn<SignUpFormData | OtpFormData>;
  onSubmit: (data: SignUpFormData | OtpFormData) => Promise<void>;
  handleBack: () => void;
}

export const useFormSignUp = (): UseFormSignUpReturn => {
  const router = useRouter();
  const { toast } = useToast();
  const { step, setStep } = useFormStep();
  const { signUp, isLoaded, setActive } = useSignUp();

  // Dynamic schema based on the current step
  const formMethods = useForm<SignUpFormData | OtpFormData>({
    resolver: zodResolver(step === 1 ? signUpSchema : otpSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      otp: '',
    },
  });

  const onSubmit = async (data: SignUpFormData | OtpFormData) => {
    if (!isLoaded) return;

    try {
      if (step === 1) {
        const signUpData = data as SignUpFormData; // Explicitly cast for step 1
        await signUp.create({
          emailAddress: signUpData.email,
          password: signUpData.password,
        });

        // Prepare for OTP verification
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });

        setStep(2); // Move to OTP step
      } else if (step === 2) {
        const otpData = data as OtpFormData; // Explicitly cast for step 2
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
          code: otpData.otp,
        });

        if (signUpAttempt.status === 'complete') {
          await setActive({ session: signUpAttempt.createdSessionId });
          router.push('/'); // Redirect to home or dashboard
        } else {
          // Show toast message and reset to step 1
          toast({
            variant: 'destructive',
            title: 'Verification Failed',
            description: 'Something went wrong. Please try a different email address.',
          });

          // Reset to the first step
          setStep(1);
        }
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
