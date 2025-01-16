import React from 'react';
import { useFormContext } from 'react-hook-form';

import { SelectField } from '@/components/form/fields/SelectField';
import { InputField } from '@/components/form/fields/InputField';
import FormHeader from '@/components/form/shared/FormHeader';

export default function Step4() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Northwest Territories',
    'Nunavut',
    'Yukon',
  ];

  const hearAboutUsOptions = ['Google', 'Social Media', 'Friend/Family', 'Advertisement', 'Other'];

  return (
    <div className="space-y-2">
      <FormHeader
        className="mb-4"
        title="Complete Your Info"
        subtitle="Tell us a bit more about yourself to get the most out of our platform."
      />

      {/* Province Selection */}
      <SelectField name="location" label="Province" placeholder="Select your location" options={provinces} setValue={setValue} errors={errors} />

      {/* Company Name */}
      <InputField
        register={register}
        name="companyName"
        label="Company Name"
        placeholder="Your business or organization name (optional)"
        type="text"
        errors={errors}
      />

      {/* Company Address */}
      <InputField
        register={register}
        name="companyAddress"
        label="Company Address"
        placeholder="Enter your company address (optional)"
        type="text"
        errors={errors}
      />

      {/* Company Email */}
      <InputField
        register={register}
        name="companyEmail"
        label="Company Email"
        placeholder="Enter your company email (optional)"
        type="email"
        errors={errors}
      />

      {/* Company Phone */}
      <InputField
        register={register}
        name="companyPhone"
        label="Company Phone"
        placeholder="Enter your company phone number (optional)"
        type="tel"
        errors={errors}
      />

      {/* How did you hear about us */}
      <SelectField
        name="howDidYouHear"
        label="How did you hear about us?"
        placeholder="Select an option"
        options={hearAboutUsOptions}
        setValue={setValue}
        errors={errors}
      />
    </div>
  );
}
