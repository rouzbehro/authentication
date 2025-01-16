'use client';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingFormData, onboardingSchema } from '@/validation';
import { onboardUser } from '@/actions/user';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import MultiStepWrapper from '@/components/shared/MultiStepWrapper';
import { useFormStep } from '@/context/use-form-steps-context';

type Props = {
  children: React.ReactNode;
};

const OnboardingFormProvider = ({ children }: Props) => {
  const { step, setStep } = useFormStep();
  const router = useRouter();
  const userPortalUrl = process.env.USER_PORTAL_URL || '/dashboard';
  const { toast } = useToast();
  const { userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize React Hook Form with Zod validation
  const formMethods = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      title: undefined,
      interests: [],
      accountType: undefined,
      location: undefined,
      companyName: undefined,
      companyAddress: undefined,
      companyEmail: undefined,
      companyPhone: undefined,
    },
    mode: 'onBlur',
  });

  const { trigger } = formMethods;

  const onSubmit = async (data: OnboardingFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (userId) {
      const updatedUser = await onboardUser(userId, data);

      if (updatedUser.status === 200) {
        router.push(userPortalUrl);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    }

    setIsSubmitting(false);
  };
  const stepFields: {
    [key: number]: ('title' | 'interests' | 'accountType' | 'location' | 'companyName' | 'companyAddress' | 'companyEmail' | 'companyPhone')[];
  } = {
    1: ['title'], // Fields to validate in Step 1
    2: ['interests'], // Fields to validate in Step 2
    3: ['accountType'], // Fields to validate in Step 3
    4: ['location', 'companyName', 'companyAddress', 'companyEmail', 'companyPhone'], // Step 4 fields
  };

  const handleNext = async () => {
    const fieldsToValidate = stepFields[step];
    if (!fieldsToValidate) return; // Prevent invalid step access

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1); // Proceed to the next step only if valid
    }
  };

  const handlePrevious = () => setStep(step - 1);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        <MultiStepWrapper
          step={step}
          totalSteps={Object.keys(stepFields).length}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          isLoading={isSubmitting}
        >
          {children}
        </MultiStepWrapper>
      </form>
    </FormProvider>
  );
};

export default OnboardingFormProvider;
