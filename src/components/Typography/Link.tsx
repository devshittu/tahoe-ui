// src/components/Typography/Link.tsx
'use client';

import React, { ReactNode } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean; // If true, opens in new tab
  underline?: boolean;
  ariaLabel?: string;
};

/**
 * A Next.js link wrapper for consistent styling and accessibility.
 */
const Link = ({
  href,
  children,
  className,
  external = false,
  underline = true,
  ariaLabel,
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={clsx(
        underline ? 'underline' : 'no-underline',
        'text-blue-600 dark:text-blue-400',
        'hover:opacity-80 transition-opacity',
        className
      )}
    >
      {children}
    </NextLink>
  );
};

export default Link;