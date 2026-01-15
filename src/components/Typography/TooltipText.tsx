'use client';

import React, { forwardRef, useState, useId, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { TooltipTextProps } from './typography.types';
import { tooltipPositionClasses } from './typography.classes';

/**
 * TooltipText component with proper accessibility support.
 * Includes role="tooltip", aria-describedby, and keyboard support.
 */
const TooltipText = forwardRef<HTMLSpanElement, TooltipTextProps>(
  (
    { children, tooltip, position = 'top', delay = 300, className, ...props },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const tooltipId = useId();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = useCallback(() => {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    }, [delay]);

    const hideTooltip = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVisible(false);
    }, []);

    return (
      <span
        ref={ref}
        className={cn('relative inline-block', className)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-describedby={visible ? tooltipId : undefined}
        {...props}
      >
        {children}
        {visible && (
          <span
            id={tooltipId}
            role="tooltip"
            className={cn(
              'absolute z-50 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white',
              'pointer-events-none transition-opacity duration-200',
              tooltipPositionClasses[position],
            )}
          >
            {tooltip}
          </span>
        )}
      </span>
    );
  },
);

TooltipText.displayName = 'TooltipText';
export default TooltipText;
export type { TooltipTextProps };
