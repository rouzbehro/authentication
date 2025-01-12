'use server';

import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';

export async function getUser() {
  // Fetch the current user from Clerk
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in'); // Redirect if the user is not logged in
  }

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

    return {
      status: 200,
      user: authenticatedUser,
    };
  } catch (error: any) {
    console.error('Error fetching user:', error);

    return {
      status: 500,
      message: 'An error occurred while fetching the user.',
      error: error.message || 'Unknown error',
    };
  }
}
