'use server';

import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';

export async function getUser(clerkId: string) {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  try {
    const authenticatedUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: {
        id: true,
        firstName: true,
        clerkId: true,
        isOnboarded: true,
        accountType: true,
      },
    });

    if (!authenticatedUser?.accountType) {
      redirect('/onboarding'); // Redirect to onboarding if user not on-boarded
    }

    if (authenticatedUser) {
      return { status: 200, user: authenticatedUser };
    }
    return user;
  } catch (error) {
    return { status: 400 };
  }
}
