// src/app/playground/code-canvas/components/hooks/useCanvasState.ts
'use client';

import { useState, useCallback, useRef } from 'react';
import type {
  GenerationVersion,
  GenerationHistory,
  GenerationStatus,
} from '../types';
import { selectMockGeneration } from '../types';

interface UseCanvasStateOptions {
  /** API endpoint for generation */
  apiEndpoint?: string;
  /** Use mock mode for demo */
  mockMode?: boolean;
  /** Callback when generation completes */
  onGenerate?: (code: string, prompt: string) => void;
}

interface UseCanvasStateReturn {
  /** Current prompt */
  prompt: string;
  /** Set prompt */
  setPrompt: (prompt: string) => void;
  /** Current generated code */
  code: string;
  /** Generation status */
  status: GenerationStatus;
  /** Error message if any */
  error: string | null;
  /** Generation history */
  history: GenerationHistory;
  /** Generate code from prompt */
  generate: () => Promise<void>;
  /** Iterate on current code with new prompt */
  iterate: (iterationPrompt: string) => Promise<void>;
  /** Select a version from history */
  selectVersion: (id: string) => void;
  /** Delete a version from history */
  deleteVersion: (id: string) => void;
  /** Clear all history */
  clearHistory: () => void;
  /** Reset state */
  reset: () => void;
}

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Simulate streaming text generation
 */
