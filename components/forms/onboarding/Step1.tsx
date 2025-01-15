import FormHeader from '@/components/form/shared/FormHeader';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Clipboard, Home, TrendingUp, Key, User } from 'lucide-react';
import OptionCard from '@/components/form/fields/OptionCard';
import { ErrorMessage } from '@hookform/error-message';

export default function Step1() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const selectedValue = watch('title'); // Get the currently selected value

  const options = [
    {
      value: 'Appraiser',
      label: 'Appraiser',
      description: 'I evaluate properties and create rental or value reports.',
      icon: <Clipboard size={24} />,
    },
    {
      value: 'Real Estate Agent',
      label: 'Real Estate Agent',
      description: 'I help clients buy, sell, or rent properties.',
      icon: <Home size={24} />,
    },
    {
      value: 'Real Estate Investor',
      label: 'Real Estate Investor',
      description: 'I invest in properties to maximize my returns.',
      icon: <TrendingUp size={24} />,
    },
    {
      value: 'Landlord',
      label: 'Landlord',
      description: 'I own rental properties and manage tenants.',
      icon: <Key size={24} />,
    },
    {
      value: 'Other',
      label: 'Other',
      description: "I'm just exploring for now.",
      icon: <User size={24} />,
    },
  ];

  const handleOptionChange = (value: string) => {
    setValue('title', value, { shouldValidate: true });
  };

  return (
    <div>
      <FormHeader className='mb-6' title="What Describes You Best?" subtitle="Select the option that best describes your role." />
      <OptionCard options={options} selectedValue={selectedValue} onChange={handleOptionChange} />
      <ErrorMessage errors={errors} name="title" render={({ message }) => <p className="mt-2 text-sm text-red-600">{message}</p>} />
    </div>
  );
}
