// src/app/playground/modal/components/PageMode/PageMode.tsx
'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import { useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Portal } from '@/HOC/Portal';
import SafeMotionDiv from '@/components/Motion/SafeMotionDiv';
import { trackPageModeEvent } from '@/components/analytics/analytics';
import { SPACING_TOKENS } from '@/config/tokens';

// Store
import { usePageMode, useModals } from '../stores/useModalStore';

// Shared hooks
import { useModalDrag, useModalA11y, useReducedMotion } from '../shared/hooks';

// Shared components
import { ModalBackdrop } from '../shared/components';
import { HandlebarZone } from '../shared/HandlebarZone';

// Shared utilities
import {
  createSlideVariants,
  getDragAxis,
  getDragConstraints,
  getRoundedClasses,
} from '../shared/animations';
import {
  DEFAULT_BACKDROP_EFFECTS,
  DEFAULT_LOADING_STATE,
} from '../shared/types';
import type {
  Position,
  A11yOptions,
  DragResistanceConfig,
  BackdropEffectsConfig,
  SquashStretchConfig,
  LoadingStateConfig,
} from '../shared/types';

export type PageModeProps = {
  position?: Position;
  a11yOptions?: A11yOptions;
  useContainer?: boolean;
  roundedEdges?: boolean;
  themeable?: boolean;
  closeThreshold?: number;
  enhancedCloseBox?: boolean;
  enableContentScroll?: boolean;
  zIndex?: number;
  resistance?: DragResistanceConfig;
  backdropEffects?: BackdropEffectsConfig;
  squashStretch?: SquashStretchConfig;
  loadingState?: LoadingStateConfig;
  size?: 'small' | 'medium' | 'large' | 'full';
};

/**
 * PageMode Component - Full-screen overlay panel with Zustand state
 *
 * Features:
 * - HeadlessUI foundation for accessibility
 * - Global state integration via Zustand store
 * - Enhanced drag physics with resistance
 * - Squash-and-stretch animation
 * - Backdrop blur and scale effects
 * - Loading state with shimmer
 * - Focus trapping and screen reader support
 * - Reduced motion support
 */
