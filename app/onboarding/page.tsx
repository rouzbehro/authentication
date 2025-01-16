'use client';

import React from 'react';
import { FormStepContextProvider } from '@/context/use-form-steps-context';
import OnboardingFormProvider from '@/components/forms/onboarding/OnboardingFormProvider';
import OnboardingForms from '@/components/forms/onboarding/OnboardingForms';

export default function OnboardingPage() {
  return (
    <FormStepContextProvider>
      <OnboardingFormProvider>
        <OnboardingForms />
      </OnboardingFormProvider>
    </FormStepContextProvider>
  );
}
