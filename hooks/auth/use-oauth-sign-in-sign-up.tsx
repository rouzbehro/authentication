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

  const signInWith = async (strategy: OAuthStrategy) => {
    alert('sign in called');
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

  const signUpWith = async (strategy: OAuthStrategy) => {
    alert('sign up called');
    try {
      await signUp.authenticateWithRedirect({
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

  const handleOAuthSignInSignUp = async (strategy: OAuthStrategy) => {
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

      try {
        await signInWith(strategy);
      } catch (signInError) {
        await signUpWith(strategy);
      }
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

  return { signInWith, signUpWith, handleOAuthSignInSignUp };
};
