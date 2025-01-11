'use server';

import { prisma } from '../../lib/prisma';

export async function createUser(data: { firstName: string; lastName: string; email: string; clerkId: string; oAuthType?: string }) {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        clerkId: data.clerkId,
        oAuthType: data.oAuthType || null,
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
