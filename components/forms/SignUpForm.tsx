import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField } from '../form/fields/InputField';
import { PasswordField } from '../form/fields/PasswordField';
import { Button } from '../ui/button';
import Separator from '../shared/Separator';
import { AuthButton } from '../auth/AuthButton';
import FormHeader from './FormHeader';

function SignUpForm() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <>
      <FormHeader title="Create an account" subtitle="Sign up to get started" />
      <div className="space-y-4">
        <InputField name="email" label="Email" placeholder="Enter your email" type="email" register={register} errors={errors} />
        <div className="flex gap-4">
          <InputField
            name="firstName"
            className="flex-1"
            label="First Name"
            placeholder="Enter your first name"
            type="text"
            register={register}
            errors={errors}
          />
          <InputField
            name="lastName"
            className="flex-1"
            label="Last Name"
            placeholder="Enter your last name"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <PasswordField name="password" label="Password" placeholder="Enter your password" register={register} errors={errors} />
      </div>
      <div className="mt-4" id="clerk-captcha"></div>

      <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
        Sign up
      </Button>

      <Separator>Or continue with</Separator>

      <div className="space-y-2 mt-4">
        <AuthButton provider="google" text="Sign up with Google" disabled={isSubmitting} />
        <AuthButton provider="apple" text="Sign up with Apple" disabled={isSubmitting} />
      </div>
    </>
  );
}

export default SignUpForm;
