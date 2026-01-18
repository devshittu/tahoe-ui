// src/app/playground/code-preview/components/hooks/useCopyToClipboard.ts
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseCopyToClipboardOptions {
  /** Duration to show success state (ms) */
  successDuration?: number;
  /** Callback on successful copy */
  onCopy?: (text: string) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

interface UseCopyToClipboardReturn {
  /** Copy text to clipboard */
  copy: (text: string) => Promise<boolean>;
  /** Whether copy was successful (resets after duration) */
  isCopied: boolean;
  /** Whether copy is in progress */
  isCopying: boolean;
  /** Error if copy failed */
  error: Error | null;
  /** Reset state manually */
  reset: () => void;
}

/**
 * Hook for copying text to clipboard with visual feedback
 *
 * Features:
 * - Async clipboard API with fallback
 * - Success state with auto-reset
 * - Error handling
 * - Prevents rapid re-copies
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {},
): UseCopyToClipboardReturn {
  const { successDuration = 2000, onCopy, onError } = options;

  const [isCopied, setIsCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const reset = useCallback(() => {
    setIsCopied(false);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      // Prevent rapid re-copies
      if (isCopying) return false;

      setIsCopying(true);
      setError(null);

      try {
        // Modern async clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers or non-secure contexts
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          const success = document.execCommand('copy');
          document.body.removeChild(textArea);

          if (!success) {
            throw new Error('Copy command failed');
          }
        }

        setIsCopied(true);
        onCopy?.(text);

        // Reset after duration
        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
        }, successDuration);

        return true;
      } catch (err) {
        const copyError =
          err instanceof Error ? err : new Error('Failed to copy to clipboard');
        setError(copyError);
        onError?.(copyError);
        return false;
      } finally {
        setIsCopying(false);
      }
    },
    [isCopying, successDuration, onCopy, onError],
  );

  return {
    copy,
    isCopied,
    isCopying,
    error,
    reset,
  };
}

export default useCopyToClipboard;