async function streamText(
  text: string,
  onChunk: (chunk: string) => void,
  delay = 15,
): Promise<void> {
  const lines = text.split('\n');
  for (const line of lines) {
    for (let i = 0; i < line.length; i += 3) {
      const chunk = line.slice(i, i + 3);
      onChunk(chunk);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    onChunk('\n');
    await new Promise((resolve) => setTimeout(resolve, delay * 2));
  }
}

/**
 * Hook for managing canvas generation state
 */
export function useCanvasState({
  apiEndpoint,
  mockMode = true,
  onGenerate,
}: UseCanvasStateOptions = {}): UseCanvasStateReturn {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GenerationHistory>({
    versions: [],
    currentVersionId: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Add a version to history
   */
  const addVersion = useCallback((version: GenerationVersion) => {
    setHistory((prev) => ({
      versions: [version, ...prev.versions],
      currentVersionId: version.id,
    }));
  }, []);

  /**
   * Update a version in history
   */
  const updateVersion = useCallback(
    (id: string, updates: Partial<GenerationVersion>) => {
      setHistory((prev) => ({
        ...prev,
        versions: prev.versions.map((v) =>
          v.id === id ? { ...v, ...updates } : v,
        ),
      }));
    },
    [],
  );

  /**
   * Generate code using mock mode (streaming simulation)
   */
  const generateMock = useCallback(
    async (promptText: string, parentId?: string) => {
      const versionId = generateId();

      // Add pending version
      addVersion({
        id: versionId,
        prompt: promptText,
        code: '',
        timestamp: Date.now(),
        status: 'generating',
        parentId,
      });

      setStatus('streaming');
      setError(null);

      try {
        // Simulate initial delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Get mock generation based on prompt
        const mockCode = selectMockGeneration(promptText);
        let streamedCode = '';

        // Stream the code
        await streamText(mockCode, (chunk) => {
          streamedCode += chunk;
          setCode(streamedCode);
          updateVersion(versionId, { code: streamedCode, status: 'streaming' });
        });

        // Complete
        setStatus('complete');
        updateVersion(versionId, { code: streamedCode, status: 'complete' });
        onGenerate?.(streamedCode, promptText);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Generation failed';
        setStatus('error');
        setError(errorMessage);
        updateVersion(versionId, { status: 'error', error: errorMessage });
      }
    },
    [addVersion, updateVersion, onGenerate],
  );

  /**
   * Generate code using API endpoint
   */
  const generateAPI = useCallback(
    async (promptText: string, parentId?: string) => {
      if (!apiEndpoint) {
        throw new Error('API endpoint not configured');
      }

      const versionId = generateId();

      // Add pending version
      addVersion({
        id: versionId,
        prompt: promptText,
        code: '',
        timestamp: Date.now(),
        status: 'generating',
        parentId,
      });

      setStatus('generating');
      setError(null);

      // Create abort controller
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptText,
            context: parentId ? code : undefined,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Check if response is streaming
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('text/event-stream')) {
          // Handle SSE streaming
          setStatus('streaming');
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let streamedCode = '';

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split('\n');

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') break;
                  try {
                    const parsed = JSON.parse(data);
                    if (parsed.content) {
                      streamedCode += parsed.content;
                      setCode(streamedCode);
                      updateVersion(versionId, { code: streamedCode });
                    }
                  } catch {
                    // Not JSON, use raw text
                    streamedCode += data;
                    setCode(streamedCode);
                    updateVersion(versionId, { code: streamedCode });
                  }
                }
              }
            }
          }

          setStatus('complete');
          updateVersion(versionId, { status: 'complete' });
          onGenerate?.(streamedCode, promptText);
        } else {
          // Handle JSON response
          const data = await response.json();
          const generatedCode = data.code || data.content || '';

          setCode(generatedCode);
          setStatus('complete');
          updateVersion(versionId, { code: generatedCode, status: 'complete' });
          onGenerate?.(generatedCode, promptText);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          setStatus('idle');
          return;
        }

        const errorMessage =
          err instanceof Error ? err.message : 'Generation failed';
        setStatus('error');
        setError(errorMessage);
        updateVersion(versionId, { status: 'error', error: errorMessage });
      } finally {
        abortControllerRef.current = null;
      }
    },
    [apiEndpoint, addVersion, updateVersion, code, onGenerate],
  );

  /**
   * Generate code from current prompt
   */
  const generate = useCallback(async () => {
    if (!prompt.trim()) return;

    if (mockMode) {
      await generateMock(prompt);
    } else {
      await generateAPI(prompt);
    }
  }, [prompt, mockMode, generateMock, generateAPI]);

  /**
   * Iterate on current code with new prompt
   */
  const iterate = useCallback(
    async (iterationPrompt: string) => {
      if (!iterationPrompt.trim()) return;

      const currentVersionId = history.currentVersionId;
      const fullPrompt = `Based on this code:\n\`\`\`\n${code}\n\`\`\`\n\nMake this change: ${iterationPrompt}`;

      setPrompt(iterationPrompt);

      if (mockMode) {
        await generateMock(fullPrompt, currentVersionId || undefined);
      } else {
        await generateAPI(fullPrompt, currentVersionId || undefined);
      }
    },
    [code, history.currentVersionId, mockMode, generateMock, generateAPI],
  );

  /**
   * Select a version from history
   */
  const selectVersion = useCallback((id: string) => {
    setHistory((prev) => {
      const version = prev.versions.find((v) => v.id === id);
      if (version) {
        setCode(version.code);
        setPrompt(version.prompt);
        setStatus(version.status);
        setError(version.error || null);
      }
      return { ...prev, currentVersionId: id };
    });
  }, []);

  /**
   * Delete a version from history
   */
  const deleteVersion = useCallback((id: string) => {
    setHistory((prev) => {
      const newVersions = prev.versions.filter((v) => v.id !== id);
      let newCurrentId = prev.currentVersionId;

      // If deleting current version, select the next one
      if (id === prev.currentVersionId) {
        newCurrentId = newVersions[0]?.id || null;
        if (newCurrentId) {
          const newCurrent = newVersions.find((v) => v.id === newCurrentId);
          if (newCurrent) {
            setCode(newCurrent.code);
            setPrompt(newCurrent.prompt);
            setStatus(newCurrent.status);
          }
        } else {
          setCode('');
          setPrompt('');
          setStatus('idle');
        }
      }

      return { versions: newVersions, currentVersionId: newCurrentId };
    });
  }, []);

  /**
   * Clear all history
   */
  const clearHistory = useCallback(() => {
    setHistory({ versions: [], currentVersionId: null });
    setCode('');
    setPrompt('');
    setStatus('idle');
    setError(null);
  }, []);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    // Abort any ongoing request
    abortControllerRef.current?.abort();

    setPrompt('');
    setCode('');
    setStatus('idle');
    setError(null);
  }, []);

  return {
    prompt,
    setPrompt,
    code,
    status,
    error,
    history,
    generate,
    iterate,
    selectVersion,
    deleteVersion,
    clearHistory,
    reset,
  };
}

export default useCanvasState;
