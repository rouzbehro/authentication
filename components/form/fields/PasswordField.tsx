import React, { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  className?: string;
}

export const PasswordField = <T extends FieldValues>({ control, name, label, placeholder, className }: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input id={name} type={showPassword ? 'text' : 'password'} placeholder={placeholder} {...field} />
            </FormControl>
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon className="h-5 w-5 text-muted-foreground" /> : <EyeIcon className="h-5 w-5 text-muted-foreground" />}
            </button>
          </div>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
