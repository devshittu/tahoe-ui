'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import type {
  BlocksSize,
  ComponentCategory,
  ComponentComplexity,
} from '../types';
import {
  getSizeConfig,
  BLOCKS_STYLES,
  CATEGORY_INFO,
  COMPLEXITY_INFO,
} from '../types';

// Simple search icon
const SearchIcon = ({ size = 16 }: { size?: number }) => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  size?: BlocksSize;
  placeholder?: string;
  className?: string;
}

/**
 * SearchInput - Search input for filtering components
 */
export function SearchInput({
  value,
  onChange,
  size = 'default',
  placeholder = 'Search components...',
  className,
}: SearchInputProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <div className={twMerge('relative', className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
        <SearchIcon size={sizeConfig.fontSize + 2} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={twMerge(
          'w-full pl-10 pr-4 py-2 rounded-lg',
          BLOCKS_STYLES.search.base,
          BLOCKS_STYLES.search.border,
          BLOCKS_STYLES.search.text,
          BLOCKS_STYLES.search.placeholder,
          BLOCKS_STYLES.search.focus,
          'outline-none transition-all duration-150',
        )}
        style={{ fontSize: sizeConfig.fontSize }}
      />
    </div>
  );
}

interface CategoryFilterProps {
  selected: ComponentCategory | 'all';
  onChange: (category: ComponentCategory | 'all') => void;
  size?: BlocksSize;
  className?: string;
}

/**
 * CategoryFilter - Filter buttons for component categories
 */
export function CategoryFilter({
  selected,
  onChange,
  size = 'default',
  className,
}: CategoryFilterProps) {
  const sizeConfig = getSizeConfig(size);
  const categories: (ComponentCategory | 'all')[] = [
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
    <div className={twMerge('flex flex-wrap gap-2', className)}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={twMerge(
            'px-3 py-1.5 rounded-lg',
            'text-sm font-medium',
            'transition-colors duration-150',
            selected === category
              ? BLOCKS_STYLES.filter.active
              : BLOCKS_STYLES.filter.inactive,
          )}
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          {category === 'all'
            ? 'All'
            : CATEGORY_INFO[category]?.label || category}
        </button>
      ))}
    </div>
  );
}

interface ComplexityFilterProps {
  selected: ComponentComplexity | 'all';
  onChange: (complexity: ComponentComplexity | 'all') => void;
  size?: BlocksSize;
  className?: string;
}

/**
 * ComplexityFilter - Filter for component complexity
 */
export function ComplexityFilter({
  selected,
  onChange,
  size = 'default',
  className,
}: ComplexityFilterProps) {
  const sizeConfig = getSizeConfig(size);
  const complexities: (ComponentComplexity | 'all')[] = [
    'all',
    'simple',
    'moderate',
    'complex',
  ];

  return (
    <div className={twMerge('flex gap-1', className)}>
      {complexities.map((complexity) => (
        <button
          key={complexity}
          type="button"
          onClick={() => onChange(complexity)}
          className={twMerge(
            'px-2.5 py-1 rounded-md',
            'text-xs font-medium',
            'transition-colors duration-150',
            selected === complexity
              ? complexity === 'all'
                ? BLOCKS_STYLES.filter.active
                : BLOCKS_STYLES.badge[complexity as ComponentComplexity]
              : 'bg-bg-secondary dark:bg-bg-tertiary text-text-muted hover:text-text-secondary',
          )}
          style={{ fontSize: sizeConfig.fontSize - 2 }}
        >
          {complexity === 'all'
            ? 'All'
            : COMPLEXITY_INFO[complexity]?.label || complexity}
        </button>
      ))}
    </div>
  );
}

interface ViewModeToggleProps {
  mode: 'grid' | 'list';
  onChange: (mode: 'grid' | 'list') => void;
  size?: BlocksSize;
  className?: string;
}

// Grid and List icons
const GridIcon = ({ size = 16 }: { size?: number }) => (
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
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ListIcon = ({ size = 16 }: { size?: number }) => (
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
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

/**
 * ViewModeToggle - Toggle between grid and list view
 */
export function ViewModeToggle({
  mode,
  onChange,
  size = 'default',
  className,
}: ViewModeToggleProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <div
      className={twMerge(
        'flex rounded-lg overflow-hidden',
        'border border-border-subtle dark:border-border-subtle',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={twMerge(
          'p-2',
          'transition-colors duration-150',
          mode === 'grid'
            ? 'bg-brand-primary-500 text-white'
            : 'bg-bg-elevated text-text-muted hover:text-text-secondary',
        )}
        aria-label="Grid view"
      >
        <GridIcon size={sizeConfig.fontSize} />
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        className={twMerge(
          'p-2',
          'transition-colors duration-150',
          mode === 'list'
            ? 'bg-brand-primary-500 text-white'
            : 'bg-bg-elevated text-text-muted hover:text-text-secondary',
        )}
        aria-label="List view"
      >
        <ListIcon size={sizeConfig.fontSize} />
      </button>
    </div>
  );
}

interface ResultCountProps {
  count: number;
  total: number;
  size?: BlocksSize;
  className?: string;
}

/**
 * ResultCount - Display filtered result count
 */
export function ResultCount({
  count,
  total,
  size = 'default',
  className,
}: ResultCountProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <span
      className={twMerge('text-text-muted', className)}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      {count === total ? (
        <>{total} components</>
      ) : (
        <>
          {count} of {total}
        </>
      )}
    </span>
  );
}

interface ResetFiltersProps {
  onReset: () => void;
  size?: BlocksSize;
  className?: string;
}

/**
 * ResetFilters - Button to reset all filters
 */
export function ResetFilters({
  onReset,
  size = 'default',
  className,
}: ResetFiltersProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <button
      type="button"
      onClick={onReset}
      className={twMerge(
        'text-text-muted hover:text-text-secondary',
        'underline underline-offset-2',
        'transition-colors duration-150',
        className,
      )}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      Reset
    </button>
  );
}
