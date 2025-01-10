import React from 'react';
import FormHeader from './FormHeader';
import CTAButton from '../shared/CTAButton';
import { useFormContext } from 'react-hook-form';
import { PasswordField } from '../form/fields/PasswordField';
import { InputField } from '../form/fields/InputField';

const ResetPasswordForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();
  return (
    <>
      <FormHeader title="Reset Your Password" subtitle="Enter your new password and confirm it" />

      <div className="flex flex-col justify-center space-y-4 pb-2 mb-4">
        <PasswordField name="password" label="New Password" placeholder="Enter your new password" register={register} errors={errors} />
        <InputField
          name="code"
          label="Verification Code"
          placeholder="Enter your verification code"
          type="text"
          register={register}
          errors={errors}
        />
      </div>

      <CTAButton type="submit" isLoading={isSubmitting}>
        Reset Password
      </CTAButton>
    </>
  );
};

export default ResetPasswordForm;
