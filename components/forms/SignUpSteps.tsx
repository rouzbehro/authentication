'use client';

import React from 'react';
import SignUpForm from '@/components/forms/SignUpForm';
import OtpForm from './OtpForm';
import { useSignUpFormStep } from '@/context/sign-up/use-sign-up-steps-context';

type Props = {};

const SignUpSteps = (props: Props) => {
  const { step } = useSignUpFormStep();
  return (
    <>
      {step === 1 && <SignUpForm />}
      {step === 2 && <OtpForm />}
    </>
  );
};

export default SignUpSteps;
