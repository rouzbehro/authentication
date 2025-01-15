'use server';

import { onboardingSchema } from '@/validation/schemas/onboardingSchema';
import { prisma } from '../../lib/prisma';

export async function updateUser(clerkId: string, rawData: unknown) {
  try {
    // Validate input data using the schema
    const data = onboardingSchema.parse(rawData);

    // Fetch the current user data
    const currentUser = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        company: true,
        team: true,
      },
    });

    if (!currentUser) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    // Extract company and user-related fields
    const { companyName, companyAddress, companyEmail, companyPhone, companyLogo, accountType, ...userData } = data;

    let companyId = currentUser.companyId;
    let teamId = currentUser.teamId;

    // Check if the user has a TEAM account
    if (accountType === 'Team') {
      // Handle company creation if no company exists
      if (!companyId) {
        const newCompany = await prisma.company.create({
          data: {
            name: companyName || 'Default Company Name', // Fallback name if not provided
            address: companyAddress,
            email: companyEmail,
            phone: companyPhone,
            logo: companyLogo,
            ownerId: currentUser.id, // Set the user as the owner of the company
          },
        });
        companyId = newCompany.id;
      }

      // Handle team creation if no team exists
      if (!teamId) {
        const newTeam = await prisma.team.create({
          data: {
            ownerId: currentUser.id, // Set the user as the owner of the team
          },
        });
        teamId = newTeam.id;
      }

      // Add the user to the company and the team if not already associated
      await prisma.user.update({
        where: { clerkId },
        data: {
          companyId,
          teamId,
        },
      });
    }

    // Update the user with provided data, companyId, and teamId
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: {
        ...userData, // All user fields from the form
        companyId, // Associated company ID
        teamId, // Associated team ID
      },
    });

    return {
      status: 200,
      message: 'User updated successfully',
      user: updatedUser,
    };
  } catch (error: any) {
    console.error('Validation or update error:', error);
    return {
      status: 500,
      message: 'Failed to update user',
      error: error.message || 'Unknown error',
    };
  }
}
