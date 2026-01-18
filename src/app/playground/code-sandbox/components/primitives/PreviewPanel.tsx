// src/app/playground/code-sandbox/components/primitives/PreviewPanel.tsx
'use client';

import React, { useState, useCallback } from 'react';
import {
  SandpackPreview,
  useSandpack,
  useSandpackNavigation,
} from '@codesandbox/sandpack-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { PreviewPanelProps } from '../types';
import { getSizeConfig, SANDBOX_ANIMATIONS } from '../types';

/**
 * Preview toolbar with refresh, open in new tab, responsive controls
 */
interface PreviewToolbarProps {
  size: 'compact' | 'default' | 'large';
  onRefresh: () => void;
  onOpenExternal: () => void;
}

function PreviewToolbar({
  size,
  onRefresh,
  onOpenExternal,
}: PreviewToolbarProps) {
  const sizeConfig = getSizeConfig(size);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop',
  );

  const viewports = [
    { id: 'mobile' as const, label: 'Mobile', icon: '📱', width: 375 },
    { id: 'tablet' as const, label: 'Tablet', icon: '📱', width: 768 },
    { id: 'desktop' as const, label: 'Desktop', icon: '🖥️', width: '100%' },
  ];

  return (
    <div
      className={cn(
        'flex items-center justify-between px-3',
        'bg-gray-50 dark:bg-gray-800/50',
        'border-b border-gray-200 dark:border-gray-800',
      )}
      style={{ height: sizeConfig.headerHeight }}
    >
      <div className="flex items-center gap-1">
        <span
          className="text-gray-500 dark:text-gray-400 font-medium"
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          Preview
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Viewport switcher */}
        <div className="flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5">
          {viewports.map((vp) => (
            <button
              key={vp.id}
              type="button"
              onClick={() => setViewport(vp.id)}
              className={cn(
                'px-2 py-1 rounded-md text-xs transition-colors duration-150',
                viewport === vp.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              )}
              title={vp.label}
            >
              {vp.icon}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <motion.button
          type="button"
          onClick={onRefresh}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'p-1.5 rounded-lg',
            'text-gray-500 dark:text-gray-400',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'transition-colors duration-150',
          )}
          title="Refresh preview"
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
        </motion.button>

        {/* Open in new tab */}
        <motion.button
          type="button"
          onClick={onOpenExternal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'p-1.5 rounded-lg',
            'text-gray-500 dark:text-gray-400',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'transition-colors duration-150',
          )}
          title="Open in new tab"
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
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

/**
 * Loading overlay for preview
 */
function PreviewLoading({ size }: { size: 'compact' | 'default' | 'large' }) {
  const sizeConfig = getSizeConfig(size);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={SANDBOX_ANIMATIONS.fast}
      className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-blue-100 dark:border-blue-900" />
          <div className="absolute inset-0 w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <span
          className="text-gray-500 dark:text-gray-400"
          style={{ fontSize: sizeConfig.fontSize }}
        >
          Running...
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Error display for preview
 */
function PreviewError({
  error,
  size,
}: {
  error: string;
  size: 'compact' | 'default' | 'large';
}) {
  const sizeConfig = getSizeConfig(size);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 bg-red-50 dark:bg-red-950/20">
      <div className="max-w-md text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3
          className="font-semibold text-red-700 dark:text-red-400 mb-2"
          style={{ fontSize: sizeConfig.fontSize + 2 }}
        >
          Error
        </h3>
        <p
          className="text-red-600 dark:text-red-400/80 font-mono whitespace-pre-wrap"
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          {error}
        </p>
      </div>
    </div>
  );
}

/**
 * Preview panel wrapper using Sandpack context
 */
function PreviewPanelInner({ size = 'default', className }: PreviewPanelProps) {
  const sizeConfig = getSizeConfig(size);
  const { sandpack } = useSandpack();
  const { refresh } = useSandpackNavigation();
  const { status, error } = sandpack;

  const handleRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  const handleOpenExternal = useCallback(() => {
    // Open CodeSandbox with the current files
    // This is a simplified version - full implementation would serialize files
    window.open('https://codesandbox.io/s/new', '_blank');
  }, []);

  const isLoading = status === 'initial' || status === 'idle';

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-white dark:bg-gray-900',
        'border-l border-gray-200 dark:border-gray-800',
        className,
      )}
    >
      <PreviewToolbar
        size={size}
        onRefresh={handleRefresh}
        onOpenExternal={handleOpenExternal}
      />

      <div className="flex-1 relative">
        {isLoading && <PreviewLoading size={size} />}
        {error && <PreviewError error={error.message} size={size} />}

        <SandpackPreview
          showNavigator={false}
          showOpenInCodeSandbox={false}
          showRefreshButton={false}
          showRestartButton={false}
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
}

/**
 * Exported preview panel - must be used within SandpackProvider
 */
export function PreviewPanel(props: PreviewPanelProps) {
  return <PreviewPanelInner {...props} />;
}

export default PreviewPanel;
