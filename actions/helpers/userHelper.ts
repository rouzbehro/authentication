import { User } from '@clerk/nextjs/server';

export function getPrimaryClerkEmail(clerkUser: User): string {
  const primaryEmail = clerkUser.emailAddresses?.find((email) => email.id === clerkUser.primaryEmailAddressId);
  if (!primaryEmail) {
    throw new Error('No primary email address found for the user');
  }
  return primaryEmail.emailAddress;
}
