'use client';

import React from 'react';
import { FormStepContextProvider } from '@/context/use-form-steps-context';
import OnboardingFormProvider from '@/components/forms/onboarding/OnboardingFormProvider';
import OnboardingForm from '@/components/forms/onboarding/OnboardingForm';

export default function OnboardingPage() {
  return (
    <FormStepContextProvider>
      <OnboardingFormProvider>
        <OnboardingForm />
      </OnboardingFormProvider>
    </FormStepContextProvider>
  );
}
