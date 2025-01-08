'use client';

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  MouseEvent,
  AnchorHTMLAttributes,
} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Additional variants that align with your brand or tailwind config. */
type LinkVariant = 'primary' | 'secondary' | 'neutral';

/**
 * Extending the built-in NextLinkProps
 * and partial AnchorHTMLAttributes to ensure
 * all Next.js Link functionalities remain exposed.
 */
export interface ExtendedLinkProps
  extends Omit<NextLinkProps, 'href' | 'as' | 'passHref'>,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** The link destination: can be an internal route or external URL */
  href: string;
  /** Force link to open as external even if it looks like an internal route */
  external?: boolean;
  /** Apply a class name if the link is active */
  activeClassName?: string;
  /** Predefined Tailwind variant styles for link text */
  variant?: LinkVariant;
}

/**
 * Utility function to determine if link is external.
 * Checks for protocols like 'https://', 'mailto:', etc.
 */
function isExternalLink(href: string): boolean {
  return /^(https?:\/\/|mailto:|tel:)/.test(href);
}

/**
 * The Foundational Link component for a Next.js modern app:
 * - Exposes full Next.js Link features (prefetch, replace, scroll, locale, etc.).
 * - Automatically detects external vs. internal link usage.
 * - Provides active state detection, custom variants, and advanced styling options.
 * - Highly optimized with memoization to avoid unnecessary re-renders.
 */
const Link = forwardRef<HTMLAnchorElement, ExtendedLinkProps>((props, ref) => {
  const {
    href,
    external,
    className = '',
    activeClassName = 'text-accent',
    variant = 'primary',
    prefetch = true, // next/link prop
    replace,
    scroll,
    shallow,
    locale,
    children,
    onClick,
    ...rest
  } = props;

  // For advanced route detection (active link), we can use Next 13's hooks:
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Example usage of a local ref for advanced DOM manipulation
  const localRef = useRef<HTMLAnchorElement>(null);

  /**
   * (Optional) If you need to manipulate or measure the link element
   * in some advanced scenario, you have `localRef`:
   */
  // useEffect(() => {
  //   if (localRef.current) {
  //     // Some advanced measuring or intersection observer code
  //   }
  // }, []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      // Perform additional side effects if needed
      if (onClick) onClick(event);
      // Possibly track analytics, log events, etc.
    },
    [onClick],
  );

  // Active detection: Compare pathname + searchParams to see if link is active
  const isActive = useMemo(() => {
    if (!pathname) return false;
    // For a more advanced approach, parse the URL and compare pathnames or query
    return (
      pathname === href || pathname + '?' + searchParams?.toString() === href
    );
  }, [pathname, searchParams, href]);

  // Create final className with variants, active states, etc.
  const finalClassName = useMemo(() => {
    // Basic variant styles mapped to your Tailwind config
    const variantStyles: Record<LinkVariant, string> = {
      primary: 'text-blue-500 hover:text-blue-600',
      secondary: 'text-secondary hover:text-primary',
      neutral: 'text-foreground hover:text-blue-400',
    };

    return twMerge(
      clsx(variantStyles[variant], { [activeClassName]: isActive }, className),
    );
  }, [variant, isActive, activeClassName, className]);

  // Check if link is forced external or inherently external
  const forceExternal = external || isExternalLink(href);

  // If external link: Render <a> with target, rel, and no Next.js routing
  if (forceExternal) {
    return (
      <a
        ref={ref || localRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={finalClassName}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Otherwise, render Next.js internal link
  return (
    <NextLink
      ref={ref || localRef}
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      className={finalClassName}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';

export default React.memo(Link);

// src/components/Link/Link.tsx
