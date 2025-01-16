import React from 'react';
import dynamic from 'next/dynamic';
import { useFormStep } from '@/context/use-form-steps-context';
import Loading from '@/components/shared/Loading';

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
  const { step } = useFormStep();

  // Dynamically determine the step component
  const StepComponent = stepComponents[step] || null;

  return StepComponent && <StepComponent />;
}
