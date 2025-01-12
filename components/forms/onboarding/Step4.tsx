import React from 'react';
import { useFormContext } from 'react-hook-form';

import { SelectField } from '@/components/form/fields/SelectField';
import { InputField } from '@/components/form/fields/InputField';

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Step 4: Company Information</h2>
      <p className="text-sm text-gray-600">Provide your company information to complete the onboarding process.</p>

      {/* Province Selection */}
      <SelectField
        name="province"
        label="Province"
        placeholder="Select your province"
        options={provinces}
        setValue={setValue}
        errors={errors}
        className="mt-4"
      />

      {/* Company Name */}
      <InputField
        register={register}
        name="companyName"
        label="Company Name (Optional)"
        placeholder="Enter your company name "
        type="text"
        errors={errors}
        className="mt-4"
      />

      {/* Company Address */}
      <InputField
        register={register}
        name="companyAddress"
        label="Company Address (Optional)"
        placeholder="Enter your company address"
        type="text"
        errors={errors}
        className="mt-4"
      />

      {/* Company Email */}
      <InputField
        register={register}
        name="companyEmail"
        label="Company Email (Optional)"
        placeholder="Enter your company email"
        type="email"
        errors={errors}
        className="mt-4"
      />

      {/* Company Phone */}
      <InputField
        register={register}
        name="companyPhone"
        label="Company Phone (Optional)"
        placeholder="Enter your company phone number"
        type="tel"
        errors={errors}
        className="mt-4"
      />

      {/* Company Logo */}
      <div className="mt-4">
        <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700">
          Company Logo (Optional)
        </label>
        <input
          type="file"
          id="companyLogo"
          accept="image/*"
          {...register('companyLogo')}
          className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:text-gray-500 hover:file:bg-gray-200"
        />
      </div>
    </div>
  );
}
