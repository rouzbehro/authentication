'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';
import ProgressBar from '@/components/shared/ProgressBar';
import { useFormStep } from '@/context/use-form-steps-context';
import Loading from '@/components/shared/Loading';
import CTAButton from '@/components/shared/CTAButton';
import { ArrowLeft } from 'lucide-react';

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
    if (!isValid) {
      setStep(step + 1); // Proceed to the next step only if valid
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen p-8 sm:p-16 bg-gray-100">
      <div className="flex flex-col w-full bg-white rounded-3xl p-8 relative pb-24">
        <div className="min-h-6">
          {step > 1 && <ArrowLeft className="hover:cursor-pointer hover:text-primary" onClick={() => setStep(step - 1)} />}
        </div>
        {StepComponent ? <div className='mb-8'><StepComponent /></div> : <p className="text-center text-lg font-medium">Form complete!</p>}
        {step < Object.keys(stepComponents).length && (
          <CTAButton theme="secondary" onClick={handleNext}>
            Next
          </CTAButton>
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
