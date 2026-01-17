// src/app/playground/breadcrumb/components/BreadcrumbItem.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { BreadcrumbItemProps } from './types';
import { BREADCRUMB_SIZE_CONFIG } from './types';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

/**
 * BreadcrumbItem - Individual breadcrumb item with link or text
 *
 * Features:
 * - Next.js Link integration for navigation
 * - Hover/focus micro-interactions
 * - Current item styling
 * - Icon support
 */
export function BreadcrumbItem({
  item,
  isLast,
  separator,
  size,
  onClick,
}: BreadcrumbItemProps) {
  const config = BREADCRUMB_SIZE_CONFIG[size];
  const { label, href, icon, current } = item;

  const itemClasses = cn(
    'inline-flex items-center',
    config.gap,
    config.text,
    'font-medium',
    'rounded-md',
    'transition-colors duration-150',
    current || isLast
      ? 'text-gray-900 dark:text-gray-100'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
    !current && !isLast && 'hover:bg-gray-100 dark:hover:bg-gray-800',
    config.padding,
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500',
  );

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className={current || isLast ? '' : 'truncate max-w-[120px]'}>
        {label}
      </span>
    </>
  );

  const itemElement =
    href && !current ? (
      <Link href={href} className={itemClasses}>
        {content}
      </Link>
    ) : onClick && !current ? (
      <button
        type="button"
        onClick={() => onClick(item)}
        className={itemClasses}
      >
        {content}
      </button>
    ) : (
      <span
        className={cn(itemClasses, 'cursor-default')}
        aria-current={current ? 'page' : undefined}
      >
        {content}
      </span>
    );

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center"
    >
      {itemElement}
      {!isLast && (
        <span className="mx-1">
          <BreadcrumbSeparator type={separator} size={size} />
        </span>
      )}
    </motion.li>
  );
}

export default BreadcrumbItem;
