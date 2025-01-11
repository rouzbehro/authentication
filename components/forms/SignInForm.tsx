'use client';

import React from 'react';
import Separator from '../shared/Separator';
import { AuthButton } from '../auth/AuthButton';
import FormHeader from './FormHeader';
import { useFormContext } from 'react-hook-form';
import { InputField } from '../form/fields/InputField';
import { PasswordField } from '../form/fields/PasswordField';
import { LinkText } from '../shared/LinkText';
import CTAButton from '../shared/CTAButton';
import { useOAuthSignIn } from '@/hooks/auth/use-oauth-sign-in';

function SignInForm() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const oauthSignIn = useOAuthSignIn('/sign-up/sso-callback', '/');

  return (
    <>
      <FormHeader title="Welcome back" subtitle="Please enter your details" />
      <div className="space-y-4">
        <InputField name="email" label="Email" placeholder="Enter your email" type="email" register={register} errors={errors} />
        <PasswordField name="password" label="Password" placeholder="Enter your password" register={register} errors={errors} />
        <LinkText link="/forgot-password" linkText="Forgot your password?" isBold={false} align="text-right" />
      </div>

      <CTAButton loadingText="Signing in ..." isLoading={isSubmitting}>
        Sign in
      </CTAButton>

      <Separator>Or continue with</Separator>

      {oauthSignIn && (
        <div className="space-y-2 mt-4">
          <AuthButton provider="google" text="Sign in with Google" onClick={() => oauthSignIn.signInWithOAuth('oauth_google')} />
          <AuthButton provider="apple" text="Sign in with Apple" onClick={() => oauthSignIn.signInWithOAuth('oauth_apple')} />
        </div>
      )}
    </>
  );
}

export default SignInForm;
