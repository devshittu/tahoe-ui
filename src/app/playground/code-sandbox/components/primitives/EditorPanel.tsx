// src/app/playground/code-sandbox/components/primitives/EditorPanel.tsx
'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { EditorPanelProps, SandboxFiles, SandboxFile } from '../types';
import {
  getSizeConfig,
  getLanguageFromPath,
  getFileIcon,
  SANDBOX_ANIMATIONS,
} from '../types';

/**
 * Get file content from SandboxFiles
 */
function getFileContent(file: string | SandboxFile): string {
  return typeof file === 'string' ? file : file.content;
}

/**
 * Tab component for file tabs
 */
interface FileTabProps {
  path: string;
  isActive: boolean;
  onClick: () => void;
  onClose?: () => void;
  size: 'compact' | 'default' | 'large';
}

function FileTab({ path, isActive, onClick, onClose, size }: FileTabProps) {
  const sizeConfig = getSizeConfig(size);
  const fileName = path.split('/').pop() || path;
  const icon = getFileIcon(path);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={false}
      animate={{
        backgroundColor: isActive
          ? 'var(--tab-active-bg)'
          : 'var(--tab-inactive-bg)',
      }}
      className={cn(
        'group flex items-center gap-1.5 px-3 py-1.5',
        'border-r border-gray-200 dark:border-gray-800',
        'transition-colors duration-100',
        '[--tab-active-bg:theme(colors.white)] dark:[--tab-active-bg:theme(colors.gray.900)]',
        '[--tab-inactive-bg:theme(colors.gray.100)] dark:[--tab-inactive-bg:theme(colors.gray.800)]',
        isActive
          ? 'text-gray-900 dark:text-gray-100'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
      )}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      <span className="text-xs">{icon}</span>
      <span className="font-medium">{fileName}</span>
      {onClose && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={cn(
            'ml-1 p-0.5 rounded',
            'opacity-0 group-hover:opacity-100',
            'hover:bg-gray-200 dark:hover:bg-gray-700',
            'transition-opacity duration-100',
          )}
          aria-label={`Close ${fileName}`}
        >
          <svg
            className="w-3 h-3"
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
    </motion.button>
  );
}

/**
 * Editor panel with Monaco editor
 */
export function EditorPanel({
  files,
  activeFile,
  onFileChange,
  onActiveFileChange,
  size = 'default',
  theme = 'auto',
  readOnly = false,
  className,
}: EditorPanelProps) {
  const sizeConfig = getSizeConfig(size);
  const [openTabs, setOpenTabs] = useState<string[]>([activeFile]);
  const [editorMounted, setEditorMounted] = useState(false);

  // Ensure active file is in tabs
  React.useEffect(() => {
    if (!openTabs.includes(activeFile)) {
      setOpenTabs((prev) => [...prev, activeFile]);
    }
  }, [activeFile, openTabs]);

  // Get current file content
  const currentContent = useMemo(() => {
    const file = files[activeFile];
    return file ? getFileContent(file) : '';
  }, [files, activeFile]);

  // Get language for current file
  const language = useMemo(() => getLanguageFromPath(activeFile), [activeFile]);

  // Determine editor theme
  const editorTheme = useMemo(() => {
    if (theme === 'auto') {
      // Check system preference
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'vs-dark'
          : 'light';
      }
      return 'vs-dark';
    }
    return theme === 'dark' ? 'vs-dark' : 'light';
  }, [theme]);

  // Handle editor mount
  const handleEditorMount: OnMount = useCallback(
    (editor, monaco) => {
      setEditorMounted(true);

      // Configure editor options
      editor.updateOptions({
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        renderLineHighlight: 'line',
        fontSize: sizeConfig.fontSize,
        tabSize: 2,
        wordWrap: 'on',
        automaticLayout: true,
        padding: { top: 12 },
      });

      // Add keyboard shortcuts
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        // Save action - could emit event
        console.log('Save triggered');
      });
    },
    [sizeConfig.fontSize],
  );

  // Handle content change
  const handleChange: OnChange = useCallback(
    (value) => {
      if (value !== undefined) {
        onFileChange(activeFile, value);
      }
    },
    [activeFile, onFileChange],
  );

  // Close tab
  const closeTab = useCallback(
    (path: string) => {
      setOpenTabs((prev) => {
        const next = prev.filter((p) => p !== path);
        if (next.length === 0) {
          // Keep at least one tab open
          const remaining = Object.keys(files).filter((p) => p !== path);
          if (remaining.length > 0) {
            return [remaining[0]];
          }
          return prev;
        }
        // If closing active tab, switch to adjacent
        if (path === activeFile) {
          const idx = prev.indexOf(path);
          const newActive = next[Math.max(0, idx - 1)];
          onActiveFileChange(newActive);
        }
        return next;
      });
    },
    [files, activeFile, onActiveFileChange],
  );

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-white dark:bg-gray-900',
        className,
      )}
    >
      {/* Tab bar */}
      <div
        className={cn(
          'flex items-center',
          'bg-gray-100 dark:bg-gray-800',
          'border-b border-gray-200 dark:border-gray-800',
          'overflow-x-auto',
        )}
        style={{ height: sizeConfig.headerHeight }}
      >
        {openTabs.map((path) => (
          <FileTab
            key={path}
            path={path}
            isActive={path === activeFile}
            onClick={() => onActiveFileChange(path)}
            onClose={openTabs.length > 1 ? () => closeTab(path) : undefined}
            size={size}
          />
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {!editorMounted && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SANDBOX_ANIMATIONS.fast}
              className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span
                  className="text-gray-500 dark:text-gray-400"
                  style={{ fontSize: sizeConfig.fontSize - 1 }}
                >
                  Loading editor...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Editor
          height="100%"
          language={language}
          value={currentContent}
          theme={editorTheme}
          onChange={handleChange}
          onMount={handleEditorMount}
          options={{
            readOnly,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: sizeConfig.fontSize,
            tabSize: 2,
            wordWrap: 'on',
            automaticLayout: true,
            padding: { top: 12 },
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            bracketPairColorization: { enabled: true },
            guides: {
              indentation: true,
              bracketPairs: true,
            },
          }}
          loading={null}
        />
      </div>
    </div>
  );
}

export default EditorPanel;
