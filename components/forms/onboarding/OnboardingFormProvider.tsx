'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import MultiStepWrapper from '@/components/shared/MultiStepWrapper';
import useFormOnboarding from '@/hooks/onboarding/use-form-onboarding';

type Props = {
  children: React.ReactNode;
};

const OnboardingFormProvider = ({ children }: Props) => {
  const { formMethods, onSubmit, handleNext, handlePrevious, isSubmitting, step, stepFields } = useFormOnboarding();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        <MultiStepWrapper
          step={step}
          totalSteps={Object.keys(stepFields).length}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          isLoading={isSubmitting}
        >
          {children}
        </MultiStepWrapper>
      </form>
    </FormProvider>
  );
};

export default OnboardingFormProvider;
