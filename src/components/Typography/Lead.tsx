// app/components/Lead.tsx
'use client';

import React, { ReactNode } from 'react';
import Paragraph from './Paragraph';

type LeadProps = {
  children: ReactNode;
  className?: string;
};

const Lead = ({ children, className = '' }: LeadProps) => {
  return (
    <Paragraph
      fontWeight="bold"
      className={`text-lg md:text-xl ${className}`}
      margin="my-4"
    >
      {children}
    </Paragraph>
  );
};

export default Lead;
