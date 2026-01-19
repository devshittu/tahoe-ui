'use client';

import React, { useState, useEffect, useId } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { TooltipProps, TooltipTrigger, TooltipPlacement } from './types';
import {
  DEFAULT_TOOLTIP_CONFIG,
  TOOLTIP_VARIANT_STYLES,
  TOOLTIP_SIZE_STYLES,
  PLACEMENT_CLASSES,
  ARROW_CLASSES,
  ARROW_COLORS,
} from './types';

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
  const placementClass = PLACEMENT_CLASSES[placement] || PLACEMENT_CLASSES['top'];
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
              <>{children}</>
            </PopoverButton>

            <AnimatePresence>
              {open && content ? (
                <PopoverPanel
                  static
                  className={twMerge('absolute z-50', placementClass)}
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={animationVariants}
                    id={tooltipId}
                    role="tooltip"
                    style={{ maxWidth }}
                    className={twMerge(
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
                        className={twMerge(
                          'absolute w-0 h-0 border-[6px]',
                          arrowClass,
                          arrowColor,
                        )}
                      />
                    )}
                  </motion.div>
                </PopoverPanel>
              ) : null}
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
        {isOpen && content && !disabled ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
            id={tooltipId}
            role="tooltip"
            style={{ maxWidth }}
            className={twMerge(
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
                className={twMerge(
                  'absolute w-0 h-0 border-[6px]',
                  arrowClass,
                  arrowColor,
                )}
              />
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Tooltip;
