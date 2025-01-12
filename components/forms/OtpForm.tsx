import React from 'react';
import OtpField from '../form/fields/OtpField';
import { useFormContext } from 'react-hook-form';
import FormHeader from './FormHeader';
import CTAButton from '../shared/CTAButton';

const OtpForm = () => {
  const {
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <>
      <FormHeader title="Verify Your Email Address" subtitle="Enter the 6-digit code sent to your email." />
      <div className="flex justify-center pb-2">
        <OtpField name="otp" register={register} errors={errors} setValue={setValue} />
      </div>
      <CTAButton type="submit" isLoading={isSubmitting}>
        Verify Your Email Address
      </CTAButton>
    </>
  );
};

export default OtpForm;
