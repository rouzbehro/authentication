'use client';

import { useFormSignUp } from '@/hooks/auth/use-form-sign-up';
import React from 'react';
import { FormProvider } from 'react-hook-form';

type SignUpFormProviderProps = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: SignUpFormProviderProps) => {
  const { formMethods, onSubmit } = useFormSignUp();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default SignUpFormProvider;
