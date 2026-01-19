'use client';

import { useCallback, useRef, useState, useEffect } from 'react';

export interface UseHoverIntentOptions {
  openDelay?: number;
  closeDelay?: number;
  sensitivity?: number;
  interval?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  disabled?: boolean;
}

export interface UseHoverIntentReturn {
  isHovering: boolean;
  isOver: boolean;
  hoverProps: {
    onMouseEnter: (e: React.MouseEvent) => void;
    onMouseLeave: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onFocus: (e: React.FocusEvent) => void;
    onBlur: (e: React.FocusEvent) => void;
  };
  contentProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  open: () => void;
  close: () => void;
}

const DEFAULT_OPEN_DELAY = 300;
const DEFAULT_CLOSE_DELAY = 100;
const DEFAULT_SENSITIVITY = 6;
const DEFAULT_INTERVAL = 100;

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

  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevCoordsRef = useRef<{ x: number; y: number } | null>(null);
  const currentCoordsRef = useRef<{ x: number; y: number } | null>(null);
  const isOverContentRef = useRef(false);
  const isTouchDeviceRef = useRef(false);

  useEffect(() => {
    isTouchDeviceRef.current =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

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

  const open = useCallback(() => {
    if (disabled || isHovering) return;

    cleanup();
    setIsHovering(true);
    onHoverStart?.();
  }, [disabled, isHovering, cleanup, onHoverStart]);

  const close = useCallback(() => {
    if (!isHovering) return;

    cleanup();
    setIsHovering(false);
    setIsOver(false);
    onHoverEnd?.();
  }, [isHovering, cleanup, onHoverEnd]);

  const startOpenIntent = useCallback(() => {
    if (disabled || isHovering || isTouchDeviceRef.current) return;

    cleanup();

    intervalRef.current = setInterval(() => {
      if (prevCoordsRef.current && currentCoordsRef.current) {
        const dx = Math.abs(
          currentCoordsRef.current.x - prevCoordsRef.current.x,
        );
        const dy = Math.abs(
          currentCoordsRef.current.y - prevCoordsRef.current.y,
        );
        const speed = Math.sqrt(dx * dx + dy * dy);

        if (speed < sensitivity) {
          cleanup();
          openTimeoutRef.current = setTimeout(open, openDelay);
        }
      }
      prevCoordsRef.current = currentCoordsRef.current;
    }, interval);

    openTimeoutRef.current = setTimeout(open, openDelay + interval * 2);
  }, [disabled, isHovering, cleanup, open, openDelay, sensitivity, interval]);

  const startCloseIntent = useCallback(() => {
    cleanup();

    if (isOverContentRef.current) return;

    closeTimeoutRef.current = setTimeout(() => {
      if (!isOverContentRef.current) {
        close();
      }
    }, closeDelay);
  }, [cleanup, close, closeDelay]);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchDeviceRef.current) return;

    setIsOver(true);
    cancelClose();

    if (!isHovering) {
      startOpenIntent();
    }
  }, [disabled, isHovering, cancelClose, startOpenIntent]);

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    currentCoordsRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleFocus = useCallback(() => {
    if (disabled) return;
    open();
  }, [disabled, open]);

  const handleBlur = useCallback(() => {
    if (!isOverContentRef.current) {
      close();
    }
  }, [close]);

  const handleContentEnter = useCallback(() => {
    isOverContentRef.current = true;
    cancelClose();
  }, [cancelClose]);

  const handleContentLeave = useCallback(() => {
    isOverContentRef.current = false;
    startCloseIntent();
  }, [startCloseIntent]);

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
