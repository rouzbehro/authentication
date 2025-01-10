import React from 'react';
import OtpField from '../form/fields/OtpField';
import { useFormContext } from 'react-hook-form';
import FormHeader from './FormHeader';
import CTAButton from '../shared/CTAButton';

interface OtpFormProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

const OtpForm: React.FC<OtpFormProps> = ({
  title = 'Verify Your Email Address',
  subtitle = 'Enter the 6-digit code sent to your email.',
  buttonText = 'Verify Your Email Address',
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <>
      <FormHeader title={title} subtitle={subtitle} />
      <div className="flex justify-center pb-2">
        <OtpField name="otp" register={register} errors={errors} />
      </div>
      <CTAButton type="submit" isLoading={isSubmitting}>
        {buttonText}
      </CTAButton>
    </>
  );
};

export default OtpForm;
