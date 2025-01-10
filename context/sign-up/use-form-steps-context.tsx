'use client';

import React, { useState, createContext, useContext, ReactNode } from 'react';

// Define the type for the context
interface FormStepContextType {
  step: number;
  setStep: (step: number) => void;
}

// Create the context
const FormStepContext = createContext<FormStepContextType | undefined>(undefined);

// Create a provider component
export const FormStepContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<number>(1); // Default to step 1
  return <FormStepContext.Provider value={{ step, setStep }}>{children}</FormStepContext.Provider>;
};

// Custom hook to use the FormStepContext
export const useFormStep = (): FormStepContextType => {
  const context = useContext(FormStepContext);
  if (!context) {
    throw new Error('useFormStep must be used within a FormStepContextProvider');
  }
  return context;
};
