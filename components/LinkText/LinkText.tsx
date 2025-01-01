import React from 'react';
import Link from 'next/link';

interface LinkTextProps {
  link: string;
  linkText: string;
  preLinkText?: string;
  className?: string;
}

export const LinkText: React.FC<LinkTextProps> = ({ link, linkText, preLinkText, className }) => {
  return (
    <p className={`mt-10 text-center text-sm text-muted-foreground ${className || ''}`}>
      {preLinkText && `${preLinkText} `}
      <Link href={link} className="font-semibold leading-6 text-primary hover:underline text-black">
        {linkText}
      </Link>
    </p>
  );
};
