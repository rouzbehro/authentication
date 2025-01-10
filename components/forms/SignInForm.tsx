import React from 'react';
import Separator from '../shared/Separator';
import { AuthButton } from '../auth/AuthButton';
import FormHeader from './FormHeader';

function SignInForm() {
  return (
    <>
      <FormHeader title="Welcome back" subtitle="Please enter your details" />

      <Separator>Or continue with</Separator>

      <div className="space-y-2 mt-4">
        <AuthButton provider="google" text="Sign in with Google" disabled={false} />
        <AuthButton provider="apple" text="Sign in with Apple" disabled={false} />
      </div>
    </>
  );
}

export default SignInForm;
