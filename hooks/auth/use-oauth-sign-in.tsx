'use client';

import { useSignIn, useSignUp } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import { useToast } from '../use-toast';

export const useOAuthSignIn = (defaultRedirectUrl: string, completeRedirectUrl: string) => {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const { toast } = useToast();

  // Read redirect URLs from environment variables
  const redirectUrl = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL || '/sign-up/sso-callback';
  const redirectUrlComplete = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_COMPLETE || '/';

  if (!signIn || !signUp) {
    return null;
  }

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
      } else {
        // If the user has an account in your application
        // and has an OAuth account connected to it, you can sign them in.
        signInWith(strategy);
      }

      // Default case: Authenticate with redirect
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: defaultRedirectUrl,
        redirectUrlComplete: completeRedirectUrl,
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

  return { handleOAuthSignIn };
};
