// src/app/playground/tooltip/components/Tooltip.tsx
'use client';

import React, { useState, useCallback, useEffect, useId } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TooltipProps, TooltipTrigger } from './types';
import {
  DEFAULT_TOOLTIP_CONFIG,
  TOOLTIP_VARIANT_STYLES,
  TOOLTIP_SIZE_STYLES,
} from './types';

/**
 * Position classes for tooltip placement
 * Uses CSS positioning relative to the trigger wrapper
 */
const PLACEMENT_CLASSES: Record<string, string> = {
  // Top placements
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  // Bottom placements
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
  // Left placements
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  'left-start': 'right-full top-0 mr-2',
  'left-end': 'right-full bottom-0 mr-2',
  // Right placements
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  'right-start': 'left-full top-0 ml-2',
  'right-end': 'left-full bottom-0 ml-2',
};

/**
 * Arrow classes for each placement
 */
const ARROW_CLASSES: Record<string, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 -mt-px border-t-current border-x-transparent border-b-transparent',
  'top-start':
    'top-full left-3 -mt-px border-t-current border-x-transparent border-b-transparent',
  'top-end':
    'top-full right-3 -mt-px border-t-current border-x-transparent border-b-transparent',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 -mb-px border-b-current border-x-transparent border-t-transparent',
  'bottom-start':
    'bottom-full left-3 -mb-px border-b-current border-x-transparent border-t-transparent',
  'bottom-end':
    'bottom-full right-3 -mb-px border-b-current border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 -ml-px border-l-current border-y-transparent border-r-transparent',
  'left-start':
    'left-full top-3 -ml-px border-l-current border-y-transparent border-r-transparent',
  'left-end':
    'left-full bottom-3 -ml-px border-l-current border-y-transparent border-r-transparent',
  right:
    'right-full top-1/2 -translate-y-1/2 -mr-px border-r-current border-y-transparent border-l-transparent',
  'right-start':
    'right-full top-3 -mr-px border-r-current border-y-transparent border-l-transparent',
  'right-end':
    'right-full bottom-3 -mr-px border-r-current border-y-transparent border-l-transparent',
};

/**
 * Arrow fill colors for each variant
 */
const ARROW_COLORS: Record<string, string> = {
  default: 'text-gray-900 dark:text-gray-100',
  dark: 'text-gray-900',
  light: 'text-white dark:text-gray-800',
  info: 'text-blue-600',
  warning: 'text-amber-500',
  error: 'text-red-600',
};

/**
 * Tooltip - Contextual information on hover/focus/click
 *
 * Built with HeadlessUI Popover for interactions + CSS positioning.
 *
 * Features:
 * - Multiple trigger modes (hover, focus, click)
 * - CSS-based positioning (12 placements)
 * - Arrow pointer
 * - Escape key and click-outside dismissal (via HeadlessUI)
 * - Full accessibility (ARIA attributes)
 *
 * Design Principles:
 * - #6 Purposeful Motion: Smooth animations
 * - #7 Intuitive Interaction: Natural trigger behaviors
 * - #12 Accessibility: Full keyboard support via HeadlessUI
 * - No X button - natural dismissal only
 */
