import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface PasswordFieldProps {
  register: ReturnType<typeof import('react-hook-form').useForm>['register'];
  name: string;
  label: string;
  placeholder: string;
  className?: string;
  errors: FieldValues['errors'];
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ register, name, label, placeholder, className, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem className={className}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <div className="relative">
        <FormControl>
          <Input id={name} type={showPassword ? 'text' : 'password'} placeholder={placeholder} {...register(name)} />
        </FormControl>
        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOffIcon className="h-5 w-5 text-muted-foreground" /> : <EyeIcon className="h-5 w-5 text-muted-foreground" />}
        </button>
      </div>
      <ErrorMessage errors={errors} name={name} render={({ message }) => <FormMessage>{message}</FormMessage>} />
    </FormItem>
  );
};
