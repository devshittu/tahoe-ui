// src/components/Navigation/Pagination.tsx
'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';

/**
 * Pagination - Page navigation component
 *
 * Reference: design-principles.md
 * - #9 Obvious Affordances: 44px touch targets
 * - #12 Accessibility: ARIA labels, keyboard navigation
 */

export type PaginationVariant = 'simple' | 'numbered' | 'compact';
export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps {
  /** Total number of items */
  total: number;
  /** Items per page */
  pageSize: number;
  /** Current page (1-indexed) */
  currentPage: number;
  /** Page change handler */
  onChange: (page: number) => void;
  /** Visual variant */
  variant?: PaginationVariant;
  /** Size preset */
  size?: PaginationSize;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  /** Number of visible page siblings */
  siblings?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

const sizeClasses: Record<PaginationSize, { button: string; icon: string }> = {
  sm: {
    button: 'h-8 min-w-8 px-2 text-sm',
    icon: 'w-4 h-4',
  },
  md: {
    button: 'h-10 min-w-10 px-3 text-base',
    icon: 'w-5 h-5',
  },
  lg: {
    button: 'h-12 min-w-12 px-4 text-lg',
    icon: 'w-5 h-5',
  },
};

function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
}

export function Pagination({
  total,
  pageSize,
  currentPage,
  onChange,
  variant = 'numbered',
  size = 'md',
  showFirstLast = true,
  siblings = 1,
  disabled = false,
  className,
}: PaginationProps) {
  const sizes = sizeClasses[size];
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Ensure current page is within bounds
  const page = Math.max(1, Math.min(currentPage, totalPages));

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    if (variant === 'simple' || variant === 'compact') {
      return [];
    }

    const totalDisplayed = siblings * 2 + 3; // siblings on each side + current + start/end
    const totalWithDots = totalDisplayed + 2; // space for dots

    // Show all pages if there aren't many
    if (totalPages <= totalWithDots) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(page - siblings, 1);
    const rightSiblingIndex = Math.min(page + siblings, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 3 + siblings * 2);
      return [...leftRange, 'dots-right', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPages - (2 + siblings * 2), totalPages);
      return [1, 'dots-left', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, 'dots-left', ...middleRange, 'dots-right', totalPages];
    }

    return range(1, totalPages);
  }, [page, totalPages, siblings, variant]);

  const handlePageChange = (newPage: number) => {
    if (
      !disabled &&
      newPage >= 1 &&
      newPage <= totalPages &&
      newPage !== page
    ) {
      onChange(newPage);
    }
  };

  const buttonBaseClasses = cn(
    'flex items-center justify-center rounded-lg font-medium transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 dark:focus-visible:ring-white/20',
    sizes.button,
    disabled && 'opacity-50 cursor-not-allowed',
  );

  const buttonClasses = (isActive = false, isNav = false) =>
    cn(
      buttonBaseClasses,
      isActive
        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
        : isNav
          ? 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    );

  const NavButton = ({
    direction,
    targetPage,
    icon,
    label,
  }: {
    direction: 'prev' | 'next' | 'first' | 'last';
    targetPage: number;
    icon: React.ReactNode;
    label: string;
  }) => {
    const isDisabled =
      disabled ||
      (direction === 'prev' && page <= 1) ||
      (direction === 'first' && page <= 1) ||
      (direction === 'next' && page >= totalPages) ||
      (direction === 'last' && page >= totalPages);

    return (
      <button
        type="button"
        onClick={() => handlePageChange(targetPage)}
        disabled={isDisabled}
        aria-label={label}
        className={cn(
          buttonClasses(false, true),
          isDisabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        {icon}
      </button>
    );
  };

  // Simple variant - just prev/next
  if (variant === 'simple') {
    return (
      <nav
        aria-label="Pagination"
        className={cn('flex items-center gap-2', className)}
      >
        <NavButton
          direction="prev"
          targetPage={page - 1}
          icon={<FiChevronLeft className={sizes.icon} />}
          label="Previous page"
        />
        <span className="px-3 text-sm text-gray-600 dark:text-gray-400">
          Page {page} of {totalPages}
        </span>
        <NavButton
          direction="next"
          targetPage={page + 1}
          icon={<FiChevronRight className={sizes.icon} />}
          label="Next page"
        />
      </nav>
    );
  }

  // Compact variant - prev/next with page input
  if (variant === 'compact') {
    return (
      <nav
        aria-label="Pagination"
        className={cn('flex items-center gap-2', className)}
      >
        <NavButton
          direction="prev"
          targetPage={page - 1}
          icon={<FiChevronLeft className={sizes.icon} />}
          label="Previous page"
        />
        <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) handlePageChange(val);
            }}
            disabled={disabled}
            className={cn(
              'w-14 text-center rounded-lg border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10',
              sizes.button,
            )}
            aria-label="Page number"
          />
          <span>of {totalPages}</span>
        </span>
        <NavButton
          direction="next"
          targetPage={page + 1}
          icon={<FiChevronRight className={sizes.icon} />}
          label="Next page"
        />
      </nav>
    );
  }

  // Numbered variant
  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center gap-1', className)}
    >
      {showFirstLast && (
        <NavButton
          direction="first"
          targetPage={1}
          icon={<FiChevronsLeft className={sizes.icon} />}
          label="First page"
        />
      )}

      <NavButton
        direction="prev"
        targetPage={page - 1}
        icon={<FiChevronLeft className={sizes.icon} />}
        label="Previous page"
      />

      {pageNumbers.map((pageNum, index) => {
        if (typeof pageNum === 'string') {
          return (
            <span
              key={pageNum}
              className={cn(
                'flex items-center justify-center text-gray-400 dark:text-gray-500',
                sizes.button,
              )}
              aria-hidden
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => handlePageChange(pageNum)}
            disabled={disabled}
            aria-current={page === pageNum ? 'page' : undefined}
            className={buttonClasses(page === pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      <NavButton
        direction="next"
        targetPage={page + 1}
        icon={<FiChevronRight className={sizes.icon} />}
        label="Next page"
      />

      {showFirstLast && (
        <NavButton
          direction="last"
          targetPage={totalPages}
          icon={<FiChevronsRight className={sizes.icon} />}
          label="Last page"
        />
      )}
    </nav>
  );
}

Pagination.displayName = 'Pagination';

export default Pagination;
