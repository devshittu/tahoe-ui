// src/app/playground/breadcrumb/components/BreadcrumbSeparator.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FiChevronRight, FiArrowRight } from 'react-icons/fi';
import type {
  BreadcrumbSeparator as SeparatorType,
  BreadcrumbSize,
} from './types';
import { BREADCRUMB_SIZE_CONFIG } from './types';

interface BreadcrumbSeparatorProps {
  type: SeparatorType;
  size: BreadcrumbSize;
  className?: string;
}

/**
 * BreadcrumbSeparator - Animated separator between breadcrumb items
 *
 * Features:
 * - Multiple separator styles (chevron, slash, arrow, dot)
 * - Subtle entrance animation
 * - Size-responsive
 */
export function BreadcrumbSeparator({
  type,
  size,
  className,
}: BreadcrumbSeparatorProps) {
  const config = BREADCRUMB_SIZE_CONFIG[size];

  const separatorContent = () => {
    switch (type) {
      case 'chevron':
        return <FiChevronRight className={config.icon} />;
      case 'arrow':
        return <FiArrowRight className={config.icon} />;
      case 'slash':
        return <span className={config.text}>/</span>;
      case 'dot':
        return (
          <span
            className={cn(
              'rounded-full bg-current',
              size === 'sm' && 'w-1 h-1',
              size === 'md' && 'w-1.5 h-1.5',
              size === 'lg' && 'w-2 h-2',
            )}
          />
        );
      default:
        return <FiChevronRight className={config.icon} />;
    }
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'flex items-center justify-center',
        'text-gray-400 dark:text-gray-500',
        'select-none',
        className,
      )}
      aria-hidden="true"
    >
      {separatorContent()}
    </motion.span>
  );
}

export default BreadcrumbSeparator;
