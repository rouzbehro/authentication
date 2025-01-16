import React from 'react';
import { useFormContext } from 'react-hook-form';

import OptionCard from '@/components/form/fields/OptionCard';
import FormHeader from '@/components/form/shared/FormHeader';
import { ErrorMessage } from '@hookform/error-message';
import { ACCOUNT_OPTIONS } from '@/constants/onboarding';

export default function Step3() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  // Watch the selected value to set it as selectedValue for the OptionCard
  const selectedValue = watch('accountType', '');

  const handleOptionChange = (value: string) => {
    setValue('accountType', value, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <FormHeader title="Choose Your Account Type" subtitle="Choose an account for yourself or your team and start using our tools today." />
      <div className="mt-4 min-h-[460px] flex flex-col justify-center">
        <fieldset>
          <OptionCard options={ACCOUNT_OPTIONS} selectedValue={selectedValue} onChange={handleOptionChange} />
        </fieldset>
        <ErrorMessage errors={errors} name="accountType" render={({ message }) => <p className="mt-2 text-sm text-red-600">{message}</p>} />
      </div>
    </div>
  );
}
