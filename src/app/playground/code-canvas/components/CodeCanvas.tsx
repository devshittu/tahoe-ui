// src/app/playground/code-canvas/components/CodeCanvas.tsx
'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CodeCanvasProps, ExportFormat } from './types';
import { getSizeConfig, CANVAS_ANIMATIONS } from './types';
import { useCanvasState } from './hooks';
import { PromptInput } from './primitives/PromptInput';
import { GenerationPanel } from './primitives/GenerationPanel';
import { PreviewPanel } from './primitives/PreviewPanel';
import { HistorySidebar } from './primitives/HistorySidebar';
import { ExportPanel } from './primitives/ExportPanel';

/**
 * CodeCanvas - AI-powered text-to-UI generation interface
 *
 * Features:
 * - Natural language prompt input
 * - Real-time code generation with streaming
 * - Live preview with Sandpack
 * - Version history with rollback
 * - Export to multiple platforms
 */
export function CodeCanvas({
  initialPrompt = '',
  apiEndpoint,
  mockMode = true,
  layout = 'side-by-side',
  size = 'default',
  theme = 'auto',
  showHistory = true,
  showSuggestions = true,
  height = '80vh',
  className,
  onGenerate,
  onExport,
}: CodeCanvasProps) {
  const sizeConfig = getSizeConfig(size);

  // Canvas state management
  const {
    prompt,
    setPrompt,
    code,
    status,
    error,
    history,
    generate,
    iterate,
    selectVersion,
    deleteVersion,
    clearHistory,
  } = useCanvasState({
    apiEndpoint,
    mockMode,
    onGenerate,
  });

  // Initialize with initial prompt
  React.useEffect(() => {
    if (initialPrompt && !prompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt, prompt, setPrompt]);

  // Handle export
  const handleExport = useCallback(
    (format: ExportFormat) => {
      onExport?.(code, format);
    },
    [code, onExport],
  );

  // Handle copy from generation panel
  const handleCopy = useCallback(() => {
    handleExport('code');
  }, [handleExport]);

  const isGenerating = status === 'generating' || status === 'streaming';
  const hasCode = code.length > 0;

  // Layout configurations
  const layoutConfig = {
    'side-by-side': {
      container: 'flex flex-row',
      main: 'flex-1 flex flex-col',
      panels: 'flex-1 grid grid-cols-2 gap-4',
    },
    stacked: {
      container: 'flex flex-row',
      main: 'flex-1 flex flex-col',
      panels: 'flex-1 flex flex-col gap-4',
    },
    'preview-only': {
      container: 'flex flex-row',
      main: 'flex-1 flex flex-col',
      panels: 'flex-1',
    },
  };

  const currentLayout = layoutConfig[layout];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={CANVAS_ANIMATIONS.normal}
      className={cn(
        'flex flex-col overflow-hidden',
        'bg-gray-100 dark:bg-gray-950',
        'border border-gray-200 dark:border-gray-800',
        className,
      )}
      style={{
        height,
        borderRadius: sizeConfig.borderRadius + 4,
      }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-4',
          'bg-white dark:bg-gray-900',
          'border-b border-gray-200 dark:border-gray-800',
        )}
        style={{ height: sizeConfig.headerHeight + 8 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h1
              className="font-semibold text-gray-900 dark:text-white"
              style={{ fontSize: sizeConfig.fontSize + 2 }}
            >
              Code Canvas
            </h1>
            <p
              className="text-gray-500 dark:text-gray-400"
              style={{ fontSize: sizeConfig.fontSize - 2 }}
            >
              {mockMode ? 'Demo Mode' : 'AI-Powered Generation'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status indicator */}
          {isGenerating && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span
                className="text-blue-600 dark:text-blue-400 font-medium"
                style={{ fontSize: sizeConfig.fontSize - 1 }}
              >
                {status === 'streaming' ? 'Streaming...' : 'Generating...'}
              </span>
            </div>
          )}

          {/* Export button */}
          {hasCode && (
            <ExportPanel code={code} onExport={handleExport} size={size} />
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className={cn('flex-1 overflow-hidden', currentLayout.container)}>
        {/* Main area */}
        <div className={cn(currentLayout.main, 'p-4')}>
          {/* Prompt input */}
          <div className="mb-4">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={generate}
              isGenerating={isGenerating}
              suggestions={showSuggestions ? undefined : []}
              size={size}
            />
          </div>

          {/* Panels */}
          <div className={cn(currentLayout.panels, 'min-h-0')}>
            {layout !== 'preview-only' && (
              <GenerationPanel
                code={code}
                status={status}
                error={error ?? undefined}
                onIterate={iterate}
                onCopy={handleCopy}
                size={size}
                theme={theme}
              />
            )}

            <PreviewPanel code={code} isGenerating={isGenerating} size={size} />
          </div>
        </div>

        {/* History sidebar */}
        {showHistory && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...CANVAS_ANIMATIONS.normal, delay: 0.1 }}
            style={{ width: sizeConfig.sidebarWidth }}
          >
            <HistorySidebar
              history={history}
              onSelect={selectVersion}
              onDelete={deleteVersion}
              onClear={clearHistory}
              size={size}
              className="h-full"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default CodeCanvas;
