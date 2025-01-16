import React from 'react';
import { useFormContext } from 'react-hook-form';

import ChoiceCard from '@/components/form/fields/ChoiceCars';
import FormHeader from '@/components/form/shared/FormHeader';
import { ErrorMessage } from '@hookform/error-message';
import { INTERESTS } from '@/constants/onboarding';
import Icon from '@/components/shared/Icon';

export default function Step2() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedInterests = watch('interests', []);

  const handleChoiceChange = (id: string) => {
    const updatedInterests = selectedInterests.includes(id)
      ? selectedInterests.filter((item: string) => item !== id)
      : [...selectedInterests, id];

    setValue('interests', updatedInterests, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <FormHeader title="What insights are you looking for?" subtitle="We’ll personalize your experience based on your preferences." />

      <div className="mt-4 mx-auto">
        <fieldset>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {INTERESTS.map((interest) => (
              <ChoiceCard
                key={interest.id}
                id={interest.id}
                label={interest.label}
                icon={<Icon name={interest.icon} />}
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
