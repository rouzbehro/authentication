import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Step2() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const interests = [
    'Rental and Desktop Reports',
    'Investment Analysis',
    'Pre-construction Homes',
    'Neighborhood Analytics',
    'Cash Flow Analysis',
    'Property Appraisals',
    'Market Trends Performance',
    'Comparable Market Analysis',
    'Mortgage Rates',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Step 2: Interests Selection</h2>
      <p className="text-sm text-gray-600">Select your interests to help us understand your preferences. You can select multiple options.</p>
      <div className="mt-4">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">Your Interests</legend>
          <div className="space-y-2">
            {interests.map((interest) => (
              <label key={interest} className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  value={interest}
                  {...register('interests', {
                    validate: (value) => (value && value.length > 0) || 'Please select at least one interest.',
                  })}
                  className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {errors.interests && <p className="mt-2 text-sm text-red-600">{errors.interests.message}</p>}
      </div>
    </div>
  );
}
