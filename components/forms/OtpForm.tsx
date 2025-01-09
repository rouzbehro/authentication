import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp';
import { H3, SmallText } from '@/components/shared/Typography';
import { useForm } from 'react-hook-form';
import { otpSchema } from '@/app/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form } from '@/components/ui/form';

const OtpForm = () => {
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {};
  return (
    <>
      <div className="text-center">
        <H3>Verify Your Email Address</H3>
        <SmallText>Enter the 6-digit code sent to your email.</SmallText>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mb-4">
            <InputOTP maxLength={6}>
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
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            Verify Email Address
          </Button>
        </form>
      </Form>
    </>
  );
};

export default OtpForm;
