'use client';

import React, { useState, useRef, useEffect, forwardRef, memo } from 'react';
import { cn } from '@tahoe-ui/core';
import { Button } from './Button';
import type { DropdownButtonProps } from './types';

/**
 * ChevronDown icon component
 */
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * DropdownButton Component
 *
 * A button with an attached dropdown menu.
 * Menu items are rendered when the button is clicked.
 *
 * @example
 * ```tsx
 * import { DropdownButton } from '@tahoe-ui/button';
 *
 * <DropdownButton
 *   menuItems={[
 *     { label: 'Edit', onClick: () => console.log('Edit') },
 *     { label: 'Delete', onClick: () => console.log('Delete') },
 *   ]}
 * >
 *   Actions
 * </DropdownButton>
 * ```
 */
const DropdownButton = forwardRef<HTMLButtonElement, DropdownButtonProps>(
  ({ menuItems, children, className = '', ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <Button
          ref={ref}
          onClick={toggleDropdown}
          className={className}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          {...rest}
        >
          {children}
          <ChevronDownIcon
            className={cn(
              'ml-2 transition-transform duration-150',
              isOpen && 'rotate-180',
            )}
          />
        </Button>

        {isOpen && (
          <div
            className={cn(
              'absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50',
              'dark:bg-gray-800 dark:border-gray-700',
            )}
            role="menu"
            aria-orientation="vertical"
          >
            <ul className="py-1">
              {menuItems.map((item, index) => (
                <li key={index} role="none">
                  <button
                    onClick={() => {
                      item.onClick();
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm',
                      'text-gray-700 hover:bg-gray-100',
                      'dark:text-gray-200 dark:hover:bg-gray-700',
                      'focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700',
                    )}
                    role="menuitem"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);

DropdownButton.displayName = 'DropdownButton';

export default memo(DropdownButton);
export { DropdownButton };
