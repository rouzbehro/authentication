import { getUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await getUser();
  console.log(user)
  if (!user?.user?.isOnboarded) redirect('/onboarding');

  return <div>{children}</div>;
};

export default Layout;
