import { cn } from '@/lib/utils';
import React from 'react';

interface ProgressBarProps {
  steps: number;
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center space-x-2 mx-auto mt-2 mb-10">
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-2 rounded-full transition-all',
            index < currentStep ? 'bg-green-500' : 'bg-gray-300',
            index + 1 === currentStep ? 'w-20' : 'w-8'
          )}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
