import React from 'react';
import Link from 'next/link';

interface LinkTextProps {
  link: string;
  linkText: string;
  preLinkText?: string;
  isBold?: boolean;
  align?: 'text-left' | 'text-right' | 'text-center';
  className?: string;
}

export const LinkText: React.FC<LinkTextProps> = ({ link, linkText, preLinkText, isBold = true, align = 'text-center', className }) => {
  return (
    <p className={`mt-10 text-sm text-muted-foreground  ${align} ${className || ''}`}>
      {preLinkText && `${preLinkText} `}
      <Link href={link} className={`leading-6 hover:underline text-black ${isBold ? 'font-semibold' : ''}`}>
        {linkText}
      </Link>
    </p>
  );
};
