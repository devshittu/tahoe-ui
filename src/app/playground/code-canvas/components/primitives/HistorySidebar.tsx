// src/app/playground/code-canvas/components/primitives/HistorySidebar.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { HistorySidebarProps, GenerationVersion } from '../types';
import { getSizeConfig, CANVAS_ANIMATIONS } from '../types';

/**
 * Format timestamp for display
 */
function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}

/**
 * Truncate text with ellipsis
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Status indicator component
 */
interface StatusIndicatorProps {
  status: GenerationVersion['status'];
}

function StatusIndicator({ status }: StatusIndicatorProps) {
  const statusConfig: Record<string, { color: string; animate: boolean }> = {
    idle: {
      color: 'bg-gray-400',
      animate: false,
    },
    generating: {
      color: 'bg-amber-500',
      animate: true,
    },
    streaming: {
      color: 'bg-blue-500',
      animate: true,
    },
    complete: {
      color: 'bg-green-500',
      animate: false,
    },
    error: {
      color: 'bg-red-500',
      animate: false,
    },
  };

  const config = statusConfig[status];
  if (!config) return null;

  return (
    <span
      className={cn(
        'w-2 h-2 rounded-full',
        config.color,
        config.animate && 'animate-pulse',
      )}
    />
  );
}

/**
 * Version item component
 */
interface VersionItemProps {
  version: GenerationVersion;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  size: 'compact' | 'default' | 'large';
}

function VersionItem({
  version,
  isSelected,
  onSelect,
  onDelete,
  size,
}: VersionItemProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={CANVAS_ANIMATIONS.fast}
      className={cn(
        'group relative p-3 rounded-lg cursor-pointer',
        'border transition-all duration-150',
        isSelected
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
      )}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <StatusIndicator status={version.status} />
          <span
            className={cn(
              'font-medium truncate',
              isSelected
                ? 'text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300',
            )}
            style={{ fontSize: sizeConfig.fontSize - 1 }}
          >
            {truncate(version.prompt, 40)}
          </span>
        </div>

        {/* Delete button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className={cn(
            'opacity-0 group-hover:opacity-100',
            'p-1 rounded transition-all duration-150',
            'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
          )}
          aria-label="Delete version"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Timestamp and metadata */}
      <div className="flex items-center gap-2">
        <span
          className="text-gray-400 dark:text-gray-500"
          style={{ fontSize: sizeConfig.fontSize - 3 }}
        >
          {formatTime(version.timestamp)}
        </span>

        {version.parentId && (
          <span
            className={cn(
              'px-1.5 py-0.5 rounded',
              'bg-gray-100 dark:bg-gray-700',
              'text-gray-500 dark:text-gray-400',
            )}
            style={{ fontSize: sizeConfig.fontSize - 4 }}
          >
            Iteration
          </span>
        )}

        {version.error && (
          <span
            className={cn(
              'px-1.5 py-0.5 rounded',
              'bg-red-100 dark:bg-red-900/30',
              'text-red-600 dark:text-red-400',
            )}
            style={{ fontSize: sizeConfig.fontSize - 4 }}
          >
            Error
          </span>
        )}
      </div>

      {/* Code preview */}
      {version.code && version.status === 'complete' && (
        <div
          className={cn(
            'mt-2 p-2 rounded',
            'bg-gray-50 dark:bg-gray-900',
            'font-mono overflow-hidden',
          )}
          style={{ fontSize: sizeConfig.fontSize - 3 }}
        >
          <code className="text-gray-600 dark:text-gray-400 line-clamp-2">
            {version.code.split('\n').slice(0, 2).join('\n')}
          </code>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Version history sidebar component
 */
export function HistorySidebar({
  history,
  onSelect,
  onDelete,
  onClear,
  size = 'default',
  className,
}: HistorySidebarProps) {
  const sizeConfig = getSizeConfig(size);
  const hasVersions = history.versions.length > 0;

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-gray-50 dark:bg-gray-900',
        'border-l border-gray-200 dark:border-gray-800',
        className,
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-4',
          'border-b border-gray-200 dark:border-gray-800',
        )}
        style={{ height: sizeConfig.headerHeight }}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span
            className="font-medium text-gray-700 dark:text-gray-300"
            style={{ fontSize: sizeConfig.fontSize }}
          >
            History
          </span>
          {hasVersions && (
            <span
              className={cn(
                'px-1.5 py-0.5 rounded-full',
                'bg-gray-200 dark:bg-gray-700',
                'text-gray-600 dark:text-gray-400',
              )}
              style={{ fontSize: sizeConfig.fontSize - 3 }}
            >
              {history.versions.length}
            </span>
          )}
        </div>

        {hasVersions && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              'px-2 py-1 rounded',
              'text-gray-500 dark:text-gray-400',
              'hover:bg-gray-200 dark:hover:bg-gray-800',
              'transition-colors duration-150',
            )}
            style={{ fontSize: sizeConfig.fontSize - 2 }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Version list */}
      <div className="flex-1 overflow-y-auto p-3">
        {hasVersions ? (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {history.versions.map((version) => (
                <VersionItem
                  key={version.id}
                  version={version}
                  isSelected={version.id === history.currentVersionId}
                  onSelect={() => onSelect(version.id)}
                  onDelete={() => onDelete(version.id)}
                  size={size}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="w-12 h-12 mb-3 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p
              className="text-gray-500 dark:text-gray-400 font-medium mb-1"
              style={{ fontSize: sizeConfig.fontSize }}
            >
              No history yet
            </p>
            <p
              className="text-gray-400 dark:text-gray-500"
              style={{ fontSize: sizeConfig.fontSize - 2 }}
            >
              Generate code to start building history
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistorySidebar;
