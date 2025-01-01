import Image from 'next/image';
import SignUpForm from '@/components/SignUp/SignUpForm';
import { H3, SmallText } from '@/components/Typography/Typography';
import { LinkText } from '@/components/LinkText/LinkText';

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-64 md:h-screen relative">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Sign up visual" layout="fill" objectFit="cover" priority />
      </div>

      {/* Sign Up Form Section */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <H3>Create an account</H3>
            <SmallText>Sign up to get started</SmallText>
          </div>

          <SignUpForm />

          <LinkText link="/auth/signin" linkText="Sign in here" preLinkText="Already have an account?" />
        </div>
      </div>
    </div>
  );
}
