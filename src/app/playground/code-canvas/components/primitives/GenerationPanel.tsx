// src/app/playground/code-canvas/components/primitives/GenerationPanel.tsx
'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { GenerationPanelProps } from '../types';
import { getSizeConfig, CANVAS_ANIMATIONS } from '../types';

/**
 * Simple syntax highlighting for code
 */
function highlightCode(code: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Keywords
  html = html.replace(
    /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|new|this|async|await|try|catch|throw|default|as|React|useState|useEffect|useCallback|useMemo|useRef)(?=\s|[^a-zA-Z0-9_])/g,
    '<span class="text-purple-600 dark:text-purple-400">$1</span>',
  );
  // Strings
  html = html.replace(
    /(["`'])(?:(?!\1)[^\\]|\\.)*\1/g,
    '<span class="text-green-600 dark:text-green-400">$&</span>',
  );
  // Comments
  html = html.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    '<span class="text-gray-400 dark:text-gray-500">$1</span>',
  );
  // JSX tags
  html = html.replace(
    /(&lt;\/?)([\w]+)/g,
    '$1<span class="text-blue-600 dark:text-blue-400">$2</span>',
  );
  // JSX attributes
  html = html.replace(
    /\s([\w-]+)=/g,
    ' <span class="text-orange-600 dark:text-orange-400">$1</span>=',
  );

  return html;
}

/**
 * Iteration input component
 */
interface IterationInputProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
  size: 'compact' | 'default' | 'large';
}

function IterationInput({ onSubmit, isGenerating, size }: IterationInputProps) {
  const sizeConfig = getSizeConfig(size);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (value.trim() && !isGenerating) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Describe changes (e.g., 'make it rounded', 'add a shadow')..."
        disabled={isGenerating}
        className={cn(
          'flex-1 px-3 py-2 rounded-lg',
          'bg-gray-50 dark:bg-gray-800',
          'border border-gray-200 dark:border-gray-700',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500',
          'disabled:opacity-50',
        )}
        style={{ fontSize: sizeConfig.fontSize - 1 }}
      />
      <motion.button
        type="button"
        onClick={handleSubmit}
        disabled={!value.trim() || isGenerating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'px-4 py-2 rounded-lg font-medium',
          'transition-colors duration-150',
          value.trim() && !isGenerating
            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed',
        )}
        style={{ fontSize: sizeConfig.fontSize - 1 }}
      >
        Iterate
      </motion.button>
    </div>
  );
}

/**
 * Generation panel with code display and iteration input
 */
export function GenerationPanel({
  code,
  status,
  error,
  onIterate,
  onCopy,
  size = 'default',
  theme = 'auto',
  className,
}: GenerationPanelProps) {
  const sizeConfig = getSizeConfig(size);
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  // Auto-scroll to bottom during streaming
  useEffect(() => {
    if (status === 'streaming' && codeRef.current) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [code, status]);

  // Handle copy
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy();
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code, onCopy]);

  const isGenerating = status === 'generating' || status === 'streaming';
  const hasCode = code.length > 0;

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-white dark:bg-gray-900',
        'border border-gray-200 dark:border-gray-800',
        className,
      )}
      style={{ borderRadius: sizeConfig.borderRadius }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-4',
          'border-b border-gray-200 dark:border-gray-800',
          'bg-gray-50 dark:bg-gray-800/50',
        )}
        style={{ height: sizeConfig.headerHeight }}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-medium text-gray-700 dark:text-gray-300"
            style={{ fontSize: sizeConfig.fontSize }}
          >
            Generated Code
          </span>
          {status === 'streaming' && (
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span style={{ fontSize: sizeConfig.fontSize - 2 }}>
                Streaming...
              </span>
            </span>
          )}
        </div>

        {hasCode && (
          <div className="flex items-center gap-2">
            {/* Copy button */}
            <motion.button
              type="button"
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
                'transition-colors duration-150',
                copied
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
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
          </div>
        )}
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-hidden relative">
        {error ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center max-w-md">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600 dark:text-red-400"
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
              <p
                className="text-red-600 dark:text-red-400 font-medium mb-2"
                style={{ fontSize: sizeConfig.fontSize }}
              >
                Generation Failed
              </p>
              <p
                className="text-gray-500 dark:text-gray-400"
                style={{ fontSize: sizeConfig.fontSize - 1 }}
              >
                {error}
              </p>
            </div>
          </div>
        ) : !hasCode && status === 'idle' ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
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
              <p
                className="text-gray-600 dark:text-gray-400 font-medium mb-2"
                style={{ fontSize: sizeConfig.fontSize }}
              >
                Ready to Generate
              </p>
              <p
                className="text-gray-400 dark:text-gray-500"
                style={{ fontSize: sizeConfig.fontSize - 1 }}
              >
                Enter a prompt above to create a component
              </p>
            </div>
          </div>
        ) : status === 'generating' ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-blue-100 dark:border-blue-900" />
                <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              </div>
              <p
                className="text-gray-600 dark:text-gray-400 font-medium"
                style={{ fontSize: sizeConfig.fontSize }}
              >
                Generating code...
              </p>
            </div>
          </div>
        ) : (
          <pre
            ref={codeRef}
            className={cn(
              'h-full overflow-auto p-4 font-mono',
              'text-gray-800 dark:text-gray-200',
            )}
            style={{ fontSize: sizeConfig.fontSize - 1, lineHeight: 1.6 }}
          >
            <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
            {status === 'streaming' && (
              <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-0.5" />
            )}
          </pre>
        )}
      </div>

      {/* Iteration input */}
      <AnimatePresence>
        {hasCode && status === 'complete' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={CANVAS_ANIMATIONS.fast}
            className="border-t border-gray-200 dark:border-gray-800 p-3"
          >
            <IterationInput
              onSubmit={onIterate}
              isGenerating={isGenerating}
              size={size}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GenerationPanel;
