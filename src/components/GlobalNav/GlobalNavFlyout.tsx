// File: components/GlobalNav/GlobalNavFlyout.tsx
'use client'; // Ensure this is a client component

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavLink } from '@/lib/staticNavLinks';
import { useRef, useEffect } from 'react'; // Import useRef and useEffect

interface GlobalNavFlyoutProps {
  navItem: NavLink;
  isOpen: boolean;
  onClose: () => void;
  // New prop to pass the ref from the parent for height calculation
  contentRef: React.RefObject<HTMLDivElement>;
}

/**
 * GlobalNavFlyout Component
 * Renders the detailed mega menu content for a given navigation item.
 * It displays columns of links, with some links being "elevated" (larger font).
 * Handles transitions for opening and closing using dynamic height.
 */
export default function GlobalNavFlyout({
  navItem,
  isOpen,
  onClose,
  contentRef,
}: GlobalNavFlyoutProps) {
  // The navItem.flyoutContent check is crucial here
  if (!navItem.flyoutContent) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute left-0 right-0 top-full z-30 overflow-hidden',
        'bg-white/90 dark:bg-black/90 backdrop-blur-lg', // Semi-transparent background with blur
        'transition-all duration-300 ease-in-out', // Changed to transition-all
        {
          'max-h-0 opacity-0 invisible': !isOpen, // Use max-h for transition
          'max-h-[var(--flyout-height)] opacity-100 visible': isOpen, // Height will be set by JS
        },
      )}
      aria-hidden={!isOpen} // Hide from accessibility tree when not open
    >
      {/* Attach contentRef to the inner div that contains the actual scrollable content */}
      <div
        ref={contentRef}
        className="container mx-auto max-w-5xl py-12 px-4 flex flex-wrap justify-start gap-x-16 gap-y-8"
      >
        {navItem.flyoutContent.map((column, colIndex) => (
          <div
            key={colIndex}
            className={cn(
              'flex flex-col',
              {
                'w-full sm:w-1/2 lg:w-1/4': !column.elevated, // Smaller columns
                'w-full sm:w-1/2 lg:w-1/2': column.elevated, // Larger columns
              },
              'transition-all duration-300 ease-in-out', // Changed to transition-all
              {
                'opacity-0 translate-y-2': !isOpen,
                'opacity-100 translate-y-0': isOpen,
              },
            )}
            style={{
              // Use non-null assertion for navItem.flyoutContent.length as it's checked above
              transitionDelay: isOpen
                ? `${colIndex * 0.05}s`
                : `${(navItem.flyoutContent!.length - 1 - colIndex) * 0.03}s`,
            }}
          >
            <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
              {column.header}
            </h3>
            <ul className="list-none p-0 m-0">
              {column.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-1 last:mb-0">
                  <Link
                    href={item.href}
                    className={cn(
                      'block py-1 px-2 -mx-2 rounded-md',
                      'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                      {
                        'text-lg font-bold text-gray-900 dark:text-white':
                          column.elevated,
                        'text-sm': !column.elevated,
                      },
                    )}
                    onClick={onClose} // Close menu on link click
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// File: components/GlobalNav/GlobalNavFlyout.tsx
