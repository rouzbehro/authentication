import FormHeader from '@/components/form/shared/FormHeader';
import { Paragraph, SmallText } from '@/components/shared/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const titles = ['Appraiser', 'Real Estate Agent', 'Real Estate Investor', 'Landlord', 'Other'];

  return (
    <div>
      <FormHeader
        title="What Describes You Best?"
        subtitle="Tell us about yourself!"
        description="Select the option that best describes your role. This helps us tailor the app to your needs"
      />

      <div className="mt-8">
        <fieldset>
          <div className="space-y-2">
            {titles.map((title) => (
              <label key={title} className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  value={title}
                  {...register('title', { required: 'Please select your title.' })}
                  className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span>{title}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      {errors.title && typeof errors.title.message === 'string' && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
    </div>
  );
}
