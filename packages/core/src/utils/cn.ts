import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes, handling conflicts.
 * This is a common pattern for creating flexible and maintainable component styles.
 *
 * @example
 * ```tsx
 * import { cn } from '@tahoe-ui/core';
 *
 * cn('px-4 py-2', isActive && 'bg-blue-500', className)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
