// src/app/playground/modal/components/Dialog/Dialog.tsx
'use client';

import React from 'react';
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import { useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Portal } from '@/HOC/Portal';
import SafeMotionDiv from '@/components/Motion/SafeMotionDiv';
import { SPACING_TOKENS } from '@/config/tokens';

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
  getContentPadding,
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
  DialogSizingConfig,
} from '../shared/types';
import { getDialogSizingStyles } from '../shared/sizing';

export type DialogProps = {
  isOpen?: boolean;
  onClose?: () => void;
  showFrom?: Position;
  handlebarPosition?: Position;
  roundedEdges?: boolean;
  themeable?: boolean;
  a11yOptions?: A11yOptions;
  closeThreshold?: number;
  enhancedCloseBox?: boolean;
  useContainer?: boolean;
  zIndex?: number;
  resistance?: DragResistanceConfig;
  backdropEffects?: BackdropEffectsConfig;
  squashStretch?: SquashStretchConfig;
  loadingState?: LoadingStateConfig;
  /**
   * Content-adaptive sizing configuration
   * @default { preset: 'default' } - fits content, max 600px
   */
  sizing?: DialogSizingConfig;
  children: React.ReactNode;
};

/**
 * Dialog Component - Centered modal with gesture-based dismissal
 *
 * Features:
 * - HeadlessUI foundation for accessibility
 * - Enhanced drag physics with resistance
 * - Squash-and-stretch animation
 * - Backdrop blur and scale effects
 * - Loading state with shimmer
 * - Focus trapping and screen reader support
 * - Reduced motion support
 */
export function Dialog({
  isOpen = false,
  onClose,
  showFrom = 'top',
  handlebarPosition = 'top',
  roundedEdges = false,
  themeable = false,
  a11yOptions = {},
  closeThreshold = 0.15, // 15% threshold for snappy close feel
  enhancedCloseBox = false, // Deprecated: visual feedback now via subtle transforms
  useContainer = false,
  zIndex = SPACING_TOKENS.zIndex.backdrop,
  resistance,
  backdropEffects,
  squashStretch,
  loadingState,
  sizing,
  children,
}: DialogProps) {
  // Merge configs with defaults
  const backdropConfig = { ...DEFAULT_BACKDROP_EFFECTS, ...backdropEffects };
  const loadingConfig = { ...DEFAULT_LOADING_STATE, ...loadingState };

  // Content-adaptive sizing styles
  const sizingStyles = getDialogSizingStyles(sizing);

  // Motion preferences
  const { prefersReducedMotion } = useReducedMotion();

  // Drag controls
  const dragControls = useDragControls();

  // Combined accessibility hook
  const { containerRef, ariaProps, a11y } = useModalA11y({
    prefix: 'dialog',
    isOpen,
    a11yOptions,
    isLoading: loadingConfig.isLoading,
    loadingMessage: loadingConfig.message,
  });

  // Combined drag hook - closeDirection is showFrom (drag back to entry closes)
  const {
    dragState,
    squashState,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    handlePointerDown,
    isInteractionLocked,
  } = useModalDrag({
    position: handlebarPosition,
    closeDirection: showFrom,
    closeThreshold,
    resistance,
    squashStretch,
    loadingState: loadingConfig,
    onClose: onClose || (() => {}),
  });

  // Calculate subtle transform feedback based on close progress
  const closeProgress = dragState.closeProgress;
  const closeFeedbackScale = 1 - closeProgress * 0.05; // Scale down to 0.95 at max
  const closeFeedbackOpacity = 1 - closeProgress * 0.3; // Fade to 0.7 at max

  // Derived values - use showFrom for close direction, bi-directional for centered modal
  const dragAxis = getDragAxis(showFrom);
  const dragConstraints = getDragConstraints(showFrom, {
    allowBidirectional: true,
  });
  const variants = createSlideVariants(showFrom, prefersReducedMotion);

  // Close handler
  const handleClose = () => {
    if (isInteractionLocked) return;
    onClose?.();
  };

  // Can close while loading?
  const canClose =
    !isInteractionLocked && a11y.closeOnOutsideClick && a11y.escapeClose;

  // Styling
  const themeClass = themeable
    ? 'dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';

  const dialogClasses = twMerge(
    'relative',
    'shadow-xl rounded-2xl max-h-[90vh] flex flex-col overflow-hidden',
    themeClass,
  );

  const contentPadding = getContentPadding(handlebarPosition);
  const scrollClass =
    a11y.scrollable !== false ? 'overflow-auto' : 'overflow-hidden';

  return (
    <Portal id="dialog-portal">
      <HeadlessDialog
        open={isOpen}
        onClose={canClose ? handleClose : () => {}}
        className="relative"
        style={{ zIndex: zIndex + 1 }}
        {...ariaProps}
      >
        {/* Backdrop */}
        <ModalBackdrop
          backdropConfig={backdropConfig}
          zIndex={zIndex}
          onClose={handleClose}
          canClose={!isInteractionLocked && a11y.closeOnOutsideClick}
        />

        {/* Dialog container */}
        <div
          className="fixed inset-0 flex items-center justify-center px-4"
          style={{ zIndex: zIndex + 1 }}
        >
          <TransitionChild
            enter={
              prefersReducedMotion ? 'duration-0' : 'ease-out duration-200'
            }
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave={prefersReducedMotion ? 'duration-0' : 'ease-in duration-150'}
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              as={SafeMotionDiv}
              ref={containerRef}
              className={dialogClasses}
              custom={showFrom}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              drag={dragAxis}
              dragControls={dragControls}
              dragListener={false}
              dragElastic={0.05}
              dragConstraints={dragConstraints}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              style={{
                touchAction: 'none',
                // Content-adaptive sizing
                ...sizingStyles,
                // Combine squash-stretch with close feedback
                scaleX: squashState.scaleX * closeFeedbackScale,
                scaleY: squashState.scaleY * closeFeedbackScale,
                opacity: closeFeedbackOpacity,
                // Subtle blur as approaching close threshold
                filter:
                  closeProgress > 0.5
                    ? `blur(${(closeProgress - 0.5) * 2}px)`
                    : undefined,
              }}
            >
              {/* Handlebar */}
              <HandlebarZone
                position={handlebarPosition}
                onPointerDown={(e) =>
                  handlePointerDown(e, containerRef, dragControls)
                }
                onClick={handleClose}
                isBeyondLimit={dragState.isBeyondLimit}
                resistanceIntensity={dragState.resistanceIntensity}
                ariaLabel={a11y.handlebarAriaLabel}
                loadingState={loadingConfig}
              />

              {/* Close feedback is now via subtle modal transforms (scale/opacity/blur)
                  The old CloseIndicator has been replaced with more refined visual feedback */}

              {/* Content */}
              <div
                className={twMerge(
                  'flex-1',
                  scrollClass,
                  contentPadding,
                  useContainer && 'container mx-auto',
                )}
              >
                {children}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </HeadlessDialog>
    </Portal>
  );
}