export function PageMode({
  position: defaultPosition = 'bottom',
  a11yOptions = {},
  useContainer = false,
  roundedEdges = false,
  themeable = false,
  closeThreshold = 0.15, // 15% threshold for snappy close feel
  enhancedCloseBox = true, // Deprecated: visual feedback now via subtle transforms
  enableContentScroll = true,
  zIndex: propZIndex,
  resistance,
  backdropEffects,
  squashStretch,
  loadingState,
  size: defaultSize = 'large',
}: PageModeProps) {
  // Global state from Zustand store
  const {
    isOpen,
    isClosing,
    content,
    close,
    completeClose,
    id: modalId,
    position: storePosition,
    size: storeSize,
    isLoading: storeIsLoading,
    loadingMessage: storeLoadingMessage,
  } = usePageMode();

  // Get modal instance from store for z-index
  const { getPageMode } = useModals();
  const modalInstance = getPageMode();
  const zIndex =
    modalInstance?.zIndex || propZIndex || SPACING_TOKENS.zIndex.modal;

  // Use store values if available, otherwise use defaults
  const position = storePosition || defaultPosition;
  const size = storeSize || defaultSize;

  // Merge configs with defaults
  const backdropConfig = { ...DEFAULT_BACKDROP_EFFECTS, ...backdropEffects };
  const loadingConfig = {
    ...DEFAULT_LOADING_STATE,
    ...loadingState,
    isLoading: storeIsLoading || loadingState?.isLoading || false,
    message: storeLoadingMessage || loadingState?.message,
  };

  // Motion preferences
  const { prefersReducedMotion } = useReducedMotion();

  // Drag controls
  const dragControls = useDragControls();

  // Combined accessibility hook
  const { containerRef, ariaProps, a11y } = useModalA11y({
    prefix: 'pagemode',
    isOpen,
    a11yOptions,
    isLoading: loadingConfig.isLoading,
    loadingMessage: loadingConfig.message,
  });

  // Combined drag hook - closeDirection is position (drag back to edge closes)
  const {
    dragState,
    squashState,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    handlePointerDown,
    isInteractionLocked,
  } = useModalDrag({
    position,
    closeDirection: position, // PageMode closes by dragging back to its edge
    closeThreshold,
    resistance,
    squashStretch,
    loadingState: loadingConfig,
    onClose: close,
  });

  // Calculate subtle transform feedback based on close progress
  const closeProgress = dragState.closeProgress;
  const closeFeedbackScale = 1 - closeProgress * 0.03; // Subtle scale for edge panels
  const closeFeedbackOpacity = 1 - closeProgress * 0.25;

  // Analytics tracking
  const hasTrackedOpen = useRef(false);
  useEffect(() => {
    if (isOpen && !hasTrackedOpen.current) {
      trackPageModeEvent('PageModeOpened');
      hasTrackedOpen.current = true;
    }
    if (!isOpen) {
      hasTrackedOpen.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isClosing) {
      trackPageModeEvent('PageModeClosed');
    }
  }, [isClosing]);

  // Transition complete handler - removes modal from stack after exit animation
  const handleAfterLeave = useCallback(() => {
    completeClose();
  }, [completeClose]);

  // Framer Motion variants for slide animation
  const variants = createSlideVariants(position, prefersReducedMotion);

  // Derived values
  const dragAxis = getDragAxis(position);
  const dragConstraints = getDragConstraints(position);

  // Close handler
  const handleClose = () => {
    if (isInteractionLocked) return;
    close();
  };

  // Can close while loading?
  const canClose =
    !isInteractionLocked && a11y.closeOnOutsideClick && a11y.escapeClose;

  // PageMode handlebar is on OPPOSITE side
  const getHandlebarPosition = (pageModePosition: Position): Position => {
    switch (pageModePosition) {
      case 'top':
        return 'bottom';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
    }
  };

  // Styling - Apple-inspired edge panel surface
  const roundClass = getRoundedClasses(position, roundedEdges);
  const themeClass = themeable
    ? 'dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';

  // Get edge-specific border and highlight styling
  const edgeStyles = getEdgeSurfaceStyles(position);

  const containerClasses = twMerge(
    'fixed flex flex-col will-change-transform',
    roundClass,
    themeClass,
    // Refined shadow (Principle #10: not heavier than allowed)
    'shadow-[0_8px_16px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)]',
    'dark:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]',
    // Subtle border for edge definition
    edgeStyles.borderClass,
  );

  // Size-based dimensions
  const sizeStyles = getSizeStyles(position, size);

  // Content scroll behavior
  const contentOverflow = enableContentScroll
    ? position === 'top' || position === 'bottom'
      ? 'overflow-y-auto'
      : 'overflow-x-auto'
    : 'overflow-hidden';

  // Margin to avoid handlebar overlap (token-based: 52px)
  const getMarginClass = () => {
    switch (position) {
      case 'top':
        return 'mb-14'; // 56px for handlebar zone
      case 'bottom':
        return 'mt-14';
      case 'left':
        return 'mr-14';
      case 'right':
        return 'ml-14';
    }
  };

  // Content wrapper
  const renderedContent = useContainer ? (
    <div className="container mx-auto h-full">{content}</div>
  ) : (
    content
  );

  // Dialog open state: close when isClosing is true to trigger leave animation
  // The modal stays in stack until afterLeave completes
  const dialogOpen = isOpen && !isClosing;

  return (
    <Portal>
      <HeadlessDialog
        open={dialogOpen}
        onClose={canClose ? handleClose : () => {}}
        className="relative"
        style={{ zIndex }}
        {...ariaProps}
      >
        {/* Backdrop */}
        <ModalBackdrop
          backdropConfig={backdropConfig}
          zIndex={zIndex - 1}
          onClose={handleClose}
          canClose={!isInteractionLocked && a11y.closeOnOutsideClick}
        />

        {/* Close feedback is now via subtle modal transforms (scale/opacity)
            The old CloseIndicator has been replaced with more refined visual feedback */}

        {/* PageMode Panel with TransitionChild for proper lifecycle */}
        <TransitionChild
          afterLeave={handleAfterLeave}
          enter={prefersReducedMotion ? 'duration-0' : 'ease-out duration-350'}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={prefersReducedMotion ? 'duration-0' : 'ease-in duration-250'}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel
            as={SafeMotionDiv}
            ref={containerRef}
            className={containerClasses}
            custom={position}
            variants={variants}
            initial="hidden"
            animate={isClosing ? 'exit' : 'visible'}
            exit="exit"
            style={{
              ...sizeStyles,
              // Combine squash-stretch with close feedback
              scaleX: squashState.scaleX * closeFeedbackScale,
              scaleY: squashState.scaleY * closeFeedbackScale,
              opacity: closeFeedbackOpacity,
              zIndex,
            }}
            drag={dragAxis}
            dragControls={dragControls}
            dragListener={false}
            dragElastic={0.08}
            dragConstraints={dragConstraints}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {/* Handlebar - on opposite side */}
            <HandlebarZone
              position={getHandlebarPosition(position)}
              onPointerDown={(e) =>
                handlePointerDown(e, containerRef, dragControls)
              }
              onClick={handleClose}
              isBeyondLimit={dragState.isBeyondLimit}
              resistanceIntensity={dragState.resistanceIntensity}
              closeProgress={closeProgress}
              ariaLabel={a11y.handlebarAriaLabel}
              loadingState={loadingConfig}
            />

            {/* Content */}
            <div
              className={twMerge(
                'flex-1 p-4',
                contentOverflow,
                getMarginClass(),
              )}
            >
              {renderedContent}
            </div>
          </DialogPanel>
        </TransitionChild>
      </HeadlessDialog>
    </Portal>
  );
}

