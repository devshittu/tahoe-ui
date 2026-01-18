// src/app/playground/code-sandbox/components/CodeSandbox.tsx
'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type {
  CodeSandboxProps,
  SandboxFiles,
  SandboxFile,
  SandboxLayout,
} from './types';
import {
  getSizeConfig,
  TEMPLATE_MAP,
  TEMPLATE_INFO,
  DEFAULT_REACT_TS_FILES,
  SANDBOX_ANIMATIONS,
} from './types';
import { FileTree } from './primitives/FileTree';
import { PreviewPanel } from './primitives/PreviewPanel';
import { SandpackConsolePanel } from './primitives/ConsolePanel';

/**
 * Get file content string from SandboxFile
 */
function getFileContent(file: string | SandboxFile): string {
  return typeof file === 'string' ? file : file.content;
}

/**
 * Convert SandboxFiles to Sandpack format
 */
function toSandpackFiles(
  files: SandboxFiles,
): Record<
  string,
  { code: string; hidden?: boolean; active?: boolean; readOnly?: boolean }
> {
  const result: Record<
    string,
    { code: string; hidden?: boolean; active?: boolean; readOnly?: boolean }
  > = {};

  for (const [path, file] of Object.entries(files)) {
    if (typeof file === 'string') {
      result[path] = { code: file };
    } else {
      result[path] = {
        code: file.content,
        hidden: file.hidden,
        active: file.active,
        readOnly: file.readOnly,
      };
    }
  }

  return result;
}

/**
 * Toolbar component
 */
interface ToolbarProps {
  layout: SandboxLayout;
  onLayoutChange: (layout: SandboxLayout) => void;
  showFileTree: boolean;
  onToggleFileTree: () => void;
  showConsole: boolean;
  onToggleConsole: () => void;
  onReset: () => void;
  onFork?: () => void;
  size: 'compact' | 'default' | 'large';
}

function Toolbar({
  layout,
  onLayoutChange,
  showFileTree,
  onToggleFileTree,
  showConsole,
  onToggleConsole,
  onReset,
  size,
}: ToolbarProps) {
  const sizeConfig = getSizeConfig(size);

  const layouts: Array<{ id: SandboxLayout; label: string; icon: string }> = [
    { id: 'horizontal', label: 'Split', icon: '⬛' },
    { id: 'vertical', label: 'Stack', icon: '▬' },
    { id: 'preview-only', label: 'Preview', icon: '👁' },
  ];

  return (
    <div
      className={cn(
        'flex items-center justify-between px-3',
        'bg-gray-100 dark:bg-gray-800',
        'border-b border-gray-200 dark:border-gray-700',
      )}
      style={{ height: sizeConfig.headerHeight }}
    >
      <div className="flex items-center gap-2">
        {/* Toggle file tree */}
        <motion.button
          type="button"
          onClick={onToggleFileTree}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg',
            'transition-colors duration-150',
            showFileTree
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
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
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          Files
        </motion.button>

        {/* Toggle console */}
        <motion.button
          type="button"
          onClick={onToggleConsole}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg',
            'transition-colors duration-150',
            showConsole
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
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
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Console
        </motion.button>
      </div>

      <div className="flex items-center gap-2">
        {/* Layout switcher */}
        <div className="flex items-center rounded-lg bg-gray-200 dark:bg-gray-700 p-0.5">
          {layouts.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onLayoutChange(l.id)}
              className={cn(
                'px-2 py-1 rounded-md text-xs transition-colors duration-150',
                layout === l.id
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              )}
              title={l.label}
            >
              {l.icon}
            </button>
          ))}
        </div>

        {/* Reset */}
        <motion.button
          type="button"
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg',
            'text-gray-500 dark:text-gray-400',
            'hover:bg-gray-200 dark:hover:bg-gray-700',
            'transition-colors duration-150',
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
      </div>
    </div>
  );
}

/**
 * Inner sandbox content using Sandpack context
 */
interface SandboxContentProps {
  layout: SandboxLayout;
  showFileTree: boolean;
  showConsole: boolean;
  showEditor: boolean;
  size: 'compact' | 'default' | 'large';
  readOnly: boolean;
  onFileSelect: (path: string) => void;
  activeFile: string;
}

