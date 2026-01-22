'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useCopyToClipboard } from '../hooks';
import type { CopyButtonProps } from '../types';
import {
  getSizeConfig,
  CODE_PREVIEW_ANIMATIONS,
  CODE_PREVIEW_STYLES,
} from '../types';

// Simple icons as inline SVGs to avoid external dependency
const CopyIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * CopyButton - Copy code to clipboard with visual feedback
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

  const positionClasses = twMerge(
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
      className={twMerge(
        positionClasses,
        buttonSize,
        'flex items-center justify-center',
        'rounded-lg',
        // CSS variable-backed glassmorphism
        CODE_PREVIEW_STYLES.copyButton.base,
        'backdrop-blur-sm',
        CODE_PREVIEW_STYLES.copyButton.border,
        // Shadow
        'shadow-sm',
        // States
        CODE_PREVIEW_STYLES.copyButton.hover,
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500/50',
        'transition-colors duration-150',
        // Disabled
        disabled && 'opacity-50 cursor-not-allowed',
        // Success state
        isCopied && CODE_PREVIEW_STYLES.copyButton.success,
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
            className="text-success dark:text-success"
          >
            <CheckIcon size={sizeConfig.iconSize} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={CODE_PREVIEW_ANIMATIONS.spring}
            className={CODE_PREVIEW_STYLES.copyButton.icon}
          >
            <CopyIcon size={sizeConfig.iconSize} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default CopyButton;
