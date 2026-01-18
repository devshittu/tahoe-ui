// src/app/playground/code-canvas/components/primitives/PromptInput.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { PromptInputProps, PromptSuggestion } from '../types';
import {
  getSizeConfig,
  CANVAS_ANIMATIONS,
  DEFAULT_SUGGESTIONS,
} from '../types';

/**
 * Suggestion chip component
 */
interface SuggestionChipProps {
  suggestion: PromptSuggestion;
  onClick: () => void;
  size: 'compact' | 'default' | 'large';
}

function SuggestionChip({ suggestion, onClick, size }: SuggestionChipProps) {
  const sizeConfig = getSizeConfig(size);

  const categoryColors: Record<string, string> = {
    component:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    layout:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    feature:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    style:
      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'px-3 py-1.5 rounded-lg',
        'transition-colors duration-150',
        categoryColors[suggestion.category] || categoryColors.component,
      )}
      style={{ fontSize: sizeConfig.fontSize - 2 }}
    >
      {suggestion.text}
    </motion.button>
  );
}

/**
 * Prompt input component with suggestions and submit button
 */
export function PromptInput({
  value,
  onChange,
  onSubmit,
  isGenerating,
  placeholder = 'Describe the UI you want to create...',
  suggestions = DEFAULT_SUGGESTIONS,
  size = 'default',
  className,
}: PromptInputProps) {
  const sizeConfig = getSizeConfig(size);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  // Hide suggestions when typing
  useEffect(() => {
    setShowSuggestions(value.length === 0);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isGenerating && value.trim()) {
        onSubmit();
      }
    }
  };

  const handleSuggestionClick = (suggestion: PromptSuggestion) => {
    onChange(suggestion.text);
    textareaRef.current?.focus();
  };

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Input area */}
      <div
        className={cn(
          'relative',
          'bg-white dark:bg-gray-900',
          'border border-gray-200 dark:border-gray-800',
          'shadow-sm',
          'focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500',
          'transition-all duration-150',
        )}
        style={{ borderRadius: sizeConfig.borderRadius }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isGenerating}
          rows={1}
          className={cn(
            'w-full resize-none',
            'bg-transparent',
            'text-gray-900 dark:text-gray-100',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
          style={{
            fontSize: sizeConfig.fontSize,
            paddingTop: sizeConfig.padding,
            paddingBottom: sizeConfig.padding,
            paddingLeft: sizeConfig.padding,
            paddingRight: 100, // Space for button
            minHeight: 56,
            maxHeight: 200,
          }}
        />

        {/* Submit button */}
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={isGenerating || !value.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2',
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            'font-medium',
            'transition-all duration-150',
            isGenerating
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              : value.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed',
          )}
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Generating...
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Generate
            </>
          )}
        </motion.button>
      </div>

      {/* Keyboard hint */}
      <div
        className="mt-2 flex items-center justify-between"
        style={{ fontSize: sizeConfig.fontSize - 2 }}
      >
        <span className="text-gray-400 dark:text-gray-500">
          Press{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
            Enter
          </kbd>{' '}
          to generate,{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
            Shift+Enter
          </kbd>{' '}
          for new line
        </span>
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={CANVAS_ANIMATIONS.fast}
            className="mt-4"
          >
            <p
              className="text-gray-500 dark:text-gray-400 mb-2"
              style={{ fontSize: sizeConfig.fontSize - 1 }}
            >
              Try one of these:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 6).map((suggestion) => (
                <SuggestionChip
                  key={suggestion.id}
                  suggestion={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  size={size}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PromptInput;
