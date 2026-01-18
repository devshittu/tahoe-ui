// src/app/playground/code-preview/components/CodePreview.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useHighlighter } from './hooks';
import { CodeBlock, CopyButton, CollapseToggle } from './primitives';
import type { CodePreviewProps, CodeLanguage } from './types';
import {
  getSizeConfig,
  CODE_PREVIEW_ANIMATIONS,
  DEFAULT_LIGHT_THEME,
  DEFAULT_DARK_THEME,
} from './types';

/**
 * CodePreview - Syntax-highlighted code display component
 *
 * A thoughtfully designed code preview component with:
 * - Shiki-powered syntax highlighting
 * - Theme-aware (auto light/dark)
 * - Copy-to-clipboard with visual feedback
 * - Collapsible for long code blocks
 * - Optional line numbers
 * - Line highlighting
 *
 * Apple-like design:
 * - Glassmorphism container
 * - Subtle shadows and borders
 * - Spring-based animations
 * - Clean typography
 *
 * @example
 * ```tsx
 * <CodePreview
 *   code={`const greeting = "Hello, World!";`}
 *   language="typescript"
 *   showLineNumbers
 *   showCopyButton
 * />
 * ```
 */
export function CodePreview({
  code,
  language = 'typescript',
  title,
  filename,
  size = 'default',
  showLineNumbers = false,
  highlightLines = [],
  showCopyButton = true,
  copyButtonPosition = 'top-right',
  collapsible = false,
  defaultCollapsed = true,
  maxLines = 15,
  lightTheme = DEFAULT_LIGHT_THEME,
  darkTheme = DEFAULT_DARK_THEME,
  showLanguageBadge = true,
  className,
  onCopy,
  onCollapsedChange,
  disabled = false,
  ariaLabel,
}: CodePreviewProps) {
  const sizeConfig = getSizeConfig(size);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { highlight, isReady, isLoading } = useHighlighter({
    lightTheme,
    darkTheme,
  });

  // Collapsed state
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // Update parent when collapsed state changes
  useEffect(() => {
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  // Count lines
  const totalLines = useMemo(() => code.split('\n').length, [code]);

  // Determine if we should show collapse toggle
  const shouldShowCollapse = collapsible && totalLines > maxLines;

  // Get visible code when collapsed
  const visibleCode = useMemo(() => {
    if (!shouldShowCollapse || !isCollapsed) {
      return code;
    }
    const lines = code.split('\n');
    return lines.slice(0, maxLines).join('\n');
  }, [code, shouldShowCollapse, isCollapsed, maxLines]);

  // Hidden lines count
  const hiddenLinesCount =
    shouldShowCollapse && isCollapsed ? totalLines - maxLines : 0;

  // Generate highlighted HTML
  const highlightedHtml = useMemo(() => {
    return highlight(visibleCode, language as CodeLanguage, isDark);
  }, [highlight, visibleCode, language, isDark]);

  // Display label (filename takes precedence)
  const displayLabel = filename || title;

  // Language badge text
  const languageBadgeText = useMemo(() => {
    const languageMap: Record<string, string> = {
      typescript: 'TS',
      tsx: 'TSX',
      javascript: 'JS',
      jsx: 'JSX',
      json: 'JSON',
      css: 'CSS',
      html: 'HTML',
      bash: 'Bash',
      shell: 'Shell',
      markdown: 'MD',
      python: 'Python',
      rust: 'Rust',
      go: 'Go',
    };
    return languageMap[language] || language.toUpperCase();
  }, [language]);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={CODE_PREVIEW_ANIMATIONS.springGentle}
      className={cn(
        'code-preview',
        'relative',
        'overflow-hidden',
        // Glassmorphism container
        'bg-white/90 dark:bg-gray-900/90',
        'backdrop-blur-xl backdrop-saturate-150',
        // Border and shadow
        'border border-gray-200/60 dark:border-gray-700/50',
        'shadow-lg shadow-black/5 dark:shadow-black/20',
        // Ring for depth
        'ring-1 ring-white/50 dark:ring-white/5 ring-inset',
        // Disabled state
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
      style={{
        borderRadius: sizeConfig.borderRadius,
      }}
      role="region"
      aria-label={
        ariaLabel || `Code example${displayLabel ? `: ${displayLabel}` : ''}`
      }
    >
      {/* Header bar (if title/filename or language badge) */}
      {(displayLabel || showLanguageBadge) && (
        <div
          className={cn(
            'flex items-center justify-between',
            'px-4 py-2',
            'border-b border-gray-200/60 dark:border-gray-700/50',
            'bg-gray-50/50 dark:bg-gray-800/30',
          )}
        >
          {/* Title/filename */}
          {displayLabel && (
            <span
              className={cn(
                'text-sm font-medium',
                'text-gray-700 dark:text-gray-300',
                filename && 'font-mono',
              )}
            >
              {displayLabel}
            </span>
          )}

          {/* Language badge */}
          {showLanguageBadge && (
            <span
              className={cn(
                'px-2 py-0.5',
                'text-xs font-medium',
                'rounded-md',
                'bg-gray-100 dark:bg-gray-700',
                'text-gray-500 dark:text-gray-400',
                !displayLabel && 'ml-auto',
              )}
            >
              {languageBadgeText}
            </span>
          )}
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        {/* Loading skeleton */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                'absolute inset-0',
                'bg-gray-100/50 dark:bg-gray-800/50',
                'flex items-center justify-center',
              )}
              style={{ padding: sizeConfig.padding }}
            >
              <div className="space-y-2 w-full">
                {Array.from({ length: Math.min(5, maxLines) }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    style={{ width: `${60 + Math.random() * 30}%` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlighted code */}
        <CodeBlock
          html={highlightedHtml}
          showLineNumbers={showLineNumbers}
          highlightLines={highlightLines}
          size={size}
        />

        {/* Copy button */}
        {showCopyButton && (
          <CopyButton
            code={code}
            position={copyButtonPosition}
            size={size}
            onCopy={onCopy}
            disabled={disabled}
          />
        )}
      </div>

      {/* Collapse toggle */}
      {shouldShowCollapse && (
        <div className="px-4 pb-3">
          <CollapseToggle
            isCollapsed={isCollapsed}
            onToggle={handleToggleCollapse}
            hiddenLinesCount={hiddenLinesCount}
            size={size}
          />
        </div>
      )}
    </motion.div>
  );
}

export default CodePreview;
