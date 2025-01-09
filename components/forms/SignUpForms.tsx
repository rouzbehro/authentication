'use client';

import React from 'react';
import SignUpForm from '@/components/forms/SignUpForm';

import { useSignUpFormStep } from '@/context/sign-up/use-sign-up-steps-context';
import dynamic from 'next/dynamic';

type Props = {};

const OTPForm = dynamic(() => import('./OtpForm'), {
  ssr: false,
});

const SignUpForms = (props: Props) => {
  const { step } = useSignUpFormStep();
  return (
    <>
      {step === 1 && <SignUpForm />}
      {step === 2 && <OTPForm />}
    </>
  );
};

export default SignUpForms;
