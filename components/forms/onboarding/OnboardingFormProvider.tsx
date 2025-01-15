'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingFormData, onboardingSchema } from '@/validation';
import { updateUser } from '@/actions/user';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';

type Props = {
  children: React.ReactNode;
};

const OnboardingFormProvider = ({ children }: Props) => {
  const router = useRouter();
  const userPortalUrl = process.env.USER_PORTAL_URL || '/dashboard';
  const { toast } = useToast();
  const { userId } = useAuth();

  // Initialize React Hook Form with Zod validation
  const formMethods = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      title: undefined,
      interests: [],
      accountType: undefined,
      province: undefined,
      companyName: undefined,
      companyAddress: undefined,
      companyEmail: undefined,
      companyPhone: undefined,
      companyLogo: null,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: OnboardingFormData) => {
    if (userId) {
      const updatedUser = await updateUser(userId, data);
      toast({
        variant: 'default',
        title: 'Error',
        description: 'Account Created',
      });
      router.push(userPortalUrl);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default OnboardingFormProvider;
