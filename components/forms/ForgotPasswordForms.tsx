'use client';

import React from 'react';
import { useFormStep } from '@/context/shared/use-form-steps-context';
import dynamic from 'next/dynamic';
import Loading from '../shared/Loading';

const ForgotPasswordFormInputs = dynamic(() => import('./ForgotPasswordForm'), {
  loading: () => <Loading />,
  ssr: false,
});

const ResetPasswordFormInputs = dynamic(() => import('./OtpForm'), {
  loading: () => <Loading />,
  ssr: false,
});

const stepComponents: {
  [key: number]: {
    Component: React.ComponentType<any>;
    props?: Record<string, any>;
  };
} = {
  1: {
    Component: ForgotPasswordFormInputs,
  },
  2: {
    Component: ResetPasswordFormInputs,
    props: {
      title: 'Reset Your Password',
      subtitle: 'Enter your new password and confirm it.',
      buttonText: 'Reset Password',
    },
  },
};

const ForgotPasswordForms = () => {
  const { step } = useFormStep();
  const stepConfig = stepComponents[step];
  if (!stepConfig) return null;
  const { Component, props } = stepConfig;
  return <Component {...props} />;
};

export default ForgotPasswordForms;
