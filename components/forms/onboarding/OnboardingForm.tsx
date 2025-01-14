'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';
import ProgressBar from '@/components/shared/ProgressBar';
import { useFormStep } from '@/context/use-form-steps-context';
import Loading from '@/components/shared/Loading';
import CTAButton from '@/components/shared/CTAButton';
import { ArrowLeft } from 'lucide-react';
import MultiStepWrapper from '@/components/shared/MultiStepWrapper';

// Dynamically import step components
const Step1 = dynamic(() => import('./Step1'), { loading: () => <Loading />, ssr: false });
const Step2 = dynamic(() => import('./Step2'), { loading: () => <Loading />, ssr: false });
const Step3 = dynamic(() => import('./Step3'), { loading: () => <Loading />, ssr: false });
const Step4 = dynamic(() => import('./Step4'), { loading: () => <Loading />, ssr: false });

// Map steps to their respective components
const stepComponents: { [key: number]: React.ComponentType } = {
  1: Step1,
  2: Step2,
  3: Step3,
  4: Step4,
};

export default function OnboardingForm() {
  const { step, setStep } = useFormStep();
  const { trigger, formState } = useFormContext();

  // Dynamically determine the step component
  const StepComponent = stepComponents[step] || null;

  const handleNext = async () => {
    const stepFields: { [key: number]: string[] } = {
      1: ['title'], // Fields to validate in Step 1
      2: ['interests'], // Fields to validate in Step 2
      3: ['accountType'], // Fields to validate in Step 3
      4: ['province', 'companyName', 'companyAddress', 'companyEmail', 'companyPhone'], // Step 4 fields
    };

    // Trigger validation for current step's fields
    const isValid = await trigger(stepFields[step]);

    console.log(formState.errors);
    console.log(step);
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
