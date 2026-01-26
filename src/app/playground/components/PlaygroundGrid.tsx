// src/app/playground/components/PlaygroundGrid.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Heading, Text, SmallText } from '@/components/Typography';
import {
  playgroundCategories,
  statusColors,
  statusLabels,
  type PlaygroundComponent,
  type PlaygroundCategory,
} from '@/lib/playground-data';
import {
  FiLayout,
  FiMessageSquare,
  FiLayers,
  FiMove,
  FiBox,
  FiArrowRight,
  FiCheck,
} from 'react-icons/fi';

/** View mode type for grid/list toggle */
export type ViewMode = 'grid' | 'list';

/**
 * Icon mapping for categories
 */
const categoryIcons: Record<string, React.ElementType> = {
  'display-utility': FiLayout,
  'feedback-messaging': FiMessageSquare,
  'interactive-surfaces': FiLayers,
  gestural: FiMove,
  foundation: FiBox,
};

/**
 * Animation variants for staggered grid
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

interface PlaygroundGridProps {
  className?: string;
  /** Filter to show only specific category */
  categoryFilter?: string;
  /** Show category headers */
  showCategories?: boolean;
  /** View mode: grid or list */
  viewMode?: ViewMode;
}

/**
 * Playground Card Grid
 *
 * Features:
 * - Responsive grid layout
 * - Category sections with icons
 * - Status badges
 * - Staggered animation on mount
 * - Hover effects following design principles
 *
 * Design Principles:
 * - #2 Visual Hierarchy: Clear category → component structure
 * - #3 Intentional White Space: 24px gap between sections
 * - #9 Obvious Affordances: Cards look clickable
 * - #16 Micro-Interaction Precision: Subtle hover transforms
 */
export function PlaygroundGrid({
  className,
  categoryFilter,
  showCategories = true,
  viewMode = 'grid',
}: PlaygroundGridProps) {
  const categories = categoryFilter
    ? playgroundCategories.filter((cat) => cat.id === categoryFilter)
    : playgroundCategories;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-10', className)}
    >
      {categories.map((category) => (
        <CategoryGrid
          key={category.id}
          category={category}
          showHeader={showCategories}
          viewMode={viewMode}
        />
      ))}
    </motion.div>
  );
}

interface CategoryGridProps {
  category: PlaygroundCategory;
  showHeader: boolean;
  viewMode: ViewMode;
}

function CategoryGrid({ category, showHeader, viewMode }: CategoryGridProps) {
  const Icon = categoryIcons[category.id] || FiBox;

  return (
    <section>
      {showHeader && (
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <Heading level={2} size="lg" margin="" color="primary">
              {category.title}
            </Heading>
          </div>
          <SmallText className="ml-12">{category.description}</SmallText>
        </motion.div>
      )}

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {category.items.map((item) => (
            <ComponentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {category.items.map((item) => (
            <ComponentListCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

interface ComponentCardProps {
  item: PlaygroundComponent;
}

function ComponentCard({ item }: ComponentCardProps) {
  const colors = statusColors[item.status];
  const isClickable =
    item.status === 'done' ||
    item.status === 'ready' ||
    item.status === 'in-progress';

  const CardWrapper = isClickable ? Link : 'div';
  const cardProps = isClickable ? { href: item.href } : {};

  return (
    <motion.div variants={itemVariants}>
      <CardWrapper
        {...(cardProps as any)}
        className={cn(
          'group block h-full',
          'p-4 rounded-xl',
          'border border-gray-200 dark:border-gray-800',
          'bg-white dark:bg-gray-900',
          'transition-all duration-200',
          isClickable && [
            'hover:border-gray-300 dark:hover:border-gray-700',
            'hover:shadow-md dark:hover:shadow-gray-950/50',
            'hover:scale-[1.02]',
            'cursor-pointer',
          ],
          !isClickable && 'opacity-60 cursor-not-allowed',
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <Text fontWeight="medium" color="primary">
              {item.name}
            </Text>
            <StatusBadge status={item.status} />
          </div>

          {/* Description */}
          <SmallText className="flex-1 mb-3 line-clamp-2">
            {item.description}
          </SmallText>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          {isClickable && (
            <div className="flex items-center text-sm text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
              <Text className="text-sm" color="tertiary">
                View component
              </Text>
              <FiArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </CardWrapper>
    </motion.div>
  );
}

/**
 * Horizontal List Card Component
 *
 * Dense horizontal card layout for list view.
 * Full-width cards stacked vertically like GitHub issues.
 */
function ComponentListCard({ item }: ComponentCardProps) {
  const isClickable =
    item.status === 'done' ||
    item.status === 'ready' ||
    item.status === 'in-progress';

  const CardWrapper = isClickable ? Link : 'div';
  const cardProps = isClickable ? { href: item.href } : {};

  return (
    <motion.div variants={itemVariants}>
      <CardWrapper
        {...(cardProps as any)}
        className={cn(
          'group flex items-center gap-4',
          'px-4 py-3 rounded-xl',
          'border border-gray-200 dark:border-gray-800',
          'bg-white dark:bg-gray-900',
          'transition-all duration-200',
          isClickable && [
            'hover:border-gray-300 dark:hover:border-gray-700',
            'hover:shadow-md dark:hover:shadow-gray-950/50',
            'hover:bg-gray-50 dark:hover:bg-gray-800/50',
            'cursor-pointer',
          ],
          !isClickable && 'opacity-60 cursor-not-allowed',
        )}
      >
        {/* Status indicator bar */}
        <div
          className={cn(
            'w-1 h-10 rounded-full shrink-0',
            item.status === 'done' && 'bg-emerald-500',
            item.status === 'ready' && 'bg-blue-500',
            item.status === 'in-progress' && 'bg-amber-500',
            item.status === 'planned' && 'bg-gray-300 dark:bg-gray-600',
          )}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Text fontWeight="medium" color="primary" className="truncate">
              {item.name}
            </Text>
            <StatusBadge status={item.status} />
          </div>
          <SmallText className="line-clamp-1">{item.description}</SmallText>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Arrow */}
        {isClickable && (
          <FiArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all shrink-0" />
        )}
      </CardWrapper>
    </motion.div>
  );
}

interface StatusBadgeProps {
  status: PlaygroundComponent['status'];
}

function StatusBadge({ status }: StatusBadgeProps) {
  const colors = statusColors[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'px-2 py-0.5 rounded-full',
        'border',
        colors.bg,
        colors.border,
      )}
    >
      {status === 'done' && <FiCheck className={cn('w-3 h-3', colors.text)} />}
      <Text className={cn('text-[10px]', colors.text)} fontWeight="medium">
        {statusLabels[status]}
      </Text>
    </span>
  );
}

export default PlaygroundGrid;
