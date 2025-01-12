'use client';

import React from 'react';
import { useFormStep } from '@/context/use-form-steps-context';
import dynamic from 'next/dynamic';
import Loading from '@/components/shared/Loading';

const ForgotPasswordFormInputs = dynamic(() => import('./ForgotPasswordForm'), {
  loading: () => <Loading />,
  ssr: false,
});

const ResetPasswordFormInputs = dynamic(() => import('./ResetPasswordForm'), {
  loading: () => <Loading />,
  ssr: false,
});

const stepComponents: { [key: number]: React.ComponentType } = {
  1: ForgotPasswordFormInputs,
  2: ResetPasswordFormInputs,
};

const ForgotPasswordForms = () => {
  const { step } = useFormStep();

  // Dynamically determine the step component
  const StepComponent = stepComponents[step] || null;
  return StepComponent && <StepComponent />;
};

export default ForgotPasswordForms;
