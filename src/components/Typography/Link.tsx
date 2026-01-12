'use client';

import React, { forwardRef } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import type { LinkProps } from './typography.types';
import {
  linkVariantClasses,
  textDecorationClasses,
} from './typography.classes';

/**
 * Link component for navigation with consistent styling and accessibility.
 * Wraps Next.js Link with proper external link handling.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      children,
      className,
      external = false,
      underline = true,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const externalProps = external
      ? { target: '_blank' as const, rel: 'noopener noreferrer' }
      : {};

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(
          linkVariantClasses[variant],
          underline
            ? textDecorationClasses.underline
            : textDecorationClasses.none,
          'transition-opacity',
          className,
        )}
        {...externalProps}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);

Link.displayName = 'Link';
export default Link;
export type { LinkProps };
