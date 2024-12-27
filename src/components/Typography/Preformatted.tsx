// src/components/Typography/Preformatted.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Code from './Code';

type PreformattedProps = {
  children: ReactNode;
  language?: string;
  theme?: 'default' | 'tomorrow' | 'custom';
  showLineNumbers?: boolean;
  className?: string;
  wrapLines?: boolean;
  ariaLabel?: string;
} & React.HTMLAttributes<HTMLElement>;

const Preformatted = ({
  children,
  language = 'javascript',
  theme = 'default',
  showLineNumbers = false,
  className,
  wrapLines = false,
  ariaLabel,
  ...props
}: PreformattedProps) => {
  return (
    <Code
      language={language}
      theme={theme}
      showLineNumbers={showLineNumbers}
      wrapLines={wrapLines}
      className={clsx('rounded-md p-4 bg-gray-50', className)}
      ariaLabel={ariaLabel}
      {...props}
    >
      {children}
    </Code>
  );
};

export default Preformatted;
