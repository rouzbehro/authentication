'use client';

import { useSignIn, useSignUp } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import { useToast } from '../use-toast';

export const useOAuthSignInSignUp = () => {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const { toast } = useToast();

  // Read redirect URLs from environment variables
  const redirectUrl = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL || '/sign-up/sso-callback';
  const redirectUrlComplete = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_COMPLETE || '/';

  if (!signIn || !signUp) {
    return null;
  }

  // Simple sign-in function
  const signInWith = async (strategy: OAuthStrategy) => {
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl,
        redirectUrlComplete,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      }
    }
  };

  // Advanced sign-in function with transferable account handling
  const handleOAuthSignIn = async (strategy: OAuthStrategy) => {
    try {
      // Check if the user exists but needs to sign in with an OAuth account
      const userExistsButNeedsToSignIn =
        signUp.verifications.externalAccount.status === 'transferable' &&
        signUp.verifications.externalAccount.error?.code === 'external_account_exists';

      if (userExistsButNeedsToSignIn) {
        const res = await signIn.create({ transfer: true });
        if (res.status === 'complete') {
          setActive({ session: res.createdSessionId });
          return;
        }
      }

      // Check if the user needs to be created using OAuth information
      const userNeedsToBeCreated = signIn.firstFactorVerification.status === 'transferable';

      if (userNeedsToBeCreated) {
        const res = await signUp.create({ transfer: true });
        if (res.status === 'complete') {
          setActive({ session: res.createdSessionId });
          return;
        }
      }

      // Default case: Authenticate with redirect
      await signInWith(strategy);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      }
    }
  };

  return { signInWith, handleOAuthSignIn };
};
