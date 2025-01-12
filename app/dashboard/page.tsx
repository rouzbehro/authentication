import { getUser } from '@/actions/user';
import { SignOutButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardPage = async () => {
  const user = await getUser();

  if (!user?.user?.isOnboarded) redirect('/dashboard/onboarding');

  console.log(user?.user?.isOnboarded);

  return (
    <div>
      DashboardPage
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
