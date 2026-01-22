'use client';

import { useState, useCallback, useRef } from 'react';
import type { RegistryComponent } from '../types';

interface UseCopyComponentOptions {
  /** Duration to show copied state (ms) */
  successDuration?: number;
  /** Callback on successful copy */
  onSuccess?: (component: RegistryComponent, content: string) => void;
  /** Callback on copy error */
  onError?: (error: Error) => void;
}

interface UseCopyComponentReturn {
  /** Copy a component to clipboard */
  copyComponent: (component: RegistryComponent) => Promise<boolean>;
  /** ID of the last copied component */
  copiedId: string | null;
  /** Whether currently copying */
  isCopying: boolean;
}

/**
 * Hook for copying component code to clipboard
 */
export function useCopyComponent(
  options: UseCopyComponentOptions = {},
): UseCopyComponentReturn {
  const { successDuration = 2000, onSuccess, onError } = options;

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyComponent = useCallback(
    async (component: RegistryComponent): Promise<boolean> => {
      if (isCopying) return false;

      setIsCopying(true);

      // Clear previous timeout
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      try {
        // Combine all component files into a single copyable string
        const entryFile = component.files.find((f) => f.isEntry);
        const fileToCopy = entryFile || component.files[0];

        if (!fileToCopy) {
          throw new Error('No files to copy');
        }

        // Build the full content with header
        const header = `// ${component.name}\n// ${component.description}\n\n`;
        const content = header + fileToCopy.content;

        // Copy to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(content);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = content;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        setCopiedId(component.id);
        onSuccess?.(component, content);

        // Auto-reset after success duration
        timeoutRef.current = setTimeout(() => {
          setCopiedId(null);
        }, successDuration);

        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to copy component');
        onError?.(error);
        return false;
      } finally {
        setIsCopying(false);
      }
    },
    [isCopying, successDuration, onSuccess, onError],
  );

  return {
    copyComponent,
    copiedId,
    isCopying,
  };
}

export default useCopyComponent;
