'use client';

import React from 'react';
import Separator from '../shared/Separator';
import { AuthButton } from '../auth/AuthButton';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { InputField } from '../form/fields/InputField';
import { PasswordField } from '../form/fields/PasswordField';
import { signUpSchema } from '@/app/validation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { H3, SmallText } from '@/components/shared/Typography';
import { useSignUpFormStep } from '@/context/sign-up/use-sign-up-steps-context';

function SignUpForm() {
  const { toast } = useToast();
  const { signUp, isLoaded } = useSignUp();
  const { step, setStep } = useSignUpFormStep();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setStep(step + 1);
    } catch (error: unknown) {
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
        <H3>Create an account</H3>
        <SmallText>Sign up to get started</SmallText>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <InputField control={form.control} name="email" label="Email" placeholder="Enter your email" type="email" />
            <div className="flex gap-4">
              <InputField
                control={form.control}
                className="flex-1"
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                type="text"
              />
              <InputField
                control={form.control}
                className="flex-1"
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                type="text"
              />
            </div>
            <PasswordField control={form.control} name="password" label="Password" placeholder="Enter your password" />
          </div>

          <div className="mt-4" id="clerk-captcha"></div>

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            Sign up
          </Button>

          <Separator>Or continue with</Separator>
          <div className="space-y-2 mt-4">
            <AuthButton provider="google" text="Sign up with Google" disabled={isSubmitting} />
            <AuthButton provider="apple" text="Sign up with Apple" disabled={isSubmitting} />
          </div>
        </form>
      </Form>
    </>
  );
}

export default SignUpForm;
