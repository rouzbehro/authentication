import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const titles = ['Appraiser', 'Real Estate Agent', 'Real Estate Investor', 'Landlord', 'Other'];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Step 1: Title Selection</h2>
      <p className="text-sm text-gray-600">Please select your title from the options below. This helps us tailor the experience for you.</p>
      <div className="mt-4">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">Your Title</legend>
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
        {errors.title && typeof errors.title.message === 'string' && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
      </div>
    </div>
  );
}
