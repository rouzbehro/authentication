import React from 'react';
import { FieldValues } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

interface OtpFieldProps {
  register: ReturnType<typeof import('react-hook-form').useForm>['register'];
  name: string;
  errors: FieldValues['errors'];
}

const OtpField: React.FC<OtpFieldProps> = ({ register, name, errors }) => (
  <FormItem>
    <FormControl>
      <InputOTP
        maxLength={6}
        {...register(name)}
        onChange={(otp) => {
          const event = { target: { value: otp } }; // Simulate an event for React Hook Form
          register(name).onChange(event);
        }}
      >
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

export default OtpField;
