import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ErrorMessage } from '@hookform/error-message';
import { FieldValues, useForm } from 'react-hook-form';

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  register?: ReturnType<typeof useForm>['register'];
  setValue: (name: string, value: string) => void;
  errors: FieldValues['errors'];
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, placeholder, options, setValue, errors, className }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select onValueChange={(value) => setValue(name, value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ErrorMessage errors={errors} name={name} render={({ message }) => <p className="mt-1 text-sm text-red-600">{message}</p>} />
    </div>
  );
};
