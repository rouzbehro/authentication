import React, { FC } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

// Heading Components
export const H1: FC<TypographyProps> = ({ children, className, ...props }) => (
  <h1 className={cn('text-5xl font-extrabold tracking-tight mt-6', className)} {...props}>
    {children}
  </h1>
);

export const H2: FC<TypographyProps> = ({ children, className, ...props }) => (
  <h2 className={cn('text-4xl font-bold tracking-tight mt-6', className)} {...props}>
    {children}
  </h2>
);

export const H3: FC<TypographyProps> = ({ children, className, ...props }) => (
  <h3 className={cn('text-3xl font-semibold tracking-tight mt-6', className)} {...props}>
    {children}
  </h3>
);

export const H4: FC<TypographyProps> = ({ children, className, ...props }) => (
  <h4 className={cn('text-2xl font-medium tracking-tight mt-4', className)} {...props}>
    {children}
  </h4>
);

export const H5: FC<TypographyProps> = ({ children, className, ...props }) => (
  <h5 className={cn('text-xl font-medium tracking-tight mt-4', className)} {...props}>
    {children}
  </h5>
);

export const Paragraph: FC<TypographyProps> = ({ children, className, ...props }) => (
  <p className={cn('text-base leading-relaxed mt-2', className)} {...props}>
    {children}
  </p>
);

export const SmallText: FC<TypographyProps> = ({ children, className, ...props }) => (
  <p className={cn('text-sm text-muted-foreground mt-2', className)} {...props}>
    {children}
  </p>
);
