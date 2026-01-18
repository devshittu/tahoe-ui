// src/app/playground/code-blocks/components/primitives/SearchFilter.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type {
  ComponentCategory,
  ComponentComplexity,
  FilterState,
  ViewMode,
  BlocksSize,
} from '../types';
import {
  getSizeConfig,
  CATEGORY_INFO,
  COMPLEXITY_INFO,
  BLOCKS_ANIMATIONS,
} from '../types';

/**
 * Search input component
 */
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: BlocksSize;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search components...',
  size = 'default',
  className,
}: SearchInputProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <div className={cn('relative', className)}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-10 pr-4 rounded-xl',
          'bg-white dark:bg-gray-900',
          'border border-gray-200 dark:border-gray-800',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500',
          'transition-colors duration-150',
        )}
        style={{
          fontSize: sizeConfig.fontSize,
          height: sizeConfig.padding * 3,
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

/**
 * Category filter pills
 */
interface CategoryFilterProps {
  selected: ComponentCategory | 'all';
  onChange: (category: ComponentCategory | 'all') => void;
  size?: BlocksSize;
  className?: string;
}

export function CategoryFilter({
  selected,
  onChange,
  size = 'default',
  className,
}: CategoryFilterProps) {
  const sizeConfig = getSizeConfig(size);
  const categories: Array<ComponentCategory | 'all'> = [
    'all',
    'buttons',
    'inputs',
    'feedback',
    'navigation',
    'layout',
    'overlay',
    'data-display',
    'utility',
  ];

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {categories.map((category) => (
        <motion.button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'px-3 py-1.5 rounded-lg',
            'transition-colors duration-150',
            selected === category
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
          )}
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          {category === 'all' ? 'All' : CATEGORY_INFO[category].label}
        </motion.button>
      ))}
    </div>
  );
}

/**
 * Complexity filter
 */
interface ComplexityFilterProps {
  selected: ComponentComplexity | 'all';
  onChange: (complexity: ComponentComplexity | 'all') => void;
  size?: BlocksSize;
  className?: string;
}

export function ComplexityFilter({
  selected,
  onChange,
  size = 'default',
  className,
}: ComplexityFilterProps) {
  const sizeConfig = getSizeConfig(size);
  const levels: Array<ComponentComplexity | 'all'> = [
    'all',
    'simple',
    'moderate',
    'complex',
  ];

  return (
    <div className={cn('flex gap-1.5', className)}>
      {levels.map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => onChange(level)}
          className={cn(
            'px-3 py-1.5 rounded-lg',
            'transition-colors duration-150',
            selected === level
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
          )}
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          {level === 'all' ? 'All' : COMPLEXITY_INFO[level].label}
        </button>
      ))}
    </div>
  );
}

/**
 * View mode toggle
 */
interface ViewModeToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  size?: BlocksSize;
  className?: string;
}

export function ViewModeToggle({
  mode,
  onChange,
  size = 'default',
  className,
}: ViewModeToggleProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <div
      className={cn(
        'flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={cn(
          'flex items-center justify-center p-2 rounded-md',
          'transition-colors duration-150',
          mode === 'grid'
            ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-gray-100'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
        )}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        className={cn(
          'flex items-center justify-center p-2 rounded-md',
          'transition-colors duration-150',
          mode === 'list'
            ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-gray-100'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
        )}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}

/**
 * Result count display
 */
interface ResultCountProps {
  count: number;
  total: number;
  size?: BlocksSize;
  className?: string;
}

export function ResultCount({
  count,
  total,
  size = 'default',
  className,
}: ResultCountProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <span
      className={cn('text-gray-500 dark:text-gray-400', className)}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      {count === total ? (
        `${total} components`
      ) : (
        <>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {count}
          </span>
          {' of '}
          {total} components
        </>
      )}
    </span>
  );
}

/**
 * Reset filters button
 */
interface ResetFiltersProps {
  onReset: () => void;
  size?: BlocksSize;
  className?: string;
}

export function ResetFilters({
  onReset,
  size = 'default',
  className,
}: ResetFiltersProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <motion.button
      type="button"
      onClick={onReset}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
        'text-gray-500 dark:text-gray-400',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'transition-colors duration-150',
        className,
      )}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Reset
    </motion.button>
  );
}
