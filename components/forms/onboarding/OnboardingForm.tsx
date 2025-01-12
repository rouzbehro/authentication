'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';
import ProgressBar from '@/components/shared/ProgressBar';
import { useFormStep } from '@/context/use-form-steps-context';
import Loading from '@/components/shared/Loading';

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
  const { trigger } = useFormContext();

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
    if (isValid) {
      setStep(step + 1); // Proceed to the next step only if valid
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <ProgressBar step={step} totalSteps={Object.keys(stepComponents).length} />
      <div className="mt-6">{StepComponent ? <StepComponent /> : <p className="text-center text-lg font-medium">Form complete!</p>}</div>
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)} className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
            Previous
          </button>
        )}
        {step < Object.keys(stepComponents).length && (
          <button type="button" onClick={handleNext} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Next
          </button>
        )}
        {step === Object.keys(stepComponents).length && (
          <button type="submit" className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
