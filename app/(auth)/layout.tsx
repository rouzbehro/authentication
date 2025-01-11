import React from 'react';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

const Layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const user = await currentUser();

  if (user) redirect('/');

  return <div className="flex flex-col min-h-screen md:flex-row ">{children}</div>;
};

export default Layout;
