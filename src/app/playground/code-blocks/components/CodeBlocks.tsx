// src/app/playground/code-blocks/components/CodeBlocks.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type {
  CodeBlocksProps,
  RegistryComponent,
  ViewMode,
  BlocksSize,
} from './types';
import { getSizeConfig, BLOCKS_ANIMATIONS } from './types';
import { useRegistryState, useCopyComponent } from './hooks';
import {
  ComponentCard,
  ComponentCode,
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
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-gray-400 dark:text-gray-500"
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
        className="font-semibold text-gray-900 dark:text-gray-100 mb-2"
        style={{ fontSize: sizeConfig.fontSize + 2 }}
      >
        No components found
      </h3>
      <p
        className="text-gray-500 dark:text-gray-400 mb-4 max-w-md"
        style={{ fontSize: sizeConfig.fontSize }}
      >
        {query
          ? `No components match "${query}". Try a different search term or reset filters.`
          : 'No components match the current filters.'}
      </p>
      <button
        type="button"
        onClick={onReset}
        className={cn(
          'px-4 py-2 rounded-lg',
          'bg-gray-900 dark:bg-white text-white dark:text-gray-900',
          'hover:bg-gray-800 dark:hover:bg-gray-100',
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
      className={cn(
        'flex flex-col',
        'bg-gray-50/50 dark:bg-gray-950/50',
        'border border-gray-200/50 dark:border-gray-800/50',
        'overflow-hidden',
        className,
      )}
      style={{ borderRadius: sizeConfig.borderRadius + 4 }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex flex-col gap-4',
          'border-b border-gray-200/50 dark:border-gray-800/50',
          'bg-white/60 dark:bg-gray-900/60',
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
            className={cn(
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

      {/* Code Viewer Modal */}
      {selectedComponent && (
        <ComponentCode
          component={selectedComponent}
          isOpen={!!selectedComponent}
          onClose={handleCloseCode}
          size={size}
        />
      )}
    </div>
  );
}

export default CodeBlocks;
