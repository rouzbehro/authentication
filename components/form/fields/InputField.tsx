import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type: string;
  className?: string;
}

export const InputField = <T extends FieldValues>({ control, name, label, placeholder, type, className }: InputFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <FormItem className={className}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <FormControl>
          <Input id={name} type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </FormItem>
    )}
  />
);
