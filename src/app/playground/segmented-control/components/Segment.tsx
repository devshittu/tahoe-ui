// src/app/playground/segmented-control/components/Segment.tsx

'use client';

import { forwardRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  SegmentProps,
  SEGMENT_SIZE_CONFIG,
  SEGMENT_ANIMATION_CONFIG,
} from './types';

/**
 * Individual segment button within SegmentedControl
 *
 * Design Principles Applied:
 * - #9 Obvious Affordances: Clear interactive states
 * - #16 Micro-Interaction Precision: Subtle color transitions
 * - #12 Accessibility: Full keyboard support via RadioGroup.Option
 *
 * @internal Used internally by SegmentedControl
 */
export const Segment = forwardRef<HTMLButtonElement, SegmentProps>(
  function Segment(
    { option, selected, size, controlDisabled, onClick, ...props },
    ref,
  ) {
    const config = SEGMENT_SIZE_CONFIG[size];
    const isDisabled = controlDisabled || option.disabled;

    const handleClick = useCallback(() => {
      if (!isDisabled) {
        onClick();
      }
    }, [isDisabled, onClick]);

    return (
      <motion.button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={selected}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          // Base styles
          'relative z-10 flex items-center justify-center gap-2',
          'select-none whitespace-nowrap',
          'transition-colors',
          config.segment,
          config.fontSize,

          // Text color based on selection state
          selected
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-600 dark:text-gray-400',

          // Hover state (only when not selected and not disabled)
          !selected &&
            !isDisabled &&
            'hover:text-gray-900 dark:hover:text-gray-200',

          // Disabled state
          isDisabled && 'opacity-50 cursor-not-allowed',

          // Focus visible (keyboard navigation)
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1',
          'rounded-md',
        )}
        initial={false}
        animate={{
          color: selected
            ? 'var(--segment-selected-color)'
            : 'var(--segment-default-color)',
        }}
        transition={SEGMENT_ANIMATION_CONFIG.colorTransition}
        style={
          {
            '--segment-selected-color': 'inherit',
            '--segment-default-color': 'inherit',
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Icon */}
        {option.icon && (
          <span
            className={cn(
              config.iconSize,
              'flex-shrink-0',
              'transition-colors duration-150',
            )}
            aria-hidden="true"
          >
            {option.icon}
          </span>
        )}

        {/* Label */}
        <span className="font-medium">{option.label}</span>
      </motion.button>
    );
  },
);

Segment.displayName = 'Segment';
