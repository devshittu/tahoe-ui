// src/app/playground/code-preview/components/primitives/CopyButton.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '../hooks';
import type { CopyButtonProps } from '../types';
import { getSizeConfig, CODE_PREVIEW_ANIMATIONS } from '../types';

/**
 * CopyButton - Copy code to clipboard with visual feedback
 *
 * Apple-like design:
 * - Subtle glassmorphism background
 * - Smooth icon transition on success
 * - Spring-based animations
 */
export function CopyButton({
  code,
  position = 'top-right',
  size = 'default',
  onCopy,
  className,
  disabled = false,
}: CopyButtonProps) {
  const sizeConfig = getSizeConfig(size);
  const { copy, isCopied, isCopying } = useCopyToClipboard({
    onCopy,
  });

  const handleClick = async () => {
    if (disabled || isCopying) return;
    await copy(code);
  };

  const positionClasses = cn(
    'absolute',
    position === 'top-right' && 'top-2 right-2',
    position === 'top-left' && 'top-2 left-2',
    position === 'bottom-right' && 'bottom-2 right-2',
    position === 'bottom-left' && 'bottom-2 left-2',
  );

  const buttonSize =
    size === 'compact' ? 'w-7 h-7' : size === 'large' ? 'w-9 h-9' : 'w-8 h-8';

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled || isCopying}
      className={cn(
        positionClasses,
        buttonSize,
        'flex items-center justify-center',
        'rounded-lg',
        // Glassmorphism
        'bg-white/80 dark:bg-gray-800/80',
        'backdrop-blur-sm',
        'border border-gray-200/50 dark:border-gray-700/50',
        // Shadow
        'shadow-sm',
        // States
        'hover:bg-white dark:hover:bg-gray-700',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
        'transition-colors duration-150',
        // Disabled
        disabled && 'opacity-50 cursor-not-allowed',
        // Success state
        isCopied &&
          'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200/50 dark:border-emerald-700/50',
        className,
      )}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      transition={CODE_PREVIEW_ANIMATIONS.springGentle}
      aria-label={isCopied ? 'Copied!' : 'Copy code'}
      title={isCopied ? 'Copied!' : 'Copy code'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCopied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={CODE_PREVIEW_ANIMATIONS.spring}
            className="text-emerald-600 dark:text-emerald-400"
          >
            <FiCheck size={sizeConfig.iconSize} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={CODE_PREVIEW_ANIMATIONS.spring}
            className="text-gray-600 dark:text-gray-400"
          >
            <FiCopy size={sizeConfig.iconSize} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default CopyButton;
