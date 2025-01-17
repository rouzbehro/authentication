import React from 'react';
import Image from 'next/image';
import SignUpFormProvider from '@/components/forms/signUp/SignUpFormProvider';
import SignUpForms from '@/components/forms/signUp/SignUpForms';
import { FormStepContextProvider } from '@/context/use-form-steps-context';
import { LinkText } from '@/components/shared/LinkText';

export default function SignUpPage() {
  return (
    <>
      <div className="image-wrapper">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Sign up visual" layout="fill" objectFit="cover" priority />
      </div>
      <div className="form-container">
        <div className="form-wrapper">
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
