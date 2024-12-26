// src/components/Typography/InlineCode.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';

type InlineCodeProps = {
  children: ReactNode;
  language?: string;
  className?: string;
  ariaLabel?: string;
} & React.HTMLAttributes<HTMLElement>;

const InlineCode = ({
  children,
  language = 'javascript',
  className,
  ariaLabel,
  ...props
}: InlineCodeProps) => {
  return (
    <code
      className={clsx(
        `px-1 py-0.5 rounded bg-gray-100 text-sm font-mono`,
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </code>
  );
};

export default InlineCode;