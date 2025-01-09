import React from 'react';
import OtpField from '../form/fields/OtpField';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { H3, SmallText } from '@/components/shared/Typography';
import { otpSchema } from '@/app/validation';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const OtpForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: data.otp,
      });

      // If verification was completed, set the session to active and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('error:');
        console.log(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <>
      <div className="text-center">
        <H3>Verify Your Email Address</H3>
        <SmallText>Enter the 6-digit code sent to your email.</SmallText>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mb-4">
            <OtpField control={control} name="otp" label="OTP Code" />
          </div>
          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            Verify Email Address
          </Button>
        </form>
      </Form>
    </>
  );
};

export default OtpForm;
