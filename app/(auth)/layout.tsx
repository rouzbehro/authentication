import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

const Layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const user = await currentUser();

  if (user) redirect('/');

  return (
    <div className="flex flex-col min-h-screen md:flex-row ">
      <div className="w-full md:w-1/2 h-32 md:h-screen relative">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Sign up visual" layout="fill" objectFit="cover" priority />
      </div>
      {children}
    </div>
  );
};

export default Layout;
