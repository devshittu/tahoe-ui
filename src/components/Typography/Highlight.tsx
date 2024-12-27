// app/components/Highlight.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type HighlightProps = {
  children: ReactNode;
  bgColor?: string;
  textColor?: 'primary' | 'secondary' | 'accent' | string;
  padding?: string;
  className?: string;
};

const Highlight = ({
  children,
  bgColor = 'yellow-200',
  textColor = 'primary',
  padding = 'px-1',
  className = '',
}: HighlightProps) => {
  return (
    <Text
      background={bgColor}
      color={textColor}
      padding={padding}
      className={className}
    >
      {children}
    </Text>
  );
};

export default Highlight;
