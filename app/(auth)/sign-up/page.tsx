import SignUpForms from '@/components/forms/SignUpForms';
import { LinkText } from '@/components/shared/LinkText';

import { SignUpFormContextProvider } from '@/context/sign-up/use-sign-up-steps-context';

export default function SignUpPage() {
  return (
    <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white rounded-l-3xl">
      <div className="w-full max-w-md space-y-8">
        <SignUpFormContextProvider>
          <SignUpForms />
        </SignUpFormContextProvider>
        <LinkText link="/auth/signin" linkText="Sign in here" preLinkText="Already have an account?" />
      </div>
    </div>
  );
}
