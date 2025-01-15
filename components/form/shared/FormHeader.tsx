import { H3, Paragraph, SmallText } from '@/components/shared/Typography';
import { cn } from '@/lib/utils';
import React from 'react';

type FormHeaderProps = {
  title: string;
  subtitle: string;
  description?: string;
  className?: string;
};

const FormHeader = ({ title, subtitle, description, className }: FormHeaderProps) => (
  <div className={cn('text-center', className)}>
    <H3 className="mt-0">{title}</H3>
    <SmallText>{subtitle}</SmallText>
    {description && <Paragraph>{description}</Paragraph>}
  </div>
);

export default FormHeader;
