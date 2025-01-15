import { getUser } from '@/actions/user';
import { SignOutButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardPage = async () => {
  return (
    <div>
      DashboardPage
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
