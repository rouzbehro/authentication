import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField } from '../form/fields/InputField';
import FormHeader from './FormHeader';
import CTAButton from '../shared/CTAButton';

function ForgotPasswordForm() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <>
      <FormHeader title="Forgot Your Password?" subtitle="Enter your email to reset your password" />

      <InputField name="email" label="Email" placeholder="Enter your email" type="email" register={register} errors={errors} />

      <div className="mt-4" id="clerk-captcha"></div>

      <CTAButton loadingText="Recovering password ..." isLoading={isSubmitting}>
        Recover Password
      </CTAButton>
    </>
  );
}

export default ForgotPasswordForm;