function SandboxContent({
  layout,
  showFileTree,
  showConsole,
  showEditor,
  size,
  readOnly,
  onFileSelect,
  activeFile,
}: SandboxContentProps) {
  const { sandpack } = useSandpack();
  const sizeConfig = getSizeConfig(size);

  // Get files from sandpack
  const files = sandpack.files;
  const sandboxFiles: SandboxFiles = useMemo(() => {
    const result: SandboxFiles = {};
    for (const [path, file] of Object.entries(files)) {
      result[path] = { path, content: file.code };
    }
    return result;
  }, [files]);

  const isHorizontal = layout === 'horizontal';
  const showPreviewOnly = layout === 'preview-only';

  return (
    <div
      className={cn(
        'flex flex-1 overflow-hidden',
        isHorizontal ? 'flex-row' : 'flex-col',
      )}
    >
      {/* File tree sidebar */}
      <AnimatePresence>
        {showFileTree && !showPreviewOnly && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: sizeConfig.sidebarWidth, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={SANDBOX_ANIMATIONS.normal}
            className="overflow-hidden flex-shrink-0"
          >
            <FileTree
              files={sandboxFiles}
              activeFile={activeFile}
              onFileSelect={onFileSelect}
              size={size}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor */}
      {showEditor && !showPreviewOnly && (
        <div
          className={cn(
            'flex-1 min-w-0',
            isHorizontal ? 'border-r border-gray-200 dark:border-gray-800' : '',
          )}
        >
          <SandpackCodeEditor
            showTabs
            showLineNumbers
            showInlineErrors
            wrapContent
            closableTabs
            readOnly={readOnly}
            style={{ height: '100%' }}
          />
        </div>
      )}

      {/* Preview & Console column */}
      <div
        className={cn(
          'flex flex-col',
          isHorizontal ? 'flex-1' : '',
          showPreviewOnly ? 'flex-1' : '',
        )}
      >
        {/* Preview */}
        <div
          className={cn(
            'flex-1 min-h-0',
            showConsole ? 'border-b border-gray-200 dark:border-gray-800' : '',
          )}
        >
          <PreviewPanel size={size} />
        </div>

        {/* Console */}
        <AnimatePresence>
          {showConsole && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 200, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={SANDBOX_ANIMATIONS.normal}
              className="overflow-hidden flex-shrink-0"
            >
              <SandpackConsolePanel size={size} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Main CodeSandbox component
 */
export function CodeSandbox({
  files: initialFiles,
  entry = '/App.tsx',
  template = 'react-ts',
  dependencies = {},
  layout: initialLayout = 'horizontal',
  size = 'default',
  theme = 'auto',
  showFileTree: initialShowFileTree = true,
  showConsole: initialShowConsole = false,
  showEditor = true,
  allowFileOperations = true,
  readOnly = false,
  autoRun = true,
  autoRunDelay = 500,
  height = 500,
  className,
  onFilesChange,
  onActiveFileChange,
}: CodeSandboxProps) {
  const sizeConfig = getSizeConfig(size);

  // State
  const [layout, setLayout] = useState<SandboxLayout>(initialLayout);
  const [showFileTree, setShowFileTree] = useState(initialShowFileTree);
  const [showConsole, setShowConsole] = useState(initialShowConsole);
  const [activeFile, setActiveFile] = useState(entry);
  const [key, setKey] = useState(0); // For resetting

  // Merge initial files with defaults
  const files = useMemo(() => {
    return initialFiles || DEFAULT_REACT_TS_FILES;
  }, [initialFiles]);

  // Convert to Sandpack format
  const sandpackFiles = useMemo(() => toSandpackFiles(files), [files]);

  // Determine theme
  const sandpackTheme = useMemo(() => {
    if (theme === 'auto') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      }
      return 'dark';
    }
    return theme;
  }, [theme]);

  // Handle file selection
  const handleFileSelect = useCallback(
    (path: string) => {
      setActiveFile(path);
      onActiveFileChange?.(path);
    },
    [onActiveFileChange],
  );

  // Handle reset
  const handleReset = useCallback(() => {
    setKey((k) => k + 1);
  }, []);

  // Computed height
  const containerHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden',
        'bg-white dark:bg-gray-900',
        'border border-gray-200 dark:border-gray-800',
        'shadow-lg',
        className,
      )}
      style={{
        height: containerHeight,
        borderRadius: sizeConfig.borderRadius,
      }}
    >
      {/* Toolbar */}
      <Toolbar
        layout={layout}
        onLayoutChange={setLayout}
        showFileTree={showFileTree}
        onToggleFileTree={() => setShowFileTree((v) => !v)}
        showConsole={showConsole}
        onToggleConsole={() => setShowConsole((v) => !v)}
        onReset={handleReset}
        size={size}
      />

      {/* Sandpack Provider */}
      <SandpackProvider
        key={key}
        template={TEMPLATE_MAP[template]}
        files={sandpackFiles}
        customSetup={{
          dependencies,
          entry,
        }}
        options={{
          activeFile,
          visibleFiles: Object.keys(files),
          recompileMode: autoRun ? 'delayed' : 'immediate',
          recompileDelay: autoRunDelay,
          autorun: autoRun,
          autoReload: true,
        }}
        theme={sandpackTheme}
      >
        <SandboxContent
          layout={layout}
          showFileTree={showFileTree}
          showConsole={showConsole}
          showEditor={showEditor}
          size={size}
          readOnly={readOnly}
          onFileSelect={handleFileSelect}
          activeFile={activeFile}
        />
      </SandpackProvider>
    </div>
  );
}

export default CodeSandbox;
