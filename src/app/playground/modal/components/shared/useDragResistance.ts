'use client';

import { useState, useCallback, useMemo } from 'react';
import { PanInfo } from 'framer-motion';
import { Position, DragResistanceConfig } from './types';

type DragState = {
  isBeyondLimit: boolean; // Dragging past elastic limit
  shouldClose: boolean; // Dragging toward close threshold
  resistanceIntensity: number; // 0-1 for visual feedback
  closeProgress: number; // 0-1 for smooth visual interpolation
  dragDirection: 'towards-close' | 'away' | 'none'; // Current drag direction
};

type UseDragResistanceOptions = {
  position: Position; // Handlebar position (drag initiation)
  closeDirection: Position; // Direction that triggers close (typically showFrom)
  closeThreshold: number; // 0-1 fraction of viewport
  resistance?: DragResistanceConfig;
  onClose: () => void;
};

// Elastic resistance curve - exponential decay for natural feel
function elasticResistance(distance: number, maxDistance: number): number {
  const normalized = Math.min(distance / maxDistance, 1);
  // Exponential decay: quick initial movement, heavy resistance at limit
  return maxDistance * (1 - Math.exp(-normalized * 3)) * 0.4;
}

/**
 * Advanced drag resistance hook with bi-directional physics
 *
 * Features:
 * - Elastic snap zones (iOS 17+ sheet behavior)
 * - Velocity-aware close detection
 * - Progressive close feedback (0-1 interpolation)
 * - Natural spring physics bounds
 */
export function useDragResistance({
  position,
  closeDirection,
  closeThreshold,
  resistance = {},
  onClose,
}: UseDragResistanceOptions) {
  const {
    enabled = true,
    threshold = 30, // px before elastic resistance starts
    strength = 0.7, // 0-1, elastic resistance strength
    visualFeedback = true,
  } = resistance;

  const [dragState, setDragState] = useState<DragState>({
    isBeyondLimit: false,
    shouldClose: false,
    resistanceIntensity: 0,
    closeProgress: 0,
    dragDirection: 'none',
  });

  // Close threshold: 15% default for snappy feel
  const normalizedThreshold = useMemo(
    () => Math.min(Math.max(closeThreshold, 0), 1),
    [closeThreshold],
  );

  /**
   * Calculate drag metrics with bi-directional support
   */
  const calculateDragMetrics = useCallback(
    (offset: { x: number; y: number }, velocity?: { x: number; y: number }) => {
      const { x, y } = offset;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Determine close axis and close threshold distance
      const isVerticalClose =
        closeDirection === 'top' || closeDirection === 'bottom';
      const closeAxisOffset = isVerticalClose ? y : x;
      const viewportSize = isVerticalClose ? viewportHeight : viewportWidth;
      const closeThresholdPx = viewportSize * normalizedThreshold;

      // Determine if dragging towards close direction
      let isTowardsClose = false;
      let rawCloseDistance = 0;

      switch (closeDirection) {
        case 'top':
          isTowardsClose = y < 0;
          rawCloseDistance = Math.abs(Math.min(y, 0));
          break;
        case 'bottom':
          isTowardsClose = y > 0;
          rawCloseDistance = Math.max(y, 0);
          break;
        case 'left':
          isTowardsClose = x < 0;
          rawCloseDistance = Math.abs(Math.min(x, 0));
          break;
        case 'right':
          isTowardsClose = x > 0;
          rawCloseDistance = Math.max(x, 0);
          break;
      }

      // Calculate close progress (0-1) for visual interpolation
      const closeProgress = Math.min(rawCloseDistance / closeThresholdPx, 1);
      const isClosing = closeProgress >= 1;

      // Calculate resistance for wrong-direction drag (elastic bounds)
      let isResisting = false;
      let resistanceIntensity = 0;

      if (!isTowardsClose && enabled) {
        const awayDistance = Math.abs(closeAxisOffset);
        if (awayDistance > threshold) {
          isResisting = true;
          // Elastic resistance intensity
          const elasticDistance = awayDistance - threshold;
          const maxElastic = viewportSize * 0.2; // Max 20% viewport elastic
          resistanceIntensity = Math.min(elasticDistance / maxElastic, 1);
        }
      }

      // Determine drag direction for state
      const dragDirection: DragState['dragDirection'] = isTowardsClose
        ? 'towards-close'
        : Math.abs(closeAxisOffset) > 5
          ? 'away'
          : 'none';

      return {
        isClosing,
        isResisting,
        closeProgress: visualFeedback ? closeProgress : 0,
        resistanceIntensity: visualFeedback
          ? resistanceIntensity * strength
          : 0,
        dragDirection,
      };
    },
    [
      closeDirection,
      normalizedThreshold,
      threshold,
      enabled,
      strength,
      visualFeedback,
    ],
  );

  /**
   * Handle drag movement with elastic physics
   */
  const handleDrag = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      const metrics = calculateDragMetrics(info.offset, info.velocity);

      setDragState({
        shouldClose: metrics.isClosing,
        isBeyondLimit: metrics.isResisting,
        resistanceIntensity: metrics.resistanceIntensity,
        closeProgress: metrics.closeProgress,
        dragDirection: metrics.dragDirection,
      });
    },
    [calculateDragMetrics],
  );

  /**
   * Handle drag end with velocity-aware snap-to-close
   */
  const handleDragEnd = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      const metrics = calculateDragMetrics(info.offset, info.velocity);

      // Get velocity in close direction
      const isVerticalClose =
        closeDirection === 'top' || closeDirection === 'bottom';
      const velocityValue = isVerticalClose ? info.velocity.y : info.velocity.x;

      // Determine if velocity is towards close direction
      let isVelocityTowardsClose = false;
      switch (closeDirection) {
        case 'top':
          isVelocityTowardsClose = velocityValue < -400;
          break;
        case 'bottom':
          isVelocityTowardsClose = velocityValue > 400;
          break;
        case 'left':
          isVelocityTowardsClose = velocityValue < -400;
          break;
        case 'right':
          isVelocityTowardsClose = velocityValue > 400;
          break;
      }

      // Close if: threshold exceeded OR fast velocity towards close
      // Also close if past 50% with moderate velocity (hybrid snap)
      const moderateVelocity = Math.abs(velocityValue) > 200;
      const pastHalfway = metrics.closeProgress > 0.5;

      if (
        metrics.isClosing ||
        isVelocityTowardsClose ||
        (pastHalfway && moderateVelocity)
      ) {
        onClose();
      }

      // Reset state
      setDragState({
        isBeyondLimit: false,
        shouldClose: false,
        resistanceIntensity: 0,
        closeProgress: 0,
        dragDirection: 'none',
      });
    },
    [calculateDragMetrics, closeDirection, onClose],
  );

  return {
    dragState,
    handleDrag,
    handleDragEnd,
  };
}
