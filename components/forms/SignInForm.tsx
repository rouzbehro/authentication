'use client';

import React from 'react';
import Separator from '../shared/Separator';
import { AuthButton } from '../auth/AuthButton';
import FormHeader from './FormHeader';
import { Button } from '../ui/button';
import { useFormContext } from 'react-hook-form';
import { InputField } from '../form/fields/InputField';
import { PasswordField } from '../form/fields/PasswordField';
import Loading from '../shared/Loading';
import { LinkText } from '../shared/LinkText';
import CTAButton from '../shared/CTAButton';

function SignInForm() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <>
      <FormHeader title="Welcome back" subtitle="Please enter your details" />
      <div className="space-y-4">
        <InputField name="email" label="Email" placeholder="Enter your email" type="email" register={register} errors={errors} />
        <PasswordField name="password" label="Password" placeholder="Enter your password" register={register} errors={errors} />
        <LinkText link="/forgot" linkText="Forgot your password?" isBold={false} align="text-right" />
      </div>

      <CTAButton loadingText="Signing in ..." isLoading={isSubmitting}>
        Sign in
      </CTAButton>

      <Separator>Or continue with</Separator>

      <div className="space-y-2 mt-4">
        <AuthButton provider="google" text="Sign in with Google" disabled={false} />
        <AuthButton provider="apple" text="Sign in with Apple" disabled={false} />
      </div>
    </>
  );
}

export default SignInForm;
