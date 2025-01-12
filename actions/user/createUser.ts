'use server';

import { User } from '@clerk/nextjs/server';
import { prisma } from '../../lib/prisma';

// Function to create a user by directly passing user details
export async function createUserWithDetails(data: { firstName: string; lastName: string; email: string; clerkId: string }) {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        clerkId: data.clerkId,
      },
      select: {
        id: true,
      },
    });

    return {
      status: 200,
      message: 'User created successfully',
      user,
    };
  } catch (error) {
    return {
      status: 400,
      message: 'Failed to create user',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// Function to create a user using a Clerk user object
export async function createUserFromClerk(clerkUser: User) {
  try {
    const primaryEmail = clerkUser.emailAddresses?.find((email: any) => email.id === clerkUser.primaryEmailAddressId);

    if (!primaryEmail) {
      throw new Error('No primary email address found for the user');
    }

    const user = await prisma.user.create({
      data: {
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        email: primaryEmail.emailAddress || '',
        clerkId: clerkUser.id,
      },
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
      message: 'User created successfully',
      user,
    };
  } catch (error) {
    return {
      status: 400,
      message: 'Failed to create user',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
