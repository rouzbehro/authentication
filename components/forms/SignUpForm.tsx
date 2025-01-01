'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Separator from '../shared/Separator';
import { AuthButton } from '../auth/AuthButton';
import { signUpSchema } from '@/app/validation';
import { InputField } from '../form/fields/InputField';
import { PasswordField } from '../form/fields/PasswordField';

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log('Form submitted successfully:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <InputField control={form.control} name="email" label="Email" placeholder="Enter your email" type="email" />
          <div className="flex gap-4">
            <InputField
              control={form.control}
              className="flex-1"
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              type="text"
            />
            <InputField
              control={form.control}
              className="flex-1"
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              type="text"
            />
          </div>
          <PasswordField control={form.control} name="password" label="Password" placeholder="Enter your password" />
        </div>

        <Button type="submit" className="w-full mt-4">
          Sign up
        </Button>

        <Separator>Or continue with</Separator>
        <div className="space-y-2 mt-4">
          <AuthButton provider="google" text="Sign up with Google" />
          <AuthButton provider="apple" text="Sign up with Apple" />
        </div>
      </form>
    </Form>
  );
}

export default SignUpForm;
