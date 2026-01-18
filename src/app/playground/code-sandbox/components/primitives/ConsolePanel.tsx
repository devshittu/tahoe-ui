// src/app/playground/code-sandbox/components/primitives/ConsolePanel.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandpackConsole } from '@codesandbox/sandpack-react';
import { cn } from '@/lib/utils';
import type { ConsolePanelProps, ConsoleEntry, SandboxSize } from '../types';
import { getSizeConfig, SANDBOX_ANIMATIONS } from '../types';

/**
 * Format console message for display
 */
function formatMessage(data: unknown): string {
  if (data === null) return 'null';
  if (data === undefined) return 'undefined';
  if (typeof data === 'string') return data;
  if (typeof data === 'number' || typeof data === 'boolean')
    return String(data);
  if (typeof data === 'object') {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }
  return String(data);
}

/**
 * Console entry row component
 */
interface ConsoleEntryRowProps {
  entry: ConsoleEntry;
  size: SandboxSize;
}

function ConsoleEntryRow({ entry, size }: ConsoleEntryRowProps) {
  const sizeConfig = getSizeConfig(size);
  const timestamp = new Date(entry.timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const typeStyles: Record<string, string> = {
    log: 'text-gray-700 dark:text-gray-300',
    info: 'text-blue-600 dark:text-blue-400',
    warn: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20',
    error: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20',
  };

  const typeIcons: Record<string, string> = {
    log: '›',
    info: 'ℹ',
    warn: '⚠',
    error: '✕',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SANDBOX_ANIMATIONS.fast}
      className={cn(
        'flex items-start gap-2 px-3 py-1.5',
        'border-b border-gray-100 dark:border-gray-800/50',
        'hover:bg-gray-50 dark:hover:bg-gray-800/30',
        typeStyles[entry.type],
      )}
    >
      <span
        className="flex-shrink-0 font-mono opacity-50"
        style={{ fontSize: sizeConfig.fontSize - 2 }}
      >
        {timestamp}
      </span>
      <span
        className="flex-shrink-0 w-4 text-center"
        style={{ fontSize: sizeConfig.fontSize - 1 }}
      >
        {typeIcons[entry.type]}
      </span>
      <pre
        className="flex-1 font-mono whitespace-pre-wrap break-all"
        style={{ fontSize: sizeConfig.fontSize - 1 }}
      >
        {entry.message}
      </pre>
    </motion.div>
  );
}

/**
 * Console panel using Sandpack's console hook
 */
function ConsolePanelInner({
  size = 'default',
  className,
}: Omit<ConsolePanelProps, 'entries' | 'onClear'>) {
  const sizeConfig = getSizeConfig(size);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { logs, reset } = useSandpackConsole({ resetOnPreviewRestart: true });

  // Convert Sandpack logs to our ConsoleEntry format
  const entries: ConsoleEntry[] = React.useMemo(() => {
    return logs.map((log, index) => ({
      id: `${log.id || index}`,
      type: log.method as ConsoleEntry['type'],
      message: log.data?.map(formatMessage).join(' ') || '',
      timestamp: Date.now() - (logs.length - index) * 100,
      data: log.data,
    }));
  }, [logs]);

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-white dark:bg-gray-900',
        'border-t border-gray-200 dark:border-gray-800',
        className,
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-3',
          'bg-gray-50 dark:bg-gray-800/50',
          'border-b border-gray-200 dark:border-gray-800',
        )}
        style={{ height: sizeConfig.headerHeight - 8 }}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-medium text-gray-700 dark:text-gray-300"
            style={{ fontSize: sizeConfig.fontSize - 1 }}
          >
            Console
          </span>
          {entries.length > 0 && (
            <span
              className="px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              style={{ fontSize: sizeConfig.fontSize - 2 }}
            >
              {entries.length}
            </span>
          )}
        </div>

        <motion.button
          type="button"
          onClick={() => reset()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'p-1 rounded',
            'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'transition-colors duration-150',
          )}
          title="Clear console"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </motion.button>
      </div>

      {/* Console entries */}
      <div ref={scrollRef} className="flex-1 overflow-auto">
        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span
              className="text-gray-400 dark:text-gray-500"
              style={{ fontSize: sizeConfig.fontSize - 1 }}
            >
              No console output
            </span>
          </div>
        ) : (
          <AnimatePresence>
            {entries.map((entry) => (
              <ConsoleEntryRow key={entry.id} entry={entry} size={size} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

/**
 * Standalone console panel (when not using Sandpack context)
 */
export function ConsolePanel({
  entries,
  onClear,
  size = 'default',
  className,
}: ConsolePanelProps) {
  const sizeConfig = getSizeConfig(size);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-white dark:bg-gray-900',
        'border-t border-gray-200 dark:border-gray-800',
        className,
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-3',
          'bg-gray-50 dark:bg-gray-800/50',
          'border-b border-gray-200 dark:border-gray-800',
        )}
        style={{ height: sizeConfig.headerHeight - 8 }}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-medium text-gray-700 dark:text-gray-300"
            style={{ fontSize: sizeConfig.fontSize - 1 }}
          >
            Console
          </span>
          {entries.length > 0 && (
            <span
              className="px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              style={{ fontSize: sizeConfig.fontSize - 2 }}
            >
              {entries.length}
            </span>
          )}
        </div>

        <motion.button
          type="button"
          onClick={onClear}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'p-1 rounded',
            'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'transition-colors duration-150',
          )}
          title="Clear console"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </motion.button>
      </div>

      {/* Console entries */}
      <div ref={scrollRef} className="flex-1 overflow-auto">
        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span
              className="text-gray-400 dark:text-gray-500"
              style={{ fontSize: sizeConfig.fontSize - 1 }}
            >
              No console output
            </span>
          </div>
        ) : (
          <AnimatePresence>
            {entries.map((entry) => (
              <ConsoleEntryRow key={entry.id} entry={entry} size={size} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

/**
 * Console panel that uses Sandpack context
 */
export function SandpackConsolePanel(
  props: Omit<ConsolePanelProps, 'entries' | 'onClear'>,
) {
  return <ConsolePanelInner {...props} />;
}

export default ConsolePanel;
