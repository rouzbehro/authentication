import React from 'react';
import SignUpFormProvider from '@/components/forms/SignUpFormProvider';
import SignUpForms from '@/components/forms/SignUpForms';
import { LinkText } from '@/components/shared/LinkText';

import { FormStepContextProvider } from '@/context/sign-up/use-form-steps-context';

export default function SignUpPage() {
  return (
    <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white rounded-l-3xl md:rounded-r-none rounded-r-3xl">
      <div className="w-full max-w-md space-y-8">
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
  );
}
