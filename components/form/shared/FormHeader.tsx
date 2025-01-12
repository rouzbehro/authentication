import { H3, SmallText } from '@/components/shared/Typography';
import React from 'react';

const FormHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center">
    <H3>{title}</H3>
    <SmallText>{subtitle}</SmallText>
  </div>
);

export default FormHeader;
