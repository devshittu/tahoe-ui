// src/hooks/gestures/useHoverIntent.ts
'use client';

import { useCallback, useRef, useState, useEffect } from 'react';

/**
 * Configuration for hover intent detection
 */
export interface UseHoverIntentOptions {
  /** Delay before triggering hover start (ms) - default 300ms */
  openDelay?: number;
  /** Delay before triggering hover end (ms) - default 100ms */
  closeDelay?: number;
  /** Cursor speed threshold (px/interval) - faster = accidental hover */
  sensitivity?: number;
  /** Interval to check cursor speed (ms) */
  interval?: number;
  /** Callback when hover intent detected */
  onHoverStart?: () => void;
  /** Callback when hover ends */
  onHoverEnd?: () => void;
  /** Disable the hover detection */
  disabled?: boolean;
}

/**
 * Return type for useHoverIntent hook
 */
export interface UseHoverIntentReturn {
  /** Whether hover intent is active */
  isHovering: boolean;
  /** Whether currently over the element (before intent confirmed) */
  isOver: boolean;
  /** Props to spread on the trigger element */
  hoverProps: {
    onMouseEnter: (e: React.MouseEvent) => void;
    onMouseLeave: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onFocus: (e: React.FocusEvent) => void;
    onBlur: (e: React.FocusEvent) => void;
  };
  /** Props to spread on the content element (keeps hover active) */
  contentProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  /** Manually trigger hover start */
  open: () => void;
  /** Manually trigger hover end */
  close: () => void;
}

// Default values following design principles
// #6 Purposeful Motion: Delays prevent accidental triggers
const DEFAULT_OPEN_DELAY = 300; // ms - enough to distinguish intent from pass-through
const DEFAULT_CLOSE_DELAY = 100; // ms - quick close, but allows moving to content
const DEFAULT_SENSITIVITY = 6; // px - cursor must slow down to this speed
const DEFAULT_INTERVAL = 100; // ms - check interval for cursor speed

/**
 * Hover intent detection hook for hover cards, tooltips, etc.
 *
 * Unlike simple mouseenter/mouseleave, this detects *intentional* hovering
 * by analyzing cursor speed. Fast cursor movement (passing through) won't trigger,
 * while slow/stationary cursor (reading) will.
 *
 * Features:
 * - Cursor speed analysis to detect intent
 * - Configurable open/close delays
 * - Content element support (keeps hover active when moving to dropdown)
 * - Touch device aware (disables on touch)
 * - Keyboard/focus support for accessibility
 *
 * Design Principles Applied:
 * - #6 Purposeful Motion: Intentional delays prevent accidental triggers
 * - #7 Intuitive Interaction: Behavior matches user intent, not raw events
 * - #12 Accessibility: Focus triggers hover state for keyboard users
 * - #16 Micro-Interaction Precision: Cursor speed analysis for refined UX
 *
 * @example
 * ```tsx
 * const { isHovering, hoverProps, contentProps } = useHoverIntent({
 *   openDelay: 300,
 *   onHoverStart: () => prefetchData(),
 * });
 *
 * <div {...hoverProps}>
 *   Hover me
 * </div>
 * {isHovering && (
 *   <div {...contentProps}>
 *     Hover card content
 *   </div>
 * )}
 * ```
 */
export function useHoverIntent(
  options: UseHoverIntentOptions = {},
): UseHoverIntentReturn {
  const {
    openDelay = DEFAULT_OPEN_DELAY,
    closeDelay = DEFAULT_CLOSE_DELAY,
    sensitivity = DEFAULT_SENSITIVITY,
    interval = DEFAULT_INTERVAL,
    onHoverStart,
    onHoverEnd,
    disabled = false,
  } = options;

  const [isHovering, setIsHovering] = useState(false);
  const [isOver, setIsOver] = useState(false);

  // Refs for tracking
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevCoordsRef = useRef<{ x: number; y: number } | null>(null);
  const currentCoordsRef = useRef<{ x: number; y: number } | null>(null);
  const isOverContentRef = useRef(false);
  const isTouchDeviceRef = useRef(false);

  // Detect touch device on mount
  useEffect(() => {
    isTouchDeviceRef.current =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // Cleanup all timers
  const cleanup = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Open hover state
  const open = useCallback(() => {
    if (disabled || isHovering) return;

    cleanup();
    setIsHovering(true);
    onHoverStart?.();
  }, [disabled, isHovering, cleanup, onHoverStart]);

  // Close hover state
  const close = useCallback(() => {
    if (!isHovering) return;

    cleanup();
    setIsHovering(false);
    setIsOver(false);
    onHoverEnd?.();
  }, [isHovering, cleanup, onHoverEnd]);

  // Start delayed open with intent detection
  const startOpenIntent = useCallback(() => {
    if (disabled || isHovering || isTouchDeviceRef.current) return;

    cleanup();

    // Start tracking cursor speed
    intervalRef.current = setInterval(() => {
      if (prevCoordsRef.current && currentCoordsRef.current) {
        const dx = Math.abs(
          currentCoordsRef.current.x - prevCoordsRef.current.x,
        );
        const dy = Math.abs(
          currentCoordsRef.current.y - prevCoordsRef.current.y,
        );
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Cursor is slow enough - user has intent
        if (speed < sensitivity) {
          cleanup();
          openTimeoutRef.current = setTimeout(open, openDelay);
        }
      }
      prevCoordsRef.current = currentCoordsRef.current;
    }, interval);

    // Fallback: if user stays stationary from start
    openTimeoutRef.current = setTimeout(open, openDelay + interval * 2);
  }, [disabled, isHovering, cleanup, open, openDelay, sensitivity, interval]);

  // Start delayed close
  const startCloseIntent = useCallback(() => {
    cleanup();

    // Don't close if over content
    if (isOverContentRef.current) return;

    closeTimeoutRef.current = setTimeout(() => {
      // Double-check we're not over content
      if (!isOverContentRef.current) {
        close();
      }
    }, closeDelay);
  }, [cleanup, close, closeDelay]);

  // Cancel pending close (when moving to content)
  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Mouse enter trigger
  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchDeviceRef.current) return;

    setIsOver(true);
    cancelClose();

    if (!isHovering) {
      startOpenIntent();
    }
  }, [disabled, isHovering, cancelClose, startOpenIntent]);

  // Mouse leave trigger
  const handleMouseLeave = useCallback(() => {
    setIsOver(false);
    prevCoordsRef.current = null;
    currentCoordsRef.current = null;

    if (isHovering) {
      startCloseIntent();
    } else {
      cleanup();
    }
  }, [isHovering, startCloseIntent, cleanup]);

  // Mouse move - track cursor position for speed calculation
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    currentCoordsRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Focus triggers hover (accessibility)
  const handleFocus = useCallback(() => {
    if (disabled) return;
    open();
  }, [disabled, open]);

  // Blur ends hover
  const handleBlur = useCallback(() => {
    if (!isOverContentRef.current) {
      close();
    }
  }, [close]);

  // Content element enters
  const handleContentEnter = useCallback(() => {
    isOverContentRef.current = true;
    cancelClose();
  }, [cancelClose]);

  // Content element leaves
  const handleContentLeave = useCallback(() => {
    isOverContentRef.current = false;
    startCloseIntent();
  }, [startCloseIntent]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    isHovering,
    isOver,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseMove: handleMouseMove,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
    contentProps: {
      onMouseEnter: handleContentEnter,
      onMouseLeave: handleContentLeave,
    },
    open,
    close,
  };
}
