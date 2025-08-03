// File: components/GlobalNav/GlobalNavLink.tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { iconMap } from '@/lib/iconMap';
import React from 'react'; // Import React for React.MouseEvent

interface GlobalNavLinkProps {
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; // Updated to accept React.MouseEvent
  isMobileOpen?: boolean; // New prop for mobile menu state
}

/**
 * GlobalNavLink Component
 * Renders a single navigation link in the top bar.
 * This component now renders a <div> containing the Link,
 * to prevent <li> nesting errors when used inside another <li>.
 * Handles active states and provides a consistent styling.
 * Supports an optional icon (e.g., Apple logo, search, bag) by mapping a string to a React Icon component.
 */
export default function GlobalNavLink({
  label,
  href,
  icon,
  isActive = false,
  onClick,
  isMobileOpen = false,
}: GlobalNavLinkProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div // Changed from <li> to <div> to fix nesting error
      className={cn(
        'relative flex items-center h-full',
        'px-4 text-sm font-semibold text-gray-700 dark:text-gray-300',
        'transition-colors duration-200 ease-in-out',
        'hover:text-gray-900 dark:hover:text-white',
        'focus-within:text-gray-900 dark:focus-within:text-white',
        // Mobile specific styling
        'lg:h-auto lg:py-0', // Reset mobile height/padding on larger screens
        {
          'lg:opacity-0 lg:pointer-events-none':
            isMobileOpen &&
            label !== 'Apple' &&
            label !== 'Search' &&
            label !== 'Bag', // Hide non-core links on mobile when menu is open
          'lg:transition-opacity lg:duration-200': true, // Apply transition on mobile
        },
      )}
      role="none" // Presentational role for this div
    >
      <Link
        href={href}
        className={cn(
          'flex items-center justify-center h-full w-full',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm',
          {
            'text-gray-900 dark:text-white': isActive,
          },
        )}
        onClick={onClick}
        aria-label={label === 'Apple' ? 'Apple home' : label}
        role="menuitem" // ARIA role for menu item
      >
        {IconComponent && (
          <IconComponent
            size={label === 'Apple' ? 20 : 18}
            className={cn({ 'mr-2': label !== 'Apple' })}
          />
        )}
        {label !== 'Apple' && (
          <span className="globalnav-link-text">{label}</span>
        )}
      </Link>
    </div>
  );
}

// File: components/GlobalNav/GlobalNavLink.tsx
