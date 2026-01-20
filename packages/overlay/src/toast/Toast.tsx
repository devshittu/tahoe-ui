'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useToastStore } from './store';
import type { Toast as ToastType, ToastPosition } from './types';
import { TOAST_VARIANT_STYLES } from './types';
import {
  CheckIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
} from '../icons';

interface ToastProps {
  toast: ToastType;
  position: ToastPosition;
  index: number;
}

function getVariantIcon(variant: ToastType['variant']) {
  const iconMap = {
    default: null,
    success: CheckIcon,
    error: AlertCircleIcon,
    warning: AlertTriangleIcon,
    info: InfoIcon,
  };
  return iconMap[variant];
}

function getAnimationConfig(position: ToastPosition) {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('left');
  const isCenter = position.endsWith('center');

  return {
    initial: {
      opacity: 0,
      y: isTop ? -20 : 20,
      x: isCenter ? 0 : isLeft ? -20 : 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: isTop ? -10 : 10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };
}

/**
 * Simple swipe detection for toast dismissal
 */
function useSimpleSwipe(onSwipe: () => void, disabled: boolean) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const handleStart = useCallback((x: number) => {
    setIsDragging(true);
    setStartX(x);
    setOffsetX(0);
  }, []);

  const handleMove = useCallback(
    (x: number) => {
      if (!isDragging) return;
      setOffsetX(x - startX);
    },
    [isDragging, startX],
  );

  const handleEnd = useCallback(() => {
    if (Math.abs(offsetX) > 60 && !disabled) {
      onSwipe();
    }
    setIsDragging(false);
    setOffsetX(0);
  }, [offsetX, onSwipe, disabled]);

  return {
    offset: { x: offsetX },
    isSwiping: isDragging,
    handlers: {
      onMouseDown: (e: React.MouseEvent) => handleStart(e.clientX),
      onMouseMove: (e: React.MouseEvent) => handleMove(e.clientX),
      onMouseUp: handleEnd,
      onMouseLeave: handleEnd,
      onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientX),
      onTouchMove: (e: React.TouchEvent) => handleMove(e.touches[0].clientX),
      onTouchEnd: handleEnd,
    },
  };
}

export function Toast({ toast, position, index }: ToastProps) {
  const { dismiss, pause, resume } = useToastStore();
  const styles = TOAST_VARIANT_STYLES[toast.variant];
  const Icon = toast.icon ? null : getVariantIcon(toast.variant);
  const progressRef = useRef<HTMLDivElement>(null);

  const canSwipe = toast.swipeEnabled && toast.dismissMode === 'gesture';

  const { offset, isSwiping, handlers } = useSimpleSwipe(
    () => dismiss(toast.id),
    !canSwipe,
  );

  useEffect(() => {
    if (toast.duration <= 0 || toast.isPaused || !progressRef.current) return;

    const el = progressRef.current;
    el.style.transition = 'none';
    el.style.width = '100%';

    el.offsetHeight;

    el.style.transition = `width ${toast.remainingDuration}ms linear`;
    el.style.width = '0%';
  }, [toast.duration, toast.isPaused, toast.remainingDuration]);

  const handleActionClick = () => {
    toast.action?.onClick();
    if (
      toast.action?.dismissOnClick !== false ||
      toast.dismissMode === 'action-only'
    ) {
      dismiss(toast.id);
    }
  };

  const animationConfig = getAnimationConfig(position);

  return (
    <motion.div
      layout
      initial={animationConfig.initial}
      animate={toast.isExiting ? animationConfig.exit : animationConfig.animate}
      exit={animationConfig.exit}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        layout: { duration: 0.2 },
      }}
      style={{
        x: isSwiping ? offset.x : 0,
        opacity: isSwiping ? 1 - Math.abs(offset.x) / 150 : 1,
      }}
      onMouseEnter={() => pause(toast.id)}
      onMouseLeave={() => {
        resume(toast.id);
        if (canSwipe) handlers.onMouseLeave();
      }}
      onMouseDown={canSwipe ? handlers.onMouseDown : undefined}
      onMouseMove={canSwipe ? handlers.onMouseMove : undefined}
      onMouseUp={canSwipe ? handlers.onMouseUp : undefined}
      onTouchStart={canSwipe ? handlers.onTouchStart : undefined}
      onTouchMove={canSwipe ? handlers.onTouchMove : undefined}
      onTouchEnd={canSwipe ? handlers.onTouchEnd : undefined}
      className={twMerge(
        'relative w-full max-w-sm overflow-hidden',
        'rounded-xl border shadow-lg',
        canSwipe && 'cursor-grab active:cursor-grabbing',
        styles.bg,
        styles.border,
      )}
      role="alert"
      aria-live="polite"
    >
      {toast.showHandlebar && toast.dismissMode === 'gesture' && (
        <button
          type="button"
          onClick={() => dismiss(toast.id)}
          className="absolute top-0 left-0 right-0 flex justify-center pt-2 pb-1 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <div
            className={twMerge(
              'w-10 h-1 rounded-full',
              'bg-gray-300 dark:bg-gray-600',
              'opacity-60 hover:opacity-100',
              'transition-opacity duration-150',
            )}
          />
        </button>
      )}

      {toast.duration > 0 && (
        <div
          className={twMerge(
            'absolute left-0 right-0 h-1 bg-gray-200/50 dark:bg-gray-700/50',
            toast.showHandlebar ? 'top-4' : 'top-0',
          )}
        >
          <div
            ref={progressRef}
            className={twMerge(
              'h-full',
              toast.variant === 'success' && 'bg-emerald-500',
              toast.variant === 'error' && 'bg-red-500',
              toast.variant === 'warning' && 'bg-amber-500',
              toast.variant === 'info' && 'bg-blue-500',
              toast.variant === 'default' && 'bg-gray-400 dark:bg-gray-500',
            )}
          />
        </div>
      )}

      <div
        className={twMerge(
          'flex items-start gap-3 p-4',
          toast.showHandlebar && 'pt-6',
          toast.duration > 0 && !toast.showHandlebar && 'pt-5',
        )}
      >
        {(Icon || toast.icon) && (
          <div className={twMerge('flex-shrink-0 mt-0.5', styles.icon)}>
            {toast.icon || (Icon && <Icon className="w-5 h-5" />)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {toast.title && (
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {toast.title}
            </p>
          )}
          <div className={twMerge('text-sm', styles.text)}>
            {typeof toast.message === 'string' ? (
              <p className={twMerge('text-sm', styles.text)}>{toast.message}</p>
            ) : (
              toast.message
            )}
          </div>

          {toast.action && (
            <button
              onClick={handleActionClick}
              className={twMerge(
                'mt-3 px-3 py-1.5 rounded-lg',
                'text-sm font-medium',
                'transition-colors duration-150',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                toast.variant === 'default' &&
                  'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 focus:ring-gray-500',
                toast.variant === 'success' &&
                  'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
                toast.variant === 'error' &&
                  'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
                toast.variant === 'warning' &&
                  'bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500',
                toast.variant === 'info' &&
                  'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
              )}
            >
              {toast.action.label}
            </button>
          )}

          {toast.dismissMode === 'gesture' &&
            !toast.action &&
            toast.duration === 0 && (
              <p className="mt-2 text-xs opacity-60">Swipe to dismiss</p>
            )}
        </div>
      </div>
    </motion.div>
  );
}

export default Toast;
