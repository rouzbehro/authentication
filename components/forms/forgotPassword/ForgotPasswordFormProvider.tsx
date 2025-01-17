'use client';

import { useFormForgotPassword } from '@/hooks/auth/use-form-forgot-password';
import React from 'react';
import { FormProvider } from 'react-hook-form';

type ForgotPasswordFormProviderProps = {
  children: React.ReactNode;
};

const ForgotPasswordFormProvider = ({ children }: ForgotPasswordFormProviderProps) => {
  const { formMethods, onSubmit } = useFormForgotPassword();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default ForgotPasswordFormProvider;
