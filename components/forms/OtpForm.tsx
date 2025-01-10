import React from 'react';
import OtpField from '../form/fields/OtpField';
import { useFormContext } from 'react-hook-form';
import { H3, SmallText } from '../shared/Typography';
import { Button } from '../ui/button';
import FormHeader from './FormHeader';

const OtpForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <>
      <FormHeader title="Verify Your Email Address" subtitle="Enter the 6-digit code sent to your email." />
      <div className="flex justify-center pb-2">
        <OtpField name="otp" register={register} errors={errors} />
      </div>
      <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
        Verify Your Email Address
      </Button>
    </>
  );
};

export default OtpForm;
