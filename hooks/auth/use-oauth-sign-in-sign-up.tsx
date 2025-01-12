'use client';

import { useSignIn, useSignUp } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import { useToast } from '../use-toast';

export const useOAuthSignInSignUp = () => {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const { toast } = useToast();

  const redirectUrl = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL || '/sign-up/sso-callback';
  const redirectUrlComplete = process.env.USER_PORTAL_URL || '/dashboard';

  if (!signIn || !signUp) {
    return null;
  }

  const handleAuthError = (error: unknown) => {
    if (error instanceof Error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  const authenticateWithRedirect = async (method: 'signIn' | 'signUp', strategy: OAuthStrategy) => {
    try {
      const authMethod = method === 'signIn' ? signIn : signUp;
      await authMethod.authenticateWithRedirect({
        strategy,
        redirectUrl,
        redirectUrlComplete,
      });
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signInWith = (strategy: OAuthStrategy) => authenticateWithRedirect('signIn', strategy);
  const signUpWith = (strategy: OAuthStrategy) => authenticateWithRedirect('signUp', strategy);

  return { signInWith, signUpWith };
};
