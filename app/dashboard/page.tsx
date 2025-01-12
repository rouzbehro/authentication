import { getUser } from '@/actions/user';
import { SignOutButton } from '@clerk/nextjs';
import React from 'react';

const DashboardPage = async () => {
  const user = await getUser();
  console.log(user);
  return (
    <div>
      DashboardPage
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
