'use client';

import React from 'react';
import { useFormStep } from '@/context/shared/use-form-steps-context';
import dynamic from 'next/dynamic';
import Loading from '../shared/Loading';

const SignUpFormInputs = dynamic(() => import('./SignUpForm'), {
  loading: () => <Loading />,
  ssr: false,
});

const OTPFormInputs = dynamic(() => import('./OtpForm'), {
  loading: () => <Loading />,
  ssr: false,
});

const stepComponents: { [key: number]: React.ComponentType } = {
  1: SignUpFormInputs,
  2: OTPFormInputs,
};

const SignUpForms = () => {
  const { step } = useFormStep();

  // Dynamically determine the step component
  const StepComponent = stepComponents[step] || null;
  return StepComponent && <StepComponent />;
};

export default SignUpForms;
