'use server';

import { onboardingSchema } from '@/validation/schemas/onboardingSchema';
import { prisma } from '../../lib/prisma';

export async function onboardUser(clerkId: string, rawData: unknown) {
  try {
    // Validate the input data using the schema with safeParse

    const parsed = onboardingSchema.safeParse(rawData);

    if (!parsed.success) {
      // Return validation errors if parsing fails
      return {
        status: 400,
        message: 'Validation error',
        errors: parsed.error.errors,
      };
    }

    const data = parsed.data;

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
    const { companyName, companyAddress, companyEmail, companyPhone, accountType, title, interests, location, howDidYouHear } = data;

    let companyId = currentUser.companyId;
    let teamId = currentUser.teamId;

    // Onboarding logic for Team account type
    if (accountType === 'TEAM') {
      // Create or update the company
      if (!companyId) {
        const newCompany = await prisma.company.create({
          data: {
            name: companyName || '', // Fallback name if not provided
            address: companyAddress,
            email: companyEmail,
            phone: companyPhone,
            ownerId: currentUser.id, // Set the user as the owner of the company
          },
        });
        companyId = newCompany.id;
      } else {
        await prisma.company.update({
          where: { id: companyId },
          data: {
            name: companyName,
            address: companyAddress,
            email: companyEmail,
            phone: companyPhone,
          },
        });
      }

      // Create or update the team
      if (!teamId) {
        const newTeam = await prisma.team.create({
          data: {
            ownerId: currentUser.id, // Set the user as the owner of the team
          },
        });
        teamId = newTeam.id;
      }
    }

    // Update user data, linking them to the company and team if applicable
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: {
        accountType,
        companyId,
        interests,
        isOnboarded: true,
        teamId,
        title,
        location: location ? [location] : undefined,
        howDidYouHear,
      },
    });

    return {
      status: 200,
      message: 'User onboarded successfully',
      user: updatedUser,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || 'An error occurred while fetching the user.',
    };
  }
}
