'use client';

import { useFormSignUp } from '@/context/sign-up/use-form-sign-up';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
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
