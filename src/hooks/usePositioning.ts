// src/hooks/usePositioning.ts
'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';

/**
 * Placement options for positioned elements
 */
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type Side = 'top' | 'bottom' | 'left' | 'right';
export type Alignment = 'start' | 'center' | 'end';

/**
 * Configuration for the positioning engine
 */
export interface PositioningOptions {
  /** Preferred placement */
  placement?: Placement;
  /** Offset from the anchor element (px) */
  offset?: number;
  /** Padding from viewport edges (px) */
  viewportPadding?: number;
  /** Enable flip when insufficient space */
  flip?: boolean;
  /** Enable shift to stay within viewport */
  shift?: boolean;
  /** Arrow element ref for arrow positioning */
  arrowRef?: React.RefObject<HTMLElement>;
  /** Arrow padding from edges */
  arrowPadding?: number;
  /** Strategy: 'absolute' or 'fixed' */
  strategy?: 'absolute' | 'fixed';
  /** Custom boundary element */
  boundary?: HTMLElement | 'viewport';
}

/**
 * Computed position data
 */
export interface PositionData {
  x: number;
  y: number;
  placement: Placement;
  side: Side;
  alignment: Alignment;
  arrowX?: number;
  arrowY?: number;
  maxHeight?: number;
  maxWidth?: number;
  isFlipped: boolean;
  isShifted: boolean;
}

/**
 * Return type for usePositioning hook
 */
export interface UsePositioningReturn {
  /** Position data for the floating element */
  position: PositionData | null;
  /** Ref to attach to anchor/trigger element */
  anchorRef: React.RefObject<HTMLElement>;
  /** Ref to attach to floating element */
  floatingRef: React.RefObject<HTMLElement>;
  /** Manually trigger position recalculation */
  update: () => void;
  /** CSS styles to apply to floating element */
  floatingStyles: React.CSSProperties;
  /** CSS styles to apply to arrow element */
  arrowStyles: React.CSSProperties;
}

const DEFAULT_OPTIONS: Required<
  Omit<PositioningOptions, 'arrowRef' | 'boundary'>
> = {
  placement: 'bottom',
  offset: 8,
  viewportPadding: 8,
  flip: true,
  shift: true,
  arrowPadding: 8,
  strategy: 'absolute',
};

/**
 * Parse placement into side and alignment
 */
function parsePlacement(placement: Placement): {
  side: Side;
  alignment: Alignment;
} {
  const [side, alignment = 'center'] = placement.split('-') as [
    Side,
    Alignment?,
  ];
  return { side, alignment: alignment || 'center' };
}

/**
 * Get opposite side for flipping
 */
function getOppositeSide(side: Side): Side {
  const opposites: Record<Side, Side> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  return opposites[side];
}

/**
 * Get axis for a side
 */
function getAxis(side: Side): 'x' | 'y' {
  return side === 'top' || side === 'bottom' ? 'y' : 'x';
}

/**
 * Get viewport rect
 */
function getViewportRect(): DOMRect {
  return {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    bottom: window.innerHeight,
    right: window.innerWidth,
    width: window.innerWidth,
    height: window.innerHeight,
    toJSON: () => ({}),
  };
}

/**
 * Calculate base position before adjustments
 */
function calculateBasePosition(
  anchorRect: DOMRect,
  floatingRect: DOMRect,
  side: Side,
  alignment: Alignment,
  offset: number,
): { x: number; y: number } {
  let x = 0;
  let y = 0;

  // Position based on side
  switch (side) {
    case 'top':
      x = anchorRect.left + anchorRect.width / 2 - floatingRect.width / 2;
      y = anchorRect.top - floatingRect.height - offset;
      break;
    case 'bottom':
      x = anchorRect.left + anchorRect.width / 2 - floatingRect.width / 2;
      y = anchorRect.bottom + offset;
      break;
    case 'left':
      x = anchorRect.left - floatingRect.width - offset;
      y = anchorRect.top + anchorRect.height / 2 - floatingRect.height / 2;
      break;
    case 'right':
      x = anchorRect.right + offset;
      y = anchorRect.top + anchorRect.height / 2 - floatingRect.height / 2;
      break;
  }

  // Adjust for alignment
  const axis = getAxis(side);
  if (axis === 'y') {
    // Horizontal alignment for top/bottom
    switch (alignment) {
      case 'start':
        x = anchorRect.left;
        break;
      case 'end':
        x = anchorRect.right - floatingRect.width;
        break;
    }
  } else {
    // Vertical alignment for left/right
    switch (alignment) {
      case 'start':
        y = anchorRect.top;
        break;
      case 'end':
        y = anchorRect.bottom - floatingRect.height;
        break;
    }
  }

  return { x, y };
}

