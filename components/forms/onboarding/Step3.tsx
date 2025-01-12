import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Step3() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const accountTypes = ['Individual', 'Team'];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Step 3: Account Type Selection</h2>
      <p className="text-sm text-gray-600">Select the type of account you want to create. This will determine how your account is configured.</p>
      <div className="mt-4">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">Account Type</legend>
          <div className="space-y-2">
            {accountTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  value={type}
                  {...register('accountType', {
                    required: 'Please select your account type.',
                  })}
                  className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {errors.accountType && <p className="mt-2 text-sm text-red-600">{errors.accountType.message}</p>}
      </div>
    </div>
  );
}
