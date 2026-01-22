'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Highlighter, BundledLanguage, BundledTheme } from 'shiki';
import { DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME } from '../types';

interface UseHighlighterOptions {
  lightTheme?: BundledTheme;
  darkTheme?: BundledTheme;
}

interface UseHighlighterReturn {
  /** Highlight code and return HTML */
  highlight: (
    code: string,
    language: BundledLanguage,
    isDark: boolean,
  ) => string;
  /** Whether highlighter is ready */
  isReady: boolean;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
}

// Singleton highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null;
let highlighterInstance: Highlighter | null = null;

/**
 * Hook for syntax highlighting using Shiki
 *
 * Uses a singleton pattern to share highlighter across components.
 * Lazy-loads Shiki only when needed.
 */
export function useHighlighter(
  options: UseHighlighterOptions = {},
): UseHighlighterReturn {
  const { lightTheme = DEFAULT_LIGHT_THEME, darkTheme = DEFAULT_DARK_THEME } =
    options;

  const [isReady, setIsReady] = useState(!!highlighterInstance);
  const [isLoading, setIsLoading] = useState(!highlighterInstance);
  const [error, setError] = useState<Error | null>(null);
  const loadedLanguagesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (highlighterInstance) {
      setIsReady(true);
      setIsLoading(false);
      return;
    }

    const initHighlighter = async () => {
      try {
        if (!highlighterPromise) {
          highlighterPromise = import('shiki').then(({ createHighlighter }) =>
            createHighlighter({
              themes: [lightTheme, darkTheme],
              langs: [
                'typescript',
                'tsx',
                'javascript',
                'jsx',
                'json',
                'css',
                'html',
                'bash',
                'markdown',
              ],
            }),
          );
        }

        highlighterInstance = await highlighterPromise;
        setIsReady(true);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load highlighter'),
        );
      } finally {
        setIsLoading(false);
      }
    };

    initHighlighter();
  }, [lightTheme, darkTheme]);

  const highlight = useCallback(
    (code: string, language: BundledLanguage, isDark: boolean): string => {
      if (!highlighterInstance) {
        // Fallback: return escaped code in pre/code
        const escaped = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<pre><code>${escaped}</code></pre>`;
      }

      try {
        // Load language dynamically if not already loaded
        const loadedLangs = highlighterInstance.getLoadedLanguages();
        if (
          !loadedLangs.includes(language) &&
          !loadedLanguagesRef.current.has(language)
        ) {
          loadedLanguagesRef.current.add(language);
          // Queue language loading for next render
          highlighterInstance.loadLanguage(language).catch(() => {
            loadedLanguagesRef.current.delete(language);
          });
          // Return fallback for now
          const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          return `<pre><code>${escaped}</code></pre>`;
        }

        const theme = isDark ? darkTheme : lightTheme;
        return highlighterInstance.codeToHtml(code, {
          lang: language,
          theme,
        });
      } catch {
        // Fallback on error
        const escaped = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<pre><code>${escaped}</code></pre>`;
      }
    },
    [lightTheme, darkTheme],
  );

  return {
    highlight,
    isReady,
    isLoading,
    error,
  };
}

export default useHighlighter;
