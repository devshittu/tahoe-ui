'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useHighlighter } from './hooks';
import { CodeBlock, CopyButton, CollapseToggle } from './primitives';
import type { CodePreviewProps, CodeLanguage } from './types';
import {
  getSizeConfig,
  CODE_PREVIEW_ANIMATIONS,
  CODE_PREVIEW_STYLES,
  DEFAULT_LIGHT_THEME,
  DEFAULT_DARK_THEME,
  getLanguageDisplayName,
} from './types';

interface ThemeContextValue {
  resolvedTheme?: string;
}

// Simple theme detection hook (works without next-themes)
function useThemeDetection(): ThemeContextValue {
  const [resolvedTheme, setResolvedTheme] = useState<string>('light');

  useEffect(() => {
    // Check for dark mode preference
    const isDark =
      typeof window !== 'undefined' &&
      (document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setResolvedTheme(isDark ? 'dark' : 'light');

    // Listen for changes
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains('dark');
      setResolvedTheme(isDarkNow ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return { resolvedTheme };
}

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
  const { resolvedTheme } = useThemeDetection();
  const isDark = resolvedTheme === 'dark';

  const { highlight, isLoading } = useHighlighter({
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
    return getLanguageDisplayName(language);
  }, [language]);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={CODE_PREVIEW_ANIMATIONS.springGentle}
      className={twMerge(
        'code-preview',
        'relative',
        'overflow-hidden',
        // CSS variable-backed container styles
        CODE_PREVIEW_STYLES.container.base,
        'backdrop-blur-xl backdrop-saturate-150',
        CODE_PREVIEW_STYLES.container.border,
        CODE_PREVIEW_STYLES.container.shadow,
        CODE_PREVIEW_STYLES.container.ring,
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
          className={twMerge(
            'flex items-center justify-between',
            'px-4 py-2',
            CODE_PREVIEW_STYLES.header.border,
            CODE_PREVIEW_STYLES.header.base,
          )}
        >
          {/* Title/filename */}
          {displayLabel && (
            <span
              className={twMerge(
                'text-sm font-medium',
                CODE_PREVIEW_STYLES.header.title,
                filename && 'font-mono',
              )}
            >
              {displayLabel}
            </span>
          )}

          {/* Language badge */}
          {showLanguageBadge && (
            <span
              className={twMerge(
                'px-2 py-0.5',
                'text-xs font-medium',
                'rounded-md',
                CODE_PREVIEW_STYLES.header.badge,
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
              className={twMerge(
                'absolute inset-0',
                CODE_PREVIEW_STYLES.skeleton.base,
                'flex items-center justify-center',
              )}
              style={{ padding: sizeConfig.padding }}
            >
              <div className="space-y-2 w-full">
                {Array.from({ length: Math.min(5, maxLines) }).map((_, i) => (
                  <div
                    key={i}
                    className={twMerge(
                      'h-4 rounded',
                      CODE_PREVIEW_STYLES.skeleton.base,
                      CODE_PREVIEW_STYLES.skeleton.shimmer,
                    )}
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
