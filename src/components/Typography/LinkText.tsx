// app/components/LinkText.tsx
'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Text from './Text';

type LinkTextProps = {
  href: string;
  children: ReactNode;
  underline?: boolean;
  hoverEffect?: 'underline' | 'none' | 'color-change';
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  className?: string;
};

const hoverEffectClasses: Record<NonNullable<LinkTextProps['hoverEffect']>, string> = {
  underline: 'hover:underline',
  'color-change': 'hover:text-red-500',
  none: '',
};

const LinkText = ({
  href,
  children,
  underline = true,
  hoverEffect = 'underline',
  target = '_self',
  rel = '',
  className = '',
}: LinkTextProps) => {
  return (
    <Link href={href} target={target} rel={rel} className={className}>
      <Text
        color="accent"
        textDecoration={underline ? 'underline' : 'none'}
        className={hoverEffectClasses[hoverEffect]}
      >
        {children}
      </Text>
    </Link>
  );
};

export default LinkText;