'use client';

import React, { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import CTAButton from '@/components/shared/CTAButton';

type StepWrapperProps = {
  step: number;
  totalSteps: number;
  handleNext: () => void;
  handlePrevious: () => void;
  children: ReactNode;
};

const MultiStepWrapper: React.FC<StepWrapperProps> = ({ step, totalSteps, handleNext, handlePrevious, children }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen p-8 sm:p-16 bg-gray-100">
      <div className="flex flex-col w-9/12 bg-white rounded-xl min-h-[750px] relative justify-center">
        <div>
          <div className="absolute top-0 left-0 m-8">
            {step > 1 && <ArrowLeft size={28} className="hover:cursor-pointer hover:text-primary" onClick={handlePrevious} />}
          </div>
          <div className="max-w-lg mx-auto">
            {/* Main Content Area */}
            <div className="px-4 pt-8 min-h-96 mx-auto">{children}</div>

            {/* Footer */}
            <div className="w-full px-4 pb-8 pt-5 rounded-b-xl">
              {step < totalSteps && (
                <CTAButton theme="secondary" onClick={handleNext}>
                  Next
                </CTAButton>
              )}
              {step === totalSteps && <CTAButton type="submit">Next</CTAButton>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepWrapper;
