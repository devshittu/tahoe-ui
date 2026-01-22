'use client';

import { useState, useCallback, useRef } from 'react';

interface UseCopyToClipboardOptions {
  /** Duration to show copied state (ms) */
  successDuration?: number;
  /** Callback when copy succeeds */
  onCopy?: (text: string) => void;
  /** Callback when copy fails */
  onError?: (error: Error) => void;
}

interface UseCopyToClipboardReturn {
  /** Copy text to clipboard */
  copy: (text: string) => Promise<boolean>;
  /** Whether currently copying */
  isCopying: boolean;
  /** Whether copy just succeeded */
  isCopied: boolean;
  /** Reset copied state */
  reset: () => void;
}

/**
 * Hook for copying text to clipboard with feedback state
 *
 * Features:
 * - Async clipboard API with fallback
 * - Success state with auto-reset
 * - Error handling
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {},
): UseCopyToClipboardReturn {
  const { successDuration = 2000, onCopy, onError } = options;

  const [isCopying, setIsCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    setIsCopied(false);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (isCopying) return false;

      setIsCopying(true);
      reset();

      try {
        // Try modern clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);

          if (!successful) {
            throw new Error('Copy command failed');
          }
        }

        setIsCopied(true);
        onCopy?.(text);

        // Auto-reset after success duration
        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
        }, successDuration);

        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to copy to clipboard');
        onError?.(error);
        return false;
      } finally {
        setIsCopying(false);
      }
    },
    [isCopying, reset, successDuration, onCopy, onError],
  );

  return {
    copy,
    isCopying,
    isCopied,
    reset,
  };
}

export default useCopyToClipboard;
