import { H3, SmallText } from '@/components/shared/Typography';
import { LinkText } from '@/components/shared/LinkText';
import SignUpForm from '@/components/forms/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white rounded-l-3xl">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <H3>Create an account</H3>
          <SmallText>Sign up to get started</SmallText>
        </div>

        <SignUpForm />

        <LinkText link="/auth/signin" linkText="Sign in here" preLinkText="Already have an account?" />
      </div>
    </div>
  );
}
