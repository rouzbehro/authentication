import React from 'react';
import { useFormContext } from 'react-hook-form';

import { User, Users } from 'lucide-react';
import OptionCard from '@/components/form/fields/OptionCard';
import FormHeader from '@/components/form/shared/FormHeader';
import { ErrorMessage } from '@hookform/error-message';

export default function Step3() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  // Watch the selected value to set it as selectedValue for the OptionCard
  const selectedValue = watch('accountType', '');

  const accountOptions = [
    {
      value: 'Individual',
      label: 'Individual Account',
      description: 'Perfect for independent appraisers, real estate agents, and investors managing their own workflow.',
      icon: <User size={24} className="text-gray-700" />,
      features: ['Access to all main features.', 'Manage reports and data independently.', 'Personalized tools for your needs.'],
    },
    {
      value: 'Team',
      label: 'Team Account',
      description: 'Ideal for teams of 5 or more, looking for collaborative tools, centralized billing, and performance tracking.',
      icon: <Users size={24} className="text-gray-700" />,
      features: ['Multi-member access under one account.', 'Centralized management and billing.', 'Up to 30% volume discount.'],
    },
  ];

  const handleOptionChange = (value: string) => {
    setValue('accountType', value, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <FormHeader title="Choose Your Account Type" subtitle="Choose an account for yourself or your team and start using our tools today." />
      <div className="mt-4 min-h-[460px] flex flex-col justify-center">
        <fieldset>
          <OptionCard options={accountOptions} selectedValue={selectedValue} onChange={handleOptionChange} />
        </fieldset>
        <ErrorMessage errors={errors} name="accountType" render={({ message }) => <p className="mt-2 text-sm text-red-600">{message}</p>} />
      </div>
    </div>
  );
}
