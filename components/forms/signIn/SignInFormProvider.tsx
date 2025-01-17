'use client';

import { useFormSignIn } from '@/hooks/auth/use-form-sign-in';
import React from 'react';
import { FormProvider } from 'react-hook-form';

type SignInFormProviderProps = {
  children: React.ReactNode;
};

const SignInFormProvider = ({ children }: SignInFormProviderProps) => {
  const { formMethods, onSubmit } = useFormSignIn();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default SignInFormProvider;
