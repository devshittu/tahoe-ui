'use client';

import React, { useState, useRef, useEffect, forwardRef, memo } from 'react';
import { cn } from '@tahoe-ui/core';
import { Button } from './Button';
import type { ExpandableButtonProps } from './types';

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
 * ExpandableButton Component
 *
 * A button that reveals additional content when clicked.
 * The expanded content appears below the button.
 *
 * @example
 * ```tsx
 * import { ExpandableButton } from '@tahoe-ui/button';
 *
 * <ExpandableButton
 *   expandedContent={
 *     <div className="p-4">
 *       <p>Additional content here</p>
 *     </div>
 *   }
 * >
 *   Show More
 * </ExpandableButton>
 * ```
 */
const ExpandableButton = forwardRef<HTMLButtonElement, ExpandableButtonProps>(
  ({ expandedContent, children, className = '', ...rest }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleExpand = () => setIsExpanded((prev) => !prev);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className="relative inline-block text-left" ref={containerRef}>
        <Button
          ref={ref}
          onClick={toggleExpand}
          className={className}
          aria-expanded={isExpanded}
          {...rest}
        >
          {children}
          <ChevronDownIcon
            className={cn(
              'ml-2 transition-transform duration-150',
              isExpanded && 'rotate-180',
            )}
          />
        </Button>

        {isExpanded && (
          <div
            className={cn(
              'absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50',
              'dark:bg-gray-800 dark:border-gray-700',
            )}
          >
            <div className="py-2">{expandedContent}</div>
          </div>
        )}
      </div>
    );
  },
);

ExpandableButton.displayName = 'ExpandableButton';

export default memo(ExpandableButton);
export { ExpandableButton };
