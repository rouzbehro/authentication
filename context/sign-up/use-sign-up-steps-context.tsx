'use client';

import React, { useState, createContext, useContext, ReactNode } from 'react';

// Define the type for the context
interface SignUpFormStepContextType {
  step: number;
  setStep: (step: number) => void;
}

// Create the context
const SignUpFormStepContext = createContext<SignUpFormStepContextType | undefined>(undefined);

// Create a provider component
export const SignUpFormContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<number>(1); // Default to step 1
  return <SignUpFormStepContext.Provider value={{ step, setStep }}>{children}</SignUpFormStepContext.Provider>;
};

// Custom hook to use the SignUpFormStepContext
export const useSignUpFormStep = (): SignUpFormStepContextType => {
  const context = useContext(SignUpFormStepContext);
  if (!context) {
    throw new Error('useSignUpFormStep must be used within a SignUpFormContextProvider');
  }
  return context;
};
