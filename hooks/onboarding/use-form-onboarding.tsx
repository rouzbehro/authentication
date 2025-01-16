import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingFormData, onboardingSchema } from '@/validation';
import { onboardUser } from '@/actions/user';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useFormStep } from '@/context/use-form-steps-context';

const useFormOnboarding = () => {
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

  const stepFields: {
    [key: number]: ('title' | 'interests' | 'accountType' | 'location' | 'companyName' | 'companyAddress' | 'companyEmail' | 'companyPhone')[];
  } = {
    1: ['title'],
    2: ['interests'],
    3: ['accountType'],
    4: ['location', 'companyName', 'companyAddress', 'companyEmail', 'companyPhone'],
  };

  const onSubmit = async (data: OnboardingFormData) => {
    if (isSubmitting) return;
    if (userId) {
      setIsSubmitting(true);
      const updatedUser = await onboardUser(userId, data);
      if (updatedUser.status === 200) {
        router.push(userPortalUrl);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
        setIsSubmitting(false);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = stepFields[step];
    if (!fieldsToValidate) return;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => setStep(step - 1);

  return {
    formMethods,
    onSubmit,
    handleNext,
    handlePrevious,
    isSubmitting,
    stepFields,
    step,
  };
};

export default useFormOnboarding;
