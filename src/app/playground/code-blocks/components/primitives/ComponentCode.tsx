// src/app/playground/code-blocks/components/primitives/ComponentCode.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ComponentCodeProps, ComponentFile } from '../types';
import { getSizeConfig, BLOCKS_ANIMATIONS } from '../types';

/**
 * Simple syntax highlighting for code
 */
function highlightCode(code: string, language: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (language === 'typescript' || language === 'tsx') {
    // Keywords
    html = html.replace(
      /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|new|this|async|await|try|catch|throw|default|as)\b/g,
      '<span class="text-purple-600 dark:text-purple-400">$1</span>',
    );
    // Strings
    html = html.replace(
      /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g,
      '<span class="text-green-600 dark:text-green-400">$&</span>',
    );
    // Comments
    html = html.replace(
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      '<span class="text-gray-400 dark:text-gray-500">$1</span>',
    );
    // Types
    html = html.replace(
      /\b(string|number|boolean|void|null|undefined|any|never|object|unknown)\b/g,
      '<span class="text-blue-600 dark:text-blue-400">$1</span>',
    );
    // JSX tags
    html = html.replace(
      /(&lt;\/?)([\w]+)/g,
      '$1<span class="text-orange-600 dark:text-orange-400">$2</span>',
    );
  } else if (language === 'css') {
    // Selectors
    html = html.replace(
      /([.#]?[\w-]+)\s*\{/g,
      '<span class="text-purple-600 dark:text-purple-400">$1</span> {',
    );
    // Properties
    html = html.replace(
      /([\w-]+)\s*:/g,
      '<span class="text-blue-600 dark:text-blue-400">$1</span>:',
    );
    // Values
    html = html.replace(
      /:\s*([^;]+);/g,
      ': <span class="text-green-600 dark:text-green-400">$1</span>;',
    );
  } else if (language === 'json') {
    // Keys
    html = html.replace(
      /"([\w-]+)":/g,
      '<span class="text-purple-600 dark:text-purple-400">"$1"</span>:',
    );
    // String values
    html = html.replace(
      /:\s*"([^"]*)"/g,
      ': <span class="text-green-600 dark:text-green-400">"$1"</span>',
    );
    // Numbers and booleans
    html = html.replace(
      /:\s*(\d+|true|false|null)\b/g,
      ': <span class="text-orange-600 dark:text-orange-400">$1</span>',
    );
  }

  return html;
}

/**
 * File tab component
 */
function FileTab({
  file,
  isActive,
  onClick,
  size,
}: {
  file: ComponentFile;
  isActive: boolean;
  onClick: () => void;
  size: 'compact' | 'default' | 'large';
}) {
  const sizeConfig = getSizeConfig(size);

  const languageIcons: Record<string, string> = {
    typescript: 'TS',
    tsx: 'TSX',
    css: 'CSS',
    json: '{ }',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-t-lg',
        'transition-colors duration-150',
        'border-b-2',
        isActive
          ? 'bg-white dark:bg-gray-900 border-blue-500 text-gray-900 dark:text-gray-100'
          : 'bg-gray-100 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
      )}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      <span className="text-xs font-mono opacity-50">
        {languageIcons[file.language] || file.language}
      </span>
      <span className="font-medium">{file.name}</span>
      {file.isEntry && (
        <span className="px-1.5 py-0.5 text-xs rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          entry
        </span>
      )}
    </button>
  );
}

/**
 * Copy button for code
 */
function CodeCopyButton({
  content,
  size,
}: {
  content: string;
  size: 'compact' | 'default' | 'large';
}) {
  const [copied, setCopied] = useState(false);
  const sizeConfig = getSizeConfig(size);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [content]);

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg',
        'transition-colors duration-150',
        copied
          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
      )}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      {copied ? (
        <>
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Copied
        </>
      ) : (
        <>
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
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </>
      )}
    </motion.button>
  );
}

/**
 * Component code viewer modal
 */
export function ComponentCode({
  component,
  isOpen,
  onClose,
  onCopy,
  size = 'default',
}: ComponentCodeProps) {
  const sizeConfig = getSizeConfig(size);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const activeFile = component.files[activeFileIndex];

  // Copy all files
  const handleCopyAll = useCallback(() => {
    const allContent = component.files
      .map((f) => `// ${f.path}\n${f.content}`)
      .join('\n\n');
    onCopy?.([allContent]);
  }, [component.files, onCopy]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={BLOCKS_ANIMATIONS.fast}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={BLOCKS_ANIMATIONS.spring}
            className={cn(
              'fixed z-50 inset-4 md:inset-10 lg:inset-20',
              'bg-white dark:bg-gray-900',
              'border border-gray-200 dark:border-gray-800',
              'shadow-2xl',
              'overflow-hidden',
              'flex flex-col',
            )}
            style={{ borderRadius: sizeConfig.borderRadius + 4 }}
          >
            {/* Header */}
            <div
              className={cn(
                'flex items-center justify-between',
                'border-b border-gray-200 dark:border-gray-800',
                'bg-gray-50 dark:bg-gray-800/50',
              )}
              style={{ padding: sizeConfig.padding }}
            >
              <div className="flex items-center gap-3">
                <h2
                  className="font-semibold text-gray-900 dark:text-gray-100"
                  style={{ fontSize: sizeConfig.fontSize + 4 }}
                >
                  {component.name}
                </h2>
                <span className="px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  {component.files.length} file
                  {component.files.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
                    'bg-gray-900 dark:bg-white text-white dark:text-gray-900',
                    'hover:bg-gray-800 dark:hover:bg-gray-100',
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy All
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    'p-2 rounded-lg',
                    'text-gray-500 dark:text-gray-400',
                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                    'transition-colors duration-150',
                  )}
                >
                  <svg
                    className="w-5 h-5"
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
              </div>
            </div>

            {/* File Tabs */}
            <div className="flex items-center gap-1 px-4 pt-2 bg-gray-100 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
              {component.files.map((file, index) => (
                <FileTab
                  key={file.name}
                  file={file}
                  isActive={index === activeFileIndex}
                  onClick={() => setActiveFileIndex(index)}
                  size={size}
                />
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto">
              <div className="relative">
                {/* Copy button for current file */}
                <div className="absolute top-3 right-3 z-10">
                  <CodeCopyButton content={activeFile.content} size={size} />
                </div>

                {/* Code */}
                <pre
                  className="p-4 min-h-full font-mono text-gray-800 dark:text-gray-200"
                  style={{
                    fontSize: sizeConfig.fontSize - 1,
                    lineHeight: 1.6,
                  }}
                >
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(
                        activeFile.content,
                        activeFile.language,
                      ),
                    }}
                  />
                </pre>
              </div>
            </div>

            {/* Footer with dependencies */}
            {component.dependencies.length > 0 && (
              <div
                className={cn(
                  'border-t border-gray-200 dark:border-gray-800',
                  'bg-gray-50 dark:bg-gray-800/50',
                )}
                style={{ padding: sizeConfig.padding }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-gray-500 dark:text-gray-400"
                      style={{ fontSize: sizeConfig.fontSize - 1 }}
                    >
                      Dependencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {component.dependencies.map((dep) => (
                        <span
                          key={dep.name}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-mono"
                          style={{ fontSize: sizeConfig.fontSize - 2 }}
                        >
                          {dep.name}@{dep.version}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ComponentCode;
