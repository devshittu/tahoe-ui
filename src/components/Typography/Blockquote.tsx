// app/components/Blockquote.tsx
// src/components/Typography/Blockquote.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type BlockquoteProps = {
  children: ReactNode;
  cite?: string;
  borderColor?: string;
  className?: string;
};

const Blockquote = ({
  children,
  cite,
  borderColor = 'border-gray-300',
  className = '',
}: BlockquoteProps) => {
  return (
    <blockquote
      className={`border-l-4 ${borderColor} pl-4 italic ${className}`}
    >
      <Text>{children}</Text>
      {cite && <footer className="mt-2 text-sm text-gray-500">— {cite}</footer>}
    </blockquote>
  );
};

export default Blockquote;
