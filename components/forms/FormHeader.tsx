import React from 'react';
import { H3, SmallText } from '../shared/Typography';

const FormHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center">
    <H3>{title}</H3>
    <SmallText>{subtitle}</SmallText>
  </div>
);

export default FormHeader;
