'use server';

import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { createUserFromClerk } from './createUser';

export async function getUser() {
  try {
    // Fetch the current user from Clerk
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return {
        status: 401,
        message: 'User not logged in.',
      };
    }

    // Check if the user exists in the database
    let authenticatedUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      select: {
        id: true,
        firstName: true,
        clerkId: true,
        isOnboarded: true,
        accountType: true,
      },
    });

    // If the user does not exist, create them
    if (!authenticatedUser) {
      const result = await createUserFromClerk(clerkUser);

      if (result.status !== 200) {
        throw new Error(result.message);
      }

      if (result.user) {
        authenticatedUser = result.user;
      } else {
        throw new Error('User creation failed.');
      }
    }

    return {
      status: 200,
      user: authenticatedUser,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || 'Unknown error occurred.',
    };
  }
}