/**
 * Check if position overflows viewport
 */
function getOverflow(
  position: { x: number; y: number },
  floatingRect: DOMRect,
  viewportRect: DOMRect,
  padding: number,
): { top: number; bottom: number; left: number; right: number } {
  return {
    top: padding - position.y,
    bottom: position.y + floatingRect.height - (viewportRect.height - padding),
    left: padding - position.x,
    right: position.x + floatingRect.width - (viewportRect.width - padding),
  };
}

/**
 * Calculate arrow position
 */
function calculateArrowPosition(
  anchorRect: DOMRect,
  floatingPosition: { x: number; y: number },
  floatingRect: DOMRect,
  side: Side,
  arrowPadding: number,
): { x?: number; y?: number } {
  const axis = getAxis(side);

  if (axis === 'y') {
    // Arrow on horizontal axis
    const anchorCenter = anchorRect.left + anchorRect.width / 2;
    const arrowX = anchorCenter - floatingPosition.x;
    const clampedX = Math.max(
      arrowPadding,
      Math.min(arrowX, floatingRect.width - arrowPadding),
    );
    return { x: clampedX };
  } else {
    // Arrow on vertical axis
    const anchorCenter = anchorRect.top + anchorRect.height / 2;
    const arrowY = anchorCenter - floatingPosition.y;
    const clampedY = Math.max(
      arrowPadding,
      Math.min(arrowY, floatingRect.height - arrowPadding),
    );
    return { y: clampedY };
  }
}

/**
 * Positioning engine hook for tooltips, popovers, dropdowns, etc.
 *
 * Features:
 * - Automatic flip when insufficient space
 * - Shift to stay within viewport
 * - Arrow positioning
 * - Multiple placement options
 * - Viewport-aware collision detection
 *
 * @example
 * ```tsx
 * const { anchorRef, floatingRef, floatingStyles, position } = usePositioning({
 *   placement: 'top',
 *   offset: 8,
 * });
 *
 * <button ref={anchorRef}>Trigger</button>
 * <div ref={floatingRef} style={floatingStyles}>
 *   Tooltip content
 * </div>
 * ```
 */
