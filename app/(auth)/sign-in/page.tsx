import React from 'react';
import SignInForm from '@/components/forms/signIn/SignInForm';
import SignInFormProvider from '@/components/forms/signIn/SignInFormProvider';
import { LinkText } from '@/components/shared/LinkText';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <>
      <div className="image-wrapper">
        <Image src="./placeholder.svg?height=1080&width=1920" alt="Sign up visual" layout="fill" objectFit="cover" priority />
      </div>
      <div className="form-container">
        <div className="form-wrapper">
          <SignInFormProvider>
            <SignInForm />
          </SignInFormProvider>
          <LinkText link="/sign-up" linkText="Sign up here" preLinkText="Do not have an account yet?" />
        </div>
      </div>
    </>
  );
}
