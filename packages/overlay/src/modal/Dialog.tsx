'use client';

import React from 'react';
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import { useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Portal } from '../utils/Portal';
import SafeMotionDiv from '../utils/SafeMotionDiv';

import { useModalDrag, useModalA11y, useReducedMotion } from './shared/hooks';
import { ModalBackdrop } from './shared/components';
import { HandlebarZone } from './shared/HandlebarZone';
import {
  createSlideVariants,
  getDragAxis,
  getDragConstraints,
  getContentPadding,
} from './shared/animations';
import {
  DEFAULT_BACKDROP_EFFECTS,
  DEFAULT_LOADING_STATE,
  SPACING_DEFAULTS,
} from './shared/types';
import type {
  Position,
  A11yOptions,
  DragResistanceConfig,
  BackdropEffectsConfig,
  SquashStretchConfig,
  LoadingStateConfig,
  DialogSizingConfig,
} from './shared/types';
import { getDialogSizingStyles } from './shared/sizing';

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
  sizing?: DialogSizingConfig;
  children: React.ReactNode;
};

/**
 * Dialog Component - Centered modal with gesture-based dismissal
 */
export function Dialog({
  isOpen = false,
  onClose,
  showFrom = 'top',
  handlebarPosition = 'top',
  roundedEdges = false,
  themeable = false,
  a11yOptions = {},
  closeThreshold = 0.15,
  enhancedCloseBox = false,
  useContainer = false,
  zIndex = SPACING_DEFAULTS.zIndex.backdrop,
  resistance,
  backdropEffects,
  squashStretch,
  loadingState,
  sizing,
  children,
}: DialogProps) {
  const backdropConfig = { ...DEFAULT_BACKDROP_EFFECTS, ...backdropEffects };
  const loadingConfig = { ...DEFAULT_LOADING_STATE, ...loadingState };

  const sizingStyles = getDialogSizingStyles(sizing);
  const { prefersReducedMotion } = useReducedMotion();
  const dragControls = useDragControls();

  const { containerRef, ariaProps, a11y } = useModalA11y({
    prefix: 'dialog',
    isOpen,
    a11yOptions,
    isLoading: loadingConfig.isLoading,
    loadingMessage: loadingConfig.message,
  });

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

  const closeProgress = dragState.closeProgress;
  const closeFeedbackScale = 1 - closeProgress * 0.05;
  const closeFeedbackOpacity = 1 - closeProgress * 0.3;

  const dragAxis = getDragAxis(showFrom);
  const dragConstraints = getDragConstraints(showFrom, {
    allowBidirectional: true,
  });
  const variants = createSlideVariants(showFrom, prefersReducedMotion);

  const handleClose = () => {
    if (isInteractionLocked) return;
    onClose?.();
  };

  const canClose =
    !isInteractionLocked && a11y.closeOnOutsideClick && a11y.escapeClose;

  const themeClass = themeable
    ? 'dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';

  const dialogClasses = twMerge(
    'relative',
    'max-h-[90vh] flex flex-col overflow-hidden',
    'rounded-2xl',
    'border border-gray-200/60 dark:border-gray-700/60',
    'shadow-[0_8px_16px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)]',
    'dark:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]',
    themeClass,
    'before:absolute before:inset-x-0 before:top-0 before:h-px',
    'before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent',
    'dark:before:via-white/10',
    'before:pointer-events-none before:z-10',
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
        <ModalBackdrop
          backdropConfig={backdropConfig}
          zIndex={zIndex}
          onClose={handleClose}
          canClose={!isInteractionLocked && a11y.closeOnOutsideClick}
        />

        <div
          className="fixed inset-0 flex items-center justify-center px-4"
          style={{ zIndex: zIndex + 1 }}
        >
          <TransitionChild
            enter={
              prefersReducedMotion ? 'duration-0' : 'ease-out duration-300'
            }
            enterFrom="opacity-0 scale-[0.97]"
            enterTo="opacity-100 scale-100"
            leave={prefersReducedMotion ? 'duration-0' : 'ease-in duration-200'}
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-[0.97]"
          >
            <DialogPanel
              as={SafeMotionDiv as any}
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
                ...sizingStyles,
                scaleX: squashState.scaleX * closeFeedbackScale,
                scaleY: squashState.scaleY * closeFeedbackScale,
                opacity: closeFeedbackOpacity,
                filter:
                  closeProgress > 0.5
                    ? `blur(${(closeProgress - 0.5) * 2}px)`
                    : undefined,
              }}
            >
              <HandlebarZone
                position={handlebarPosition}
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
