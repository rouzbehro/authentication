'use server';

import { prisma } from '../../lib/prisma';

export async function updateUser(
  clerkId: string,
  data: {
    title?: string;
    interests?: string[];
    accountType?: 'INDIVIDUAL' | 'TEAM';
    location?: string[];
    companyId?: string;
    teamId?: string;
  }
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
