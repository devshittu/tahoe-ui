'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type {
  CodeBlocksProps,
  RegistryComponent,
  ViewMode,
  BlocksSize,
} from './types';
import { getSizeConfig, BLOCKS_ANIMATIONS, BLOCKS_STYLES } from './types';
import { useRegistryState, useCopyComponent } from './hooks';
import {
  ComponentCard,
  SearchInput,
  CategoryFilter,
  ComplexityFilter,
  ViewModeToggle,
  ResultCount,
  ResetFilters,
} from './primitives';

/**
 * Empty state when no components match filters
 */
function EmptyState({
  query,
  onReset,
  size,
}: {
  query: string;
  onReset: () => void;
  size: BlocksSize;
}) {
  const sizeConfig = getSizeConfig(size);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div
        className={twMerge(
          'w-16 h-16 rounded-full flex items-center justify-center mb-4',
          'bg-bg-secondary dark:bg-bg-tertiary',
        )}
      >
        <svg
          className={BLOCKS_STYLES.empty.icon}
          width={32}
          height={32}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3
        className={twMerge('font-semibold mb-2', BLOCKS_STYLES.empty.title)}
        style={{ fontSize: sizeConfig.fontSize + 2 }}
      >
        No components found
      </h3>
      <p
        className={twMerge('mb-4 max-w-md', BLOCKS_STYLES.empty.description)}
        style={{ fontSize: sizeConfig.fontSize }}
      >
        {query
          ? `No components match "${query}". Try a different search term or reset filters.`
          : 'No components match the current filters.'}
      </p>
      <button
        type="button"
        onClick={onReset}
        className={twMerge(
          'px-4 py-2 rounded-lg',
          BLOCKS_STYLES.empty.button,
          'transition-colors duration-150',
        )}
        style={{ fontSize: sizeConfig.fontSize }}
      >
        Reset Filters
      </button>
    </motion.div>
  );
}

/**
 * CodeBlocks - Component registry with search, filter, and copy functionality
 *
 * Features:
 * - Grid and list view modes
 * - Search with fuzzy matching
 * - Category and complexity filtering
 * - One-click copy with imports
 * - Code viewer modal
 * - Component preview
 *
 * @example
 * ```tsx
 * <CodeBlocks
 *   registry={{
 *     name: 'My Components',
 *     basePath: '@/components',
 *     components: [...]
 *   }}
 *   showSearch
 *   showCategoryFilter
 * />
 * ```
 */
export function CodeBlocks({
  registry,
  defaultView = 'grid',
  size = 'default',
  showSearch = true,
  showCategoryFilter = true,
  showComplexityFilter = true,
  initialCategory = 'all',
  onCopy,
  className,
}: CodeBlocksProps) {
  const sizeConfig = getSizeConfig(size);
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView);
  const [selectedComponent, setSelectedComponent] =
    useState<RegistryComponent | null>(null);

  // Registry state with filtering
  const {
    components,
    filters,
    setQuery,
    setCategory,
    setComplexity,
    resetFilters,
    resultCount,
    totalCount,
  } = useRegistryState({
    registry,
    initialCategory,
  });

  // Copy functionality
  const { copyComponent, copiedId } = useCopyComponent({
    onSuccess: (component, content) => {
      onCopy?.(component, [content]);
    },
  });

  // Handle component copy
  const handleCopy = useCallback(
    (component: RegistryComponent) => {
      copyComponent(component);
    },
    [copyComponent],
  );

  // Handle view code
  const handleViewCode = useCallback((component: RegistryComponent) => {
    setSelectedComponent(component);
  }, []);

  // Close code modal
  const handleCloseCode = useCallback(() => {
    setSelectedComponent(null);
  }, []);

  return (
    <div
      className={twMerge(
        'flex flex-col',
        BLOCKS_STYLES.container.base,
        BLOCKS_STYLES.container.border,
        'overflow-hidden',
        className,
      )}
      style={{ borderRadius: sizeConfig.borderRadius + 4 }}
    >
      {/* Header */}
      <div
        className={twMerge(
          'flex flex-col gap-4',
          BLOCKS_STYLES.header.border,
          BLOCKS_STYLES.header.base,
          'backdrop-blur-sm',
        )}
        style={{ padding: sizeConfig.padding }}
      >
        {/* Top row: Search + View toggle */}
        <div className="flex items-center gap-4">
          {showSearch && (
            <SearchInput
              value={filters.query}
              onChange={setQuery}
              size={size}
              className="flex-1"
            />
          )}
          <div className="flex items-center gap-2">
            <ResultCount count={resultCount} total={totalCount} size={size} />
            <ViewModeToggle
              mode={viewMode}
              onChange={setViewMode}
              size={size}
            />
          </div>
        </div>

        {/* Filter row */}
        {(showCategoryFilter || showComplexityFilter) && (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap">
              {showCategoryFilter && (
                <CategoryFilter
                  selected={filters.category}
                  onChange={setCategory}
                  size={size}
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              {showComplexityFilter && (
                <ComplexityFilter
                  selected={filters.complexity}
                  onChange={setComplexity}
                  size={size}
                />
              )}
              {(filters.query ||
                filters.category !== 'all' ||
                filters.complexity !== 'all') && (
                <ResetFilters onReset={resetFilters} size={size} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-auto"
        style={{ padding: sizeConfig.padding }}
      >
        {components.length === 0 ? (
          <EmptyState
            query={filters.query}
            onReset={resetFilters}
            size={size}
          />
        ) : (
          <motion.div
            className={twMerge(
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'flex flex-col',
            )}
            style={{ gap: sizeConfig.gap }}
          >
            <AnimatePresence mode="popLayout">
              {components.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  size={size}
                  viewMode={viewMode}
                  showPreview={viewMode === 'grid'}
                  onCopy={handleCopy}
                  onViewCode={handleViewCode}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CodeBlocks;
