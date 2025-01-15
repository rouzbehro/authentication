import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FileText, BarChart2, Home, MapPin, DollarSign, Calculator, TrendingUp, Layers, Percent } from 'lucide-react';
import ChoiceCard from '@/components/form/fields/ChoiceCars';
import FormHeader from '@/components/form/shared/FormHeader';
import { ErrorMessage } from '@hookform/error-message';

export default function Step2() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedInterests = watch('interests', []);

  const interests = [
    { id: 'rental-reports', label: 'Rental and Desktop Reports', icon: <FileText /> },
    { id: 'investment-analysis', label: 'Investment Analysis', icon: <BarChart2 /> },
    { id: 'pre-construction', label: 'Pre-construction Homes', icon: <Home /> },
    { id: 'neighborhood-analytics', label: 'Neighborhood Analytics', icon: <MapPin /> },
    { id: 'cash-flow', label: 'Cash Flow Analysis', icon: <DollarSign /> },
    { id: 'property-appraisals', label: 'Property Appraisals', icon: <Calculator /> },
    { id: 'market-trends', label: 'Market Trends Performance', icon: <TrendingUp /> },
    { id: 'comparable-analysis', label: 'Comparable Market Analysis', icon: <Layers /> },
    { id: 'mortgage-rates', label: 'Mortgage Rates', icon: <Percent /> },
  ];

  const handleChoiceChange = (id: string) => {
    const updatedInterests = selectedInterests.includes(id)
      ? selectedInterests.filter((item: string) => item !== id)
      : [...selectedInterests, id];

    setValue('interests', updatedInterests, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <FormHeader title="What insights are you looking for?" subtitle="We’ll personalize your experience based on your preferences." />

      <div className="mt-4 max-w-[435px] mx-auto ">
        <fieldset>
          <div className="grid grid-cols-3 gap-4">
            {interests.map((interest) => (
              <ChoiceCard
                key={interest.id}
                id={interest.id}
                label={interest.label}
                icon={interest.icon}
                isSelected={selectedInterests.includes(interest.id)}
                onChange={handleChoiceChange}
              />
            ))}
          </div>
        </fieldset>
        <ErrorMessage errors={errors} name="interests" render={({ message }) => <p className="mt-2 text-sm text-red-600">{message}</p>} />
      </div>
    </div>
  );
}
