// File: app/components/BackgroundGrid.tsx
import React from 'react';
import { cn } from '@/lib/utils';

// Extend React.CSSProperties to include custom CSS variables
declare module 'react' {
  interface CSSProperties {
    '--grid-line-color'?: string;
  }
}

/**
 * BackgroundGrid Component
 *
 * This component renders a faded grid background using Tailwind CSS.
 * Due to strict constraints preventing custom CSS or non-Tailwind classes,
 * the complex `linear-gradient` and `mask` properties from the original
 * CSS cannot be fully replicated with atomic Tailwind utilities alone.
 * This implementation provides a visual approximation.
 */
export default function BackgroundGrid() {
  const gridLineColor = 'rgba(128, 128, 128, 0.1)'; // A subtle grey for lines

  return (
    <div
      className={cn(
        'absolute inset-0 z-[-1] h-screen w-screen pointer-events-none',
        'bg-gradient-to-r from-transparent via-transparent to-transparent', // Base transparent background
        'bg-[length:45px_45px]', // Simulate grid cell size
        'bg-[image:linear-gradient(90deg,var(--tw-gradient-stops)),linear-gradient(var(--tw-gradient-stops))]',
        'from-transparent via-[var(--grid-line-color)] to-transparent', // Vertical lines
        'from-transparent via-[var(--grid-line-color)] to-transparent', // Horizontal lines
      )}
      style={{
        // Using CSS variables to pass dynamic colors for the grid lines
        // This is a workaround as Tailwind does not directly support repeating gradients with arbitrary values
        // for `background-image` in a way that perfectly matches the original complex CSS.
        // The original `mask` property is also not directly replicable with Tailwind utilities.
        '--grid-line-color': gridLineColor,
        // The following background properties are a simplified approximation
        // of the original complex repeating gradients and mask.
        // A true replication would require custom CSS or extending Tailwind config.
        backgroundImage: `
          linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px 45px),
          linear-gradient(${gridLineColor} 1px, transparent 1px 45px)
        `,
        backgroundSize: '45px 45px',
        backgroundPosition: '50% 50%',
        maskImage: 'linear-gradient(-20deg, transparent 50%, white)', // This mask property will not be applied by Tailwind directly
        // and would require custom CSS. It's included here for clarity of intent.
      }}
    ></div>
  );
}

// src/components/LandingPage/BackgroundGrid.tsx
