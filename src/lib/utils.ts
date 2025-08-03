// lib/utils.ts

import clsx, { ClassValue } from 'clsx'; // Import ClassValue directly from 'clsx'
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind CSS classes, handling conflicts.
// This is a common pattern for creating flexible and maintainable component styles.
export function cn(...inputs: ClassValue[]) {
  // Use ClassValue directly
  return twMerge(clsx(inputs));
}
