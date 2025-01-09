import { LinkText } from '@/components/shared/LinkText';
import SignUpSteps from '@/components/forms/SignUpSteps';
import { SignUpFormStepProvider } from '@/context/sign-up/use-sign-up-steps-context';

export default function SignUpPage() {
  return (
    <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white rounded-l-3xl">
      <div className="w-full max-w-md space-y-8">
        <SignUpFormStepProvider>
          <SignUpSteps />
        </SignUpFormStepProvider>
        <LinkText link="/auth/signin" linkText="Sign in here" preLinkText="Already have an account?" />
      </div>
    </div>
  );
}
