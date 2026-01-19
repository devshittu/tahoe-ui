'use client';

import { useState, useCallback, useMemo } from 'react';
import { PanInfo } from 'framer-motion';
import { Position, DragResistanceConfig } from './types';

type DragState = {
  isBeyondLimit: boolean;
  shouldClose: boolean;
  resistanceIntensity: number;
  closeProgress: number;
  dragDirection: 'towards-close' | 'away' | 'none';
};

type UseDragResistanceOptions = {
  position: Position;
  closeDirection: Position;
  closeThreshold: number;
  resistance?: DragResistanceConfig;
  onClose: () => void;
};

/**
 * Advanced drag resistance hook with bi-directional physics
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
    threshold = 30,
    strength = 0.7,
    visualFeedback = true,
  } = resistance;

  const [dragState, setDragState] = useState<DragState>({
    isBeyondLimit: false,
    shouldClose: false,
    resistanceIntensity: 0,
    closeProgress: 0,
    dragDirection: 'none',
  });

  const normalizedThreshold = useMemo(
    () => Math.min(Math.max(closeThreshold, 0), 1),
    [closeThreshold],
  );

  const calculateDragMetrics = useCallback(
    (offset: { x: number; y: number }, velocity?: { x: number; y: number }) => {
      const { x, y } = offset;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const isVerticalClose =
        closeDirection === 'top' || closeDirection === 'bottom';
      const closeAxisOffset = isVerticalClose ? y : x;
      const viewportSize = isVerticalClose ? viewportHeight : viewportWidth;
      const closeThresholdPx = viewportSize * normalizedThreshold;

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

      const closeProgress = Math.min(rawCloseDistance / closeThresholdPx, 1);
      const isClosing = closeProgress >= 1;

      let isResisting = false;
      let resistanceIntensity = 0;

      if (!isTowardsClose && enabled) {
        const awayDistance = Math.abs(closeAxisOffset);
        if (awayDistance > threshold) {
          isResisting = true;
          const elasticDistance = awayDistance - threshold;
          const maxElastic = viewportSize * 0.2;
          resistanceIntensity = Math.min(elasticDistance / maxElastic, 1);
        }
      }

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

  const handleDragEnd = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      const metrics = calculateDragMetrics(info.offset, info.velocity);

      const isVerticalClose =
        closeDirection === 'top' || closeDirection === 'bottom';
      const velocityValue = isVerticalClose ? info.velocity.y : info.velocity.x;

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

      const moderateVelocity = Math.abs(velocityValue) > 200;
      const pastHalfway = metrics.closeProgress > 0.5;

      if (
        metrics.isClosing ||
        isVelocityTowardsClose ||
        (pastHalfway && moderateVelocity)
      ) {
        onClose();
      }

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
