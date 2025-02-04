import { getUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const userResponse = await getUser();

  if (userResponse?.status !== 200 || !userResponse?.user) {
    // Redirect if there's an error or the user isn't fetched
    redirect('/sign-in');
    return null; // Prevent rendering
  }

  const user = userResponse.user;

  if (!user.isOnboarded) {
    redirect('/onboarding');
    return null; // Prevent rendering
  }

  return <div>{children}</div>;
};

export default Layout;
