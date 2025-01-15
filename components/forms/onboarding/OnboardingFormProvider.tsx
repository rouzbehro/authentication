'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingFormData, onboardingSchema } from '@/validation';

type Props = {
  children: React.ReactNode;
};

const OnboardingFormProvider = ({ children }: Props) => {
  // Initialize React Hook Form with Zod validation
  const formMethods = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      title: undefined,
      interests: [],
      accountType: undefined,
      province: undefined,
      companyName: undefined,
      companyAddress: undefined,
      companyEmail: undefined,
      companyPhone: undefined,
      companyLogo: null,
    },
    mode: 'onBlur',
  });

  const onSubmit = () => {
    alert('Here');
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default OnboardingFormProvider;
