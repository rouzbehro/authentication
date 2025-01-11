'use client';

import { useSignIn } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import { useToast } from '../use-toast';

export const useOAuthSignIn = (defaultRedirectUrl: string, completeRedirectUrl: string) => {
  const { signIn } = useSignIn();
  const { toast } = useToast();

  if (!signIn) {
    return null;
  }

  const signInWithOAuth = async (strategy: OAuthStrategy) => {
    try {
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

  return { signInWithOAuth };
};
