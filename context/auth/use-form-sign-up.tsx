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

export const useFormSignUp = (): UseFormSignUpReturn => {
  const router = useRouter();
  const { toast } = useToast();
  const { step, setStep } = useFormStep();
  const { signUp, isLoaded, setActive } = useSignUp();

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
      await signUp?.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setStep(2);
    } catch (err: unknown) {
      handleError(err, toast);
    }
  };

  const handleOtpVerification = async (data: OtpFormData) => {
    try {
      const signUpAttempt = await signUp?.attemptEmailAddressVerification({
        code: data.otp,
      });

      if (signUpAttempt?.status === 'complete') {
        await setActive?.({ session: signUpAttempt.createdSessionId });
        router.push('/'); // Redirect to home or dashboard
      } else {
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: 'Something went wrong. Please try a different email address.',
        });

        setStep(1);
      }
    } catch (err: unknown) {
      handleError(err, toast, () => setStep(1));
    }
  };

  const onSubmit = async (data: SignUpFormData | OtpFormData) => {
    if (!isLoaded) return;

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
