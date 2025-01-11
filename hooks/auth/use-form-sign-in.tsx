'use client';

import { signInSchema } from '@/app/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useSignIn } from '@clerk/nextjs';

// Define types for SigninForm data
type SignInFormData = z.infer<typeof signInSchema>;

interface useFormSignInReturn {
  formMethods: UseFormReturn<SignInFormData>;
  onSubmit: (data: SignInFormData) => Promise<void>;
}

export const useFormSignIn = (): useFormSignInReturn => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoaded, signIn, setActive } = useSignIn();
  const userPortalUrl = process.env.USER_PORTAL_URL || '/dashboard';

  // Dynamic schema based on the current step
  const formMethods = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    if (!isLoaded) return;

    try {
      const signInData = data as SignInFormData;

      const signInAttempt = await signIn.create({
        identifier: signInData.email,
        password: signInData.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push(userPortalUrl);
      } else {
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: 'Something went wrong. Please try a different email address.',
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

  return {
    formMethods,
    onSubmit,
  };
};
