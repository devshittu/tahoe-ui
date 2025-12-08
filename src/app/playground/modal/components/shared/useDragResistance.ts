'use client';

import { useState, useCallback, useMemo } from 'react';
import { PanInfo } from 'framer-motion';
import { Position, DragResistanceConfig } from './types';

type DragState = {
  isBeyondLimit: boolean; // Dragging in wrong direction (resistance zone)
  shouldClose: boolean; // Dragging toward close threshold
  resistanceIntensity: number; // 0-1 for visual feedback
};

type UseDragResistanceOptions = {
  position: Position;
  closeThreshold: number; // 0-1 fraction of viewport
  resistance?: DragResistanceConfig;
  onClose: () => void;
};

/**
 * Advanced drag resistance hook with directional physics
 *
 * Handles:
 * - Wrong-direction resistance (dragging away from close direction)
 * - Close threshold detection
 * - Visual feedback intensity calculation
 * - Velocity-aware release handling
 */
export function useDragResistance({
  position,
  closeThreshold,
  resistance = {},
  onClose,
}: UseDragResistanceOptions) {
  const {
    enabled = true,
    threshold = 50, // px before resistance kicks in
    strength = 0.6, // 0-1, higher = stronger resistance
    visualFeedback = true,
  } = resistance;

  const [dragState, setDragState] = useState<DragState>({
    isBeyondLimit: false,
    shouldClose: false,
    resistanceIntensity: 0,
  });

  // Normalize close threshold
  const normalizedThreshold = useMemo(
    () => Math.min(Math.max(closeThreshold, 0), 1),
    [closeThreshold],
  );

  /**
   * Calculate if drag is in close direction and magnitude
   */
  const calculateDragMetrics = useCallback(
    (offset: { x: number; y: number }) => {
      const { x, y } = offset;
      let isClosing = false;
      let isResisting = false;
      let intensity = 0;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      switch (position) {
        case 'top':
          // Close by dragging up (negative y)
          if (y < 0) {
            isClosing = Math.abs(y) > viewportHeight * normalizedThreshold;
          } else if (y > threshold) {
            // Resisting downward drag
            isResisting = enabled;
            intensity = Math.min((y - threshold) / (viewportHeight * 0.3), 1);
          }
          break;

        case 'bottom':
          // Close by dragging down (positive y)
          if (y > 0) {
            isClosing = y > viewportHeight * normalizedThreshold;
          } else if (Math.abs(y) > threshold) {
            // Resisting upward drag
            isResisting = enabled;
            intensity = Math.min(
              (Math.abs(y) - threshold) / (viewportHeight * 0.3),
              1,
            );
          }
          break;

        case 'left':
          // Close by dragging left (negative x)
          if (x < 0) {
            isClosing = Math.abs(x) > viewportWidth * normalizedThreshold;
          } else if (x > threshold) {
            // Resisting rightward drag
            isResisting = enabled;
            intensity = Math.min((x - threshold) / (viewportWidth * 0.3), 1);
          }
          break;

        case 'right':
          // Close by dragging right (positive x)
          if (x > 0) {
            isClosing = x > viewportWidth * normalizedThreshold;
          } else if (Math.abs(x) > threshold) {
            // Resisting leftward drag
            isResisting = enabled;
            intensity = Math.min(
              (Math.abs(x) - threshold) / (viewportWidth * 0.3),
              1,
            );
          }
          break;
      }

      return {
        isClosing,
        isResisting,
        intensity: visualFeedback ? intensity * strength : 0,
      };
    },
    [
      position,
      normalizedThreshold,
      threshold,
      enabled,
      strength,
      visualFeedback,
    ],
  );

  /**
   * Handle drag movement with resistance calculations
   */
  const handleDrag = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      const { isClosing, isResisting, intensity } = calculateDragMetrics(
        info.offset,
      );

      setDragState({
        shouldClose: isClosing,
        isBeyondLimit: isResisting,
        resistanceIntensity: intensity,
      });
    },
    [calculateDragMetrics],
  );

  /**
   * Handle drag end with velocity-aware closing
   */
  const handleDragEnd = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      const { isClosing } = calculateDragMetrics(info.offset);

      // Check velocity for fling gestures (px/ms)
      const velocity = Math.abs(
        position === 'left' || position === 'right'
          ? info.velocity.x
          : info.velocity.y,
      );

      // Close if beyond threshold OR fast fling gesture
      const shouldCloseOnVelocity = velocity > 500; // Tuned for natural feel

      if (isClosing || shouldCloseOnVelocity) {
        onClose();
      }

      // Reset state
      setDragState({
        isBeyondLimit: false,
        shouldClose: false,
        resistanceIntensity: 0,
      });
    },
    [calculateDragMetrics, onClose, position],
  );

  return {
    dragState,
    handleDrag,
    handleDragEnd,
  };
}
