// packages/wizard/src/utils.ts

import { twMerge } from 'tailwind-merge';

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

/**
 * Combines class names and merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    }
  }

  return twMerge(classes.join(' '));
}
