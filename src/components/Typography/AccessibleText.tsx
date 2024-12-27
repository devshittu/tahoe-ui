// app/components/AccessibleText.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type AccessibleTextProps = {
  children: ReactNode;
  ariaLabel?: string;
  role?: string;
  tabIndex?: number;
  focusable?: boolean;
  className?: string;
};

const AccessibleText = ({
  children,
  ariaLabel,
  role,
  tabIndex,
  focusable = false,
  className = '',
}: AccessibleTextProps) => {
  return (
    <Text
      aria-label={ariaLabel}
      role={role}
      tabIndex={focusable ? 0 : undefined}
      className={className}
    >
      {children}
    </Text>
  );
};

export default AccessibleText;
