// src/app/playground/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlaygroundGrid } from './components/PlaygroundGrid';
import { getAllComponents } from '@/lib/playground-data';
import { Heading, Paragraph, Text, SmallText } from '@/components/Typography';
import { FiSearch, FiGrid, FiList } from 'react-icons/fi';
import { cn } from '@/lib/utils';

/**
 * Playground Home Page
 *
 * Features:
 * - Hero section with statistics
 * - Full component grid by category
 * - Animated entrance
 *
 * Design Principles:
 * - #1 Purpose-Driven Minimalism: Clean hero, focused content
 * - #2 Visual Hierarchy: Hero → Featured → All
 * - #11 Content-First Layout: Grid adapts to content
 */
export default function PlaygroundPage() {
  const allComponents = getAllComponents();
  const doneCount = allComponents.filter((c) => c.status === 'done').length;
  const totalCount = allComponents.length;
  const progressPercent = Math.round((doneCount / totalCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-6 lg:px-8 py-8"
    >
      {/* Hero Section */}
      <div className="mb-8">
        <Heading level={1} size="3xl" margin="mb-4" color="primary">
          Component Playground
        </Heading>
        <Paragraph
          color="secondary"
          className="text-lg leading-relaxed max-w-2xl"
          margin="mb-6"
        >
          Interactive showcase of Tahoe UI components. Explore physics-based
          modals, gesture primitives, and Apple-inspired design patterns.
        </Paragraph>

        {/* Progress Stats */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>
            <Text className="text-sm" fontWeight="medium" color="secondary">
              {progressPercent}% complete
            </Text>
          </div>

          <div className="flex gap-4">
            <SmallText>
              <Text fontWeight="semibold" color="primary">
                {doneCount}
              </Text>{' '}
              done
            </SmallText>
            <SmallText>
              <Text fontWeight="semibold" color="primary">
                {totalCount - doneCount}
              </Text>{' '}
              planned
            </SmallText>
          </div>
        </div>
      </div>

      {/* Search & View Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            className={cn(
              'w-64 pl-9 pr-4 py-2 rounded-lg',
              'bg-white dark:bg-gray-900',
              'border border-gray-200 dark:border-gray-800',
              'text-sm text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-gray-100/10',
              'transition-shadow',
            )}
            disabled // Future feature
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            className={cn(
              'p-2 rounded-md',
              'bg-white dark:bg-gray-700 shadow-sm',
              'text-gray-700 dark:text-gray-300',
            )}
            aria-label="Grid view"
          >
            <FiGrid className="w-4 h-4" />
          </button>
          <button
            className={cn(
              'p-2 rounded-md',
              'text-gray-400 dark:text-gray-500',
              'hover:text-gray-600 dark:hover:text-gray-400',
              'transition-colors',
            )}
            aria-label="List view"
            disabled // Future feature
          >
            <FiList className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Component Grid */}
      <PlaygroundGrid />
    </motion.div>
  );
}
