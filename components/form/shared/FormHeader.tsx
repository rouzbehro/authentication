import { H3, Paragraph, SmallText } from '@/components/shared/Typography';
import React from 'react';

const FormHeader = ({ title, subtitle, description }: { title: string; subtitle: string; description?: string }) => (
  <div className="text-center">
    <H3 className='mt-0'>{title}</H3>
    <SmallText>{subtitle}</SmallText>
    {description && <Paragraph>{description}</Paragraph>}
  </div>
);

export default FormHeader;
