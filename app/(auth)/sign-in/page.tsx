import React from 'react';
import SignInForm from '@/components/forms/signIn/SignInForm';
import SignInFormProvider from '@/components/forms/signIn/SignInFormProvider';
import { LinkText } from '@/components/shared/LinkText';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <>
      <div className="w-full md:w-1/2 h-32 md:h-screen relative">
        <Image src="./placeholder.svg?height=1080&width=1920" alt="Sign up visual" layout="fill" objectFit="cover" priority />
      </div>
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center md:bg-white rounded-l-3xl md:rounded-r-none rounded-r-3xl">
        <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-0 sm:rounded-none rounded-3xl">
          <SignInFormProvider>
            <SignInForm />
          </SignInFormProvider>
          <LinkText link="/sign-up" linkText="Sign up here" preLinkText="Do not have an account yet?" />
        </div>
      </div>
    </>
  );
}