/**
 * Get edge-specific surface styles for Apple-inspired depth
 * Adds subtle border only on the exposed edge for clean separation
 */
function getEdgeSurfaceStyles(position: Position): {
  borderClass: string;
} {
  // Border only on the edge facing content, not all sides
  switch (position) {
    case 'top':
      return {
        borderClass: 'border-b border-gray-200/60 dark:border-gray-700/60',
      };
    case 'bottom':
      return {
        borderClass: 'border-t border-gray-200/60 dark:border-gray-700/60',
      };
    case 'left':
      return {
        borderClass: 'border-r border-gray-200/60 dark:border-gray-700/60',
      };
    case 'right':
      return {
        borderClass: 'border-l border-gray-200/60 dark:border-gray-700/60',
      };
  }
}

/**
 * Get size-based styles for PageMode dimensions
 * Uses token-based size values
 */
function getSizeStyles(
  position: Position,
  size: PageModeProps['size'],
): React.CSSProperties {
  const isHorizontal = position === 'left' || position === 'right';
  const { modalSize } = SPACING_TOKENS;

  const sizeMap = {
    small: isHorizontal ? `${modalSize.small}vw` : `${modalSize.small}vh`,
    medium: isHorizontal ? `${modalSize.medium}vw` : `${modalSize.medium}vh`,
    large: isHorizontal ? `${modalSize.large}vw` : `${modalSize.large}vh`,
    full: isHorizontal ? `${modalSize.full}vw` : `${modalSize.full}vh`,
  };

  const dimension = sizeMap[size || 'large'];

  const baseStyles: React.CSSProperties = {
    position: 'fixed' as const,
  };

  switch (position) {
    case 'top':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        width: '100%',
        height: dimension,
      };
    case 'bottom':
      return {
        ...baseStyles,
        bottom: 0,
        left: 0,
        width: '100%',
        height: dimension,
      };
    case 'left':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        width: dimension,
        height: '100%',
      };
    case 'right':
      return {
        ...baseStyles,
        top: 0,
        right: 0,
        width: dimension,
        height: '100%',
      };
  }
}
