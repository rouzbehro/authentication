import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FileUploadFieldProps {
  register: ReturnType<typeof useForm>['register'];
  name: string;
  label: string;
  className?: string;
  errors: FieldValues['errors'];
}

export const FileUpload: React.FC<FileUploadFieldProps> = ({ register, name, label, className, errors }) => {
  return (
    <FormItem className={className}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <FormControl>
        <Input id={name} type="file" {...register(name)} accept="image/jpeg, image/png, image/gif" />
      </FormControl>
      <ErrorMessage errors={errors} name={name} render={({ message }) => <FormMessage>{message}</FormMessage>} />
    </FormItem>
  );
};
