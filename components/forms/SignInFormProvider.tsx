'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
};

const formMethods = '';

const SignInFormProvider = ({ children }: Props) => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={() => {}} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default SignInFormProvider;