export function Tooltip({
  children,
  content,
  placement = DEFAULT_TOOLTIP_CONFIG.placement,
  trigger = DEFAULT_TOOLTIP_CONFIG.trigger,
  openDelay = DEFAULT_TOOLTIP_CONFIG.openDelay,
  closeDelay = DEFAULT_TOOLTIP_CONFIG.closeDelay,
  variant = DEFAULT_TOOLTIP_CONFIG.variant,
  size = DEFAULT_TOOLTIP_CONFIG.size,
  showArrow = DEFAULT_TOOLTIP_CONFIG.showArrow,
  disabled = DEFAULT_TOOLTIP_CONFIG.disabled,
  open: controlledOpen,
  onOpenChange,
  className,
  maxWidth = DEFAULT_TOOLTIP_CONFIG.maxWidth,
}: TooltipProps) {
  const tooltipId = useId();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [delayedOpen, setDelayedOpen] = useState(false);

  // Normalize trigger to array
  const triggers: TooltipTrigger[] = Array.isArray(trigger)
    ? trigger
    : [trigger];
  const hasHoverTrigger = triggers.includes('hover');
  const hasFocusTrigger = triggers.includes('focus');
  const hasClickTrigger = triggers.includes('click');

  // Determine if controlled
  const isControlled = controlledOpen !== undefined;

  // For hover/focus, manage our own state
  const shouldShowForHoverFocus =
    (hasHoverTrigger && isHovered) || (hasFocusTrigger && isFocused);

  // Handle delayed open/close for hover
  useEffect(() => {
    if (disabled) {
      setDelayedOpen(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    if (shouldShowForHoverFocus) {
      timeoutId = setTimeout(() => {
        setDelayedOpen(true);
        onOpenChange?.(true);
      }, openDelay);
    } else {
      timeoutId = setTimeout(() => {
        setDelayedOpen(false);
        onOpenChange?.(false);
      }, closeDelay);
    }

    return () => clearTimeout(timeoutId);
  }, [shouldShowForHoverFocus, openDelay, closeDelay, disabled, onOpenChange]);

  // Get styles
  const variantStyles = TOOLTIP_VARIANT_STYLES[variant];
  const sizeStyles = TOOLTIP_SIZE_STYLES[size];
  const placementClass =
    PLACEMENT_CLASSES[placement] || PLACEMENT_CLASSES['top'];
  const arrowClass = ARROW_CLASSES[placement] || ARROW_CLASSES['top'];
  const arrowColor = ARROW_COLORS[variant];

  // Animation variants
  const animationVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 400 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
  };

  // For click trigger, use Popover's built-in state
  if (hasClickTrigger && !hasHoverTrigger && !hasFocusTrigger) {
    return (
      <Popover className="relative inline-block">
        {({ open }) => (
          <>
            <PopoverButton
              as="div"
              className="inline-block cursor-pointer"
              disabled={disabled}
            >
              {children}
            </PopoverButton>

            <AnimatePresence>
              {open && content && (
                <PopoverPanel
                  static
                  className={cn('absolute z-50', placementClass)}
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={animationVariants}
                    id={tooltipId}
                    role="tooltip"
                    style={{ maxWidth }}
                    className={cn(
                      'relative rounded-lg shadow-lg',
                      variantStyles.bg,
                      variantStyles.text,
                      sizeStyles.padding,
                      sizeStyles.text,
                      variant === 'light' && 'border',
                      variant === 'light' && variantStyles.border,
                      className,
                    )}
                  >
                    {content}
                    {showArrow && (
                      <div
                        className={cn(
                          'absolute w-0 h-0 border-[6px]',
                          arrowClass,
                          arrowColor,
                        )}
                      />
                    )}
                  </motion.div>
                </PopoverPanel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    );
  }

  // For hover/focus triggers, use manual state management
  const isOpen = isControlled ? controlledOpen : delayedOpen;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={hasHoverTrigger ? () => setIsHovered(true) : undefined}
      onMouseLeave={hasHoverTrigger ? () => setIsHovered(false) : undefined}
      onFocus={hasFocusTrigger ? () => setIsFocused(true) : undefined}
      onBlur={hasFocusTrigger ? () => setIsFocused(false) : undefined}
    >
      <div
        className="inline-block"
        aria-describedby={isOpen ? tooltipId : undefined}
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && content && !disabled && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
            id={tooltipId}
            role="tooltip"
            style={{ maxWidth }}
            className={cn(
              'absolute z-50 pointer-events-none',
              placementClass,
              'rounded-lg shadow-lg',
              variantStyles.bg,
              variantStyles.text,
              sizeStyles.padding,
              sizeStyles.text,
              variant === 'light' && 'border',
              variant === 'light' && variantStyles.border,
              className,
            )}
          >
            {content}
            {showArrow && (
              <div
                className={cn(
                  'absolute w-0 h-0 border-[6px]',
                  arrowClass,
                  arrowColor,
                )}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Tooltip;
