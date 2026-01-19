'use client';

import React, { forwardRef } from 'react';
import { cn } from '@tahoe-ui/core';
import type { LinkProps } from './types';
import { linkVariantClasses, textDecorationClasses } from './classes';

/**
 * Link - Anchor link component
 *
 * Styled anchor link with consistent styling and accessibility.
 * For Next.js routing, wrap this in Next/Link or use the href directly.
 *
 * @example
 * ```tsx
 * <Link href="/about">About Us</Link>
 * <Link href="https://example.com" external>External Site</Link>
 * <Link href="/contact" variant="muted" underline={false}>Contact</Link>
 * ```
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
      <a
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
      </a>
    );
  },
);

Link.displayName = 'Link';

export { Link };
export default Link;
