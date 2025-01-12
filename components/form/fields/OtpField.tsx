import React from 'react';
import { FieldValues } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

interface OtpFieldProps {
  register: ReturnType<typeof import('react-hook-form').useForm>['register'];
  setValue: ReturnType<typeof import('react-hook-form').useForm>['setValue']; // Use setValue from form context
  name: string;
  label?: string;
  errors: FieldValues['errors'];
}

const OtpField: React.FC<OtpFieldProps> = ({ register, name, label, errors, setValue }) => {
  const handleChange = (value: string) => {
    setValue(name, value, { shouldValidate: true });
  };

  return (
    <FormItem>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <FormControl>
        <InputOTP maxLength={6} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </FormControl>
      <ErrorMessage errors={errors} name={name} render={({ message }) => <FormMessage>{message}</FormMessage>} />
    </FormItem>
  );
};

export default OtpField;
