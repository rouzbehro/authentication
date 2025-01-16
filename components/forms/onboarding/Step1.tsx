import React from 'react';
import FormHeader from '@/components/form/shared/FormHeader';
import OptionCard from '@/components/form/fields/OptionCard';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { TITLES } from '@/constants/onboarding';

export default function Step1() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const selectedValue = watch('title');

  const handleOptionChange = (value: string) => {
    setValue('title', value, { shouldValidate: true });
  };

  return (
    <div>
      <FormHeader className="mb-6" title="What Describes You Best?" subtitle="Select the option that best describes your role." />
      <OptionCard options={TITLES} selectedValue={selectedValue} onChange={handleOptionChange} />
      <ErrorMessage errors={errors} name="title" render={({ message }) => <p className="mt-2 text-sm text-red-600">{message}</p>} />
    </div>
  );
}