export function usePositioning(
  options: PositioningOptions = {},
): UsePositioningReturn {
  const {
    placement: preferredPlacement = DEFAULT_OPTIONS.placement,
    offset = DEFAULT_OPTIONS.offset,
    viewportPadding = DEFAULT_OPTIONS.viewportPadding,
    flip = DEFAULT_OPTIONS.flip,
    shift = DEFAULT_OPTIONS.shift,
    arrowRef,
    arrowPadding = DEFAULT_OPTIONS.arrowPadding,
    strategy = DEFAULT_OPTIONS.strategy,
    boundary,
  } = options;

  const anchorRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<PositionData | null>(null);

  const update = useCallback(() => {
    const anchor = anchorRef.current;
    const floating = floatingRef.current;

    if (!anchor || !floating) {
      setPosition(null);
      return;
    }

    const anchorRect = anchor.getBoundingClientRect();
    const floatingRect = floating.getBoundingClientRect();
    const viewportRect =
      boundary === 'viewport' || !boundary
        ? getViewportRect()
        : boundary.getBoundingClientRect();

    let { side, alignment } = parsePlacement(preferredPlacement);
    let isFlipped = false;
    let isShifted = false;

    // Calculate initial position
    let pos = calculateBasePosition(
      anchorRect,
      floatingRect,
      side,
      alignment,
      offset,
    );
    let overflow = getOverflow(
      pos,
      floatingRect,
      viewportRect,
      viewportPadding,
    );

    // Flip if needed
    if (flip) {
      const axis = getAxis(side);
      const mainOverflow =
        axis === 'y'
          ? side === 'top'
            ? overflow.top
            : overflow.bottom
          : side === 'left'
            ? overflow.left
            : overflow.right;

      if (mainOverflow > 0) {
        const oppositeSide = getOppositeSide(side);
        const oppositePos = calculateBasePosition(
          anchorRect,
          floatingRect,
          oppositeSide,
          alignment,
          offset,
        );
        const oppositeOverflow = getOverflow(
          oppositePos,
          floatingRect,
          viewportRect,
          viewportPadding,
        );
        const oppositeMainOverflow =
          axis === 'y'
            ? oppositeSide === 'top'
              ? oppositeOverflow.top
              : oppositeOverflow.bottom
            : oppositeSide === 'left'
              ? oppositeOverflow.left
              : oppositeOverflow.right;

        // Flip if opposite side has less overflow
        if (oppositeMainOverflow < mainOverflow) {
          side = oppositeSide;
          pos = oppositePos;
          overflow = oppositeOverflow;
          isFlipped = true;
        }
      }
    }

    // Shift if needed
    if (shift) {
      const axis = getAxis(side);

      if (axis === 'y') {
        // Shift horizontally for top/bottom placements
        if (overflow.left > 0) {
          pos.x += overflow.left;
          isShifted = true;
        } else if (overflow.right > 0) {
          pos.x -= overflow.right;
          isShifted = true;
        }
      } else {
        // Shift vertically for left/right placements
        if (overflow.top > 0) {
          pos.y += overflow.top;
          isShifted = true;
        } else if (overflow.bottom > 0) {
          pos.y -= overflow.bottom;
          isShifted = true;
        }
      }
    }

    // Calculate arrow position
    const arrowPos = calculateArrowPosition(
      anchorRect,
      pos,
      floatingRect,
      side,
      arrowPadding,
    );

    // Calculate max dimensions
    const maxHeight = viewportRect.height - viewportPadding * 2;
    const maxWidth = viewportRect.width - viewportPadding * 2;

    // Update alignment if shifted
    if (isShifted) {
      const axis = getAxis(side);
      if (axis === 'y') {
        if (pos.x === anchorRect.left) alignment = 'start';
        else if (pos.x + floatingRect.width === anchorRect.right)
          alignment = 'end';
      } else {
        if (pos.y === anchorRect.top) alignment = 'start';
        else if (pos.y + floatingRect.height === anchorRect.bottom)
          alignment = 'end';
      }
    }

    const finalPlacement =
      alignment === 'center' ? side : (`${side}-${alignment}` as Placement);

    setPosition({
      x: Math.round(pos.x),
      y: Math.round(pos.y),
      placement: finalPlacement,
      side,
      alignment,
      arrowX: arrowPos.x,
      arrowY: arrowPos.y,
      maxHeight,
      maxWidth,
      isFlipped,
      isShifted,
    });
  }, [
    preferredPlacement,
    offset,
    viewportPadding,
    flip,
    shift,
    arrowPadding,
    boundary,
  ]);

  // Update on mount and window resize
  useEffect(() => {
    update();

    const handleResize = () => update();
    const handleScroll = () => update();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [update]);

  // Compute styles
  const floatingStyles = useMemo<React.CSSProperties>(() => {
    if (!position) {
      return {
        position: strategy,
        top: 0,
        left: 0,
        visibility: 'hidden',
      };
    }

    return {
      position: strategy,
      top: position.y,
      left: position.x,
      maxHeight: position.maxHeight,
      maxWidth: position.maxWidth,
    };
  }, [position, strategy]);

  const arrowStyles = useMemo<React.CSSProperties>(() => {
    if (!position) return {};

    const styles: React.CSSProperties = {
      position: 'absolute',
    };

    if (position.arrowX !== undefined) {
      styles.left = position.arrowX;
      styles.transform = 'translateX(-50%)';
    }

    if (position.arrowY !== undefined) {
      styles.top = position.arrowY;
      styles.transform = 'translateY(-50%)';
    }

    // Position arrow on correct side
    switch (position.side) {
      case 'top':
        styles.bottom = 0;
        styles.transform = 'translateX(-50%) translateY(50%) rotate(45deg)';
        break;
      case 'bottom':
        styles.top = 0;
        styles.transform = 'translateX(-50%) translateY(-50%) rotate(45deg)';
        break;
      case 'left':
        styles.right = 0;
        styles.transform = 'translateY(-50%) translateX(50%) rotate(45deg)';
        break;
      case 'right':
        styles.left = 0;
        styles.transform = 'translateY(-50%) translateX(-50%) rotate(45deg)';
        break;
    }

    return styles;
  }, [position]);

  return {
    position,
    anchorRef,
    floatingRef,
    update,
    floatingStyles,
    arrowStyles,
  };
}

/**
 * Get static position calculation (non-reactive)
 * Useful for imperative positioning
 */
export function calculatePosition(
  anchor: HTMLElement,
  floating: HTMLElement,
  options: PositioningOptions = {},
): PositionData | null {
  const {
    placement: preferredPlacement = DEFAULT_OPTIONS.placement,
    offset = DEFAULT_OPTIONS.offset,
    viewportPadding = DEFAULT_OPTIONS.viewportPadding,
    flip = DEFAULT_OPTIONS.flip,
    shift = DEFAULT_OPTIONS.shift,
    arrowPadding = DEFAULT_OPTIONS.arrowPadding,
  } = options;

  const anchorRect = anchor.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  const viewportRect = getViewportRect();

  let { side, alignment } = parsePlacement(preferredPlacement);
  let isFlipped = false;
  let isShifted = false;

  let pos = calculateBasePosition(
    anchorRect,
    floatingRect,
    side,
    alignment,
    offset,
  );
  let overflow = getOverflow(pos, floatingRect, viewportRect, viewportPadding);

  if (flip) {
    const axis = getAxis(side);
    const mainOverflow =
      axis === 'y'
        ? side === 'top'
          ? overflow.top
          : overflow.bottom
        : side === 'left'
          ? overflow.left
          : overflow.right;

    if (mainOverflow > 0) {
      const oppositeSide = getOppositeSide(side);
      const oppositePos = calculateBasePosition(
        anchorRect,
        floatingRect,
        oppositeSide,
        alignment,
        offset,
      );
      const oppositeOverflow = getOverflow(
        oppositePos,
        floatingRect,
        viewportRect,
        viewportPadding,
      );
      const oppositeMainOverflow =
        axis === 'y'
          ? oppositeSide === 'top'
            ? oppositeOverflow.top
            : oppositeOverflow.bottom
          : oppositeSide === 'left'
            ? oppositeOverflow.left
            : oppositeOverflow.right;

      if (oppositeMainOverflow < mainOverflow) {
        side = oppositeSide;
        pos = oppositePos;
        overflow = oppositeOverflow;
        isFlipped = true;
      }
    }
  }

  if (shift) {
    const axis = getAxis(side);

    if (axis === 'y') {
      if (overflow.left > 0) {
        pos.x += overflow.left;
        isShifted = true;
      } else if (overflow.right > 0) {
        pos.x -= overflow.right;
        isShifted = true;
      }
    } else {
      if (overflow.top > 0) {
        pos.y += overflow.top;
        isShifted = true;
      } else if (overflow.bottom > 0) {
        pos.y -= overflow.bottom;
        isShifted = true;
      }
    }
  }

  const arrowPos = calculateArrowPosition(
    anchorRect,
    pos,
    floatingRect,
    side,
    arrowPadding,
  );
  const maxHeight = viewportRect.height - viewportPadding * 2;
  const maxWidth = viewportRect.width - viewportPadding * 2;

  const finalPlacement =
    alignment === 'center' ? side : (`${side}-${alignment}` as Placement);

  return {
    x: Math.round(pos.x),
    y: Math.round(pos.y),
    placement: finalPlacement,
    side,
    alignment,
    arrowX: arrowPos.x,
    arrowY: arrowPos.y,
    maxHeight,
    maxWidth,
    isFlipped,
    isShifted,
  };
}
