import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface InputFieldProps {
  register: ReturnType<typeof useForm>['register'];
  name: string;
  label: string;
  placeholder: string;
  type: string;
  className?: string;
  errors: FieldValues['errors'];
}

export const InputField: React.FC<InputFieldProps> = ({ register, name, label, placeholder, type, className, errors }) => {
  return (
    <FormItem className={className}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <FormControl>
        <Input id={name} type={type} placeholder={placeholder} {...register(name)} />
      </FormControl>
      <ErrorMessage errors={errors} name={name} render={({ message }) => <FormMessage>{message}</FormMessage>} />
    </FormItem>
  );
};
