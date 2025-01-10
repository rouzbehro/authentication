import SignInForm from '@/components/forms/SignInForm';
import SignInFormProvider from '@/components/forms/SignInFormProvider';
import { LinkText } from '@/components/shared/LinkText';
import React from 'react';

export default function SignInPage() {
  return (
    <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white rounded-l-3xl md:rounded-r-none rounded-r-3xl">
      <div className="w-full max-w-md space-y-8">
        <SignInFormProvider>
          <SignInForm />
        </SignInFormProvider>
        <LinkText link="/sign-up" linkText="Sign up here" preLinkText="Do not have an account yet?" />
      </div>
    </div>
  );
}
