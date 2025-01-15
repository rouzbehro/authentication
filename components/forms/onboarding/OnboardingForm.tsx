'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';
import { useFormStep } from '@/context/use-form-steps-context';
import Loading from '@/components/shared/Loading';
import MultiStepWrapper from '@/components/shared/MultiStepWrapper';

// Dynamically import step components
const Step1 = dynamic(() => import('./Step1'), { loading: () => <Loading fit="stretch" />, ssr: false });
const Step2 = dynamic(() => import('./Step2'), { loading: () => <Loading fit="stretch" />, ssr: false });
const Step3 = dynamic(() => import('./Step3'), { loading: () => <Loading fit="stretch" />, ssr: false });
const Step4 = dynamic(() => import('./Step4'), { loading: () => <Loading fit="stretch" />, ssr: false });

// Map steps to their respective components
const stepComponents: { [key: number]: React.ComponentType } = {
  1: Step1,
  2: Step2,
  3: Step3,
  4: Step4,
};

export default function OnboardingForm() {
  const { step, setStep } = useFormStep();
  const { trigger } = useFormContext();

  // Dynamically determine the step component
  const StepComponent = stepComponents[step] || null;

  const stepFields: { [key: number]: string[] } = {
    1: ['title'], // Fields to validate in Step 1
    2: ['interests'], // Fields to validate in Step 2
    3: ['accountType'], // Fields to validate in Step 3
    4: ['province', 'companyName', 'companyAddress', 'companyEmail', 'companyPhone'], // Step 4 fields
  };

  const handleNext = async () => {
    // Validate only the current step's fields
    const isValid = await trigger(stepFields[step]);
    if (isValid) {
      setStep(step + 1); // Proceed to the next step only if valid
    }
  };

  const handlePrevious = () => setStep(step - 1);

  return (
    <MultiStepWrapper step={step} totalSteps={Object.keys(stepComponents).length} handleNext={handleNext} handlePrevious={handlePrevious}>
      {StepComponent && <StepComponent />}
    </MultiStepWrapper>
  );
}
