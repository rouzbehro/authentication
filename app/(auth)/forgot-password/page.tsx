import React from 'react';
import { LinkText } from '@/components/shared/LinkText';
import { FormStepContextProvider } from '@/context/shared/use-form-steps-context';
import ForgotPasswordFormProvider from '@/components/forms/ForgotPasswordFormProvider';
import ForgotPasswordForms from '@/components/forms/ForgotPasswordForms';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full md:w-1/2 p-8 flex items-center justify-center md:bg-white rounded-l-3xl md:rounded-r-none rounded-r-3xl">
      <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-0 sm:rounded-none rounded-3xl">
        <FormStepContextProvider>
          <ForgotPasswordFormProvider>
            <ForgotPasswordForms />
          </ForgotPasswordFormProvider>
        </FormStepContextProvider>
        <LinkText link="/sign-in" linkText="Sign in here" preLinkText="Remembered your password?" />
      </div>
    </div>
  );
}
