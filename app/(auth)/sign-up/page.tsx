import React from 'react';
import Image from 'next/image';
import SignUpFormProvider from '@/components/forms/signUp/SignUpFormProvider';
import SignUpForms from '@/components/forms/signUp/SignUpForms';
import { FormStepContextProvider } from '@/context/use-form-steps-context';
import { LinkText } from '@/components/shared/LinkText';

export default function SignUpPage() {
  return (
    <>
      <div className="w-full md:w-1/2 h-32 md:h-screen relative">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Sign up visual" layout="fill" objectFit="cover" priority />
      </div>
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center md:bg-white rounded-l-3xl md:rounded-r-none rounded-r-3xl">
        <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-0 sm:rounded-none rounded-3xl">
          {/* Provides context for managing and tracking the current step in the sign-up flow */}
          <FormStepContextProvider>
            {/* Wraps the forms with React Hook Form's provider to enable form state management */}
            <SignUpFormProvider>
              {/* Renders the actual sign-up form components */}
              <SignUpForms />
            </SignUpFormProvider>
          </FormStepContextProvider>
          <LinkText link="/sign-in" linkText="Sign in here" preLinkText="Already have an account?" />
        </div>
      </div>
    </>
  );
}
