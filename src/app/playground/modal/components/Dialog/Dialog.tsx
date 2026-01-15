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
import { ModalBackdrop, CloseIndicator } from '../shared/components';
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
} from '../shared/types';

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
  closeThreshold = 0.5,
  enhancedCloseBox = false,
  useContainer = false,
  zIndex = SPACING_TOKENS.zIndex.backdrop,
  resistance,
  backdropEffects,
  squashStretch,
  loadingState,
  children,
}: DialogProps) {
  // Merge configs with defaults
  const backdropConfig = { ...DEFAULT_BACKDROP_EFFECTS, ...backdropEffects };
  const loadingConfig = { ...DEFAULT_LOADING_STATE, ...loadingState };

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

  // Combined drag hook
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
    closeThreshold,
    resistance,
    squashStretch,
    loadingState: loadingConfig,
    onClose: onClose || (() => {}),
  });

  // Derived values
  const dragAxis = getDragAxis(handlebarPosition);
  const dragConstraints = getDragConstraints(handlebarPosition);
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
    'relative w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg',
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
                scaleX: squashState.scaleX,
                scaleY: squashState.scaleY,
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

              {/* Close indicator */}
              {enhancedCloseBox && (
                <CloseIndicator
                  isVisible={dragState.shouldClose && !loadingConfig.isLoading}
                  zIndex={zIndex + 2}
                />
              )}

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
