import React from 'react';
import Image from 'next/image';
import { FormStepContextProvider } from '@/context/use-form-steps-context';
import { LinkText } from '@/components/shared/LinkText';
import ForgotPasswordFormProvider from '@/components/forms/forgotPassword/ForgotPasswordFormProvider';
import ForgotPasswordForms from '@/components/forms/forgotPassword/ForgotPasswordForms';

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="image-wrapper">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Sign up visual" layout="fill" objectFit="cover" priority />
      </div>
      <div className="form-container">
        <div className="form-wrapper">
          <FormStepContextProvider>
            <ForgotPasswordFormProvider>
              <ForgotPasswordForms />
            </ForgotPasswordFormProvider>
          </FormStepContextProvider>
          <LinkText link="/sign-in" linkText="Sign in here" preLinkText="Remembered your password?" />
        </div>
      </div>
    </>
  );
}
