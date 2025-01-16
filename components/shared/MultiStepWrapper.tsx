'use client';

import React, { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import CTAButton from '@/components/shared/CTAButton';
import ProgressBar from './ProgressBar';

type StepWrapperProps = {
  step: number;
  totalSteps: number;
  handleNext: () => void;
  handlePrevious: () => void;
  children: ReactNode;
  isLoading?: boolean;
};

const MultiStepWrapper: React.FC<StepWrapperProps> = ({ step, totalSteps, handleNext, handlePrevious, children, isLoading = false }) => {
  return (
    <div className="flex items-center justify-center md:h-screen h-auto w-screen p-4 sm:p-16 bg-gray-100 md:mb-0 mb-16">
      <div className="flex flex-col 2xl:w-5/12 md:w-10/12 w-full bg-white rounded-xl min-h-[750px] justify-center relative">
        <div className="absolute top-0 left-0 m-8">
          {step > 1 && <ArrowLeft size={28} className="hover:cursor-pointer hover:text-primary lg:block hidden" onClick={handlePrevious} />}
        </div>
        <div className="space-y-6 md:w-[480px] w-11/12 mx-auto ">
          {/* Main Content Area */}
          <div className="min-h-[550px] w-full md:p-0 p-4">{children}</div>
          <div className="md:p-0 md:border-none md:relative p-4 bg-white border-t border-gray-200 fixed left-0 bottom-0 w-full">
            {/* Footer */}
            {step < totalSteps && (
              <CTAButton type="button" theme="secondary" onClick={handleNext} isLoading={isLoading}>
                Next
              </CTAButton>
            )}
            {step === totalSteps && (
              <CTAButton type="submit" isLoading={isLoading}>
                Get Started
              </CTAButton>
            )}
          </div>
          <div className="hidden md:block">
            <ProgressBar currentStep={step} steps={totalSteps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepWrapper;
