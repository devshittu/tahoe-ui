// src/app/playground/code-blocks/components/primitives/ComponentCard.tsx
'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ComponentCardProps, ViewMode } from '../types';
import {
  getSizeConfig,
  CATEGORY_INFO,
  COMPLEXITY_INFO,
  BLOCKS_ANIMATIONS,
} from '../types';

/**
 * Complexity badge
 */
function ComplexityBadge({
  complexity,
  size,
}: {
  complexity: 'simple' | 'moderate' | 'complex';
  size: 'compact' | 'default' | 'large';
}) {
  const info = COMPLEXITY_INFO[complexity];
  const sizeConfig = getSizeConfig(size);

  const colorClasses = {
    emerald:
      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    amber:
      'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
  };

  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded-full font-medium',
        colorClasses[info.color as keyof typeof colorClasses],
      )}
      style={{ fontSize: sizeConfig.fontSize - 2 }}
    >
      {info.label}
    </span>
  );
}

/**
 * Category icon
 */
function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, React.ReactNode> = {
    buttons: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
    inputs: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
        />
      </svg>
    ),
    feedback: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    ),
    navigation: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
        />
      </svg>
    ),
    layout: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
    overlay: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
        />
      </svg>
    ),
    'data-display': (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    utility: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  };

  return icons[category] || icons.utility;
}

/**
 * Preview placeholder
 */
function PreviewPlaceholder() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[80px] bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
      <span className="text-gray-400 dark:text-gray-500 text-sm">Preview</span>
    </div>
  );
}

/**
 * Copy button
 */
function CopyButton({
  onClick,
  isCopied,
  size,
}: {
  onClick: () => void;
  isCopied: boolean;
  size: 'compact' | 'default' | 'large';
}) {
  const sizeConfig = getSizeConfig(size);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
        'transition-colors duration-150',
        isCopied
          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
          : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100',
      )}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      {isCopied ? (
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
  );
}

/**
 * Component card - displays a registry component
 */
export function ComponentCard({
  component,
  size = 'default',
  viewMode = 'grid',
  showPreview = true,
  onCopy,
  onViewCode,
  className,
}: ComponentCardProps) {
  const sizeConfig = getSizeConfig(size);
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    onCopy?.(component);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const isListView = viewMode === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={BLOCKS_ANIMATIONS.fast}
      className={cn(
        'group',
        'bg-white/80 dark:bg-gray-900/80',
        'backdrop-blur-xl',
        'border border-gray-200/50 dark:border-gray-800/50',
        'hover:border-gray-300 dark:hover:border-gray-700',
        'transition-colors duration-150',
        'overflow-hidden',
        isListView ? 'flex items-center' : 'flex flex-col',
        className,
      )}
      style={{
        borderRadius: sizeConfig.borderRadius,
        minHeight: isListView ? 'auto' : sizeConfig.cardMinHeight,
      }}
    >
      {/* Preview Section */}
      {showPreview && (
        <div
          className={cn(
            'relative overflow-hidden',
            'bg-gray-50/50 dark:bg-gray-800/30',
            isListView ? 'w-32 h-20 shrink-0' : 'w-full aspect-[16/10]',
          )}
        >
          {component.preview ? (
            <Suspense fallback={<PreviewPlaceholder />}>
              <div className="w-full h-full flex items-center justify-center p-3 scale-75">
                <component.preview {...(component.defaultProps || {})} />
              </div>
            </Suspense>
          ) : (
            <PreviewPlaceholder />
          )}
        </div>
      )}

      {/* Content Section */}
      <div
        className={cn(
          'flex-1 flex flex-col',
          isListView && 'flex-row items-center',
        )}
        style={{ padding: sizeConfig.padding }}
      >
        {/* Header */}
        <div className={cn('flex-1', isListView && 'flex items-center gap-4')}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 dark:text-gray-500">
                <CategoryIcon category={component.category} />
              </span>
              <h3
                className="font-semibold text-gray-900 dark:text-gray-100"
                style={{ fontSize: sizeConfig.fontSize + 2 }}
              >
                {component.name}
              </h3>
            </div>
            <ComplexityBadge complexity={component.complexity} size={size} />
          </div>

          <p
            className="text-gray-500 dark:text-gray-400 line-clamp-2 mb-3"
            style={{ fontSize: sizeConfig.fontSize - 1 }}
          >
            {component.description}
          </p>

          {/* Tags */}
          {!isListView && component.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {component.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  style={{ fontSize: sizeConfig.fontSize - 2 }}
                >
                  {tag}
                </span>
              ))}
              {component.tags.length > 4 && (
                <span
                  className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                  style={{ fontSize: sizeConfig.fontSize - 2 }}
                >
                  +{component.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div
          className={cn(
            'flex items-center gap-2',
            isListView
              ? 'shrink-0'
              : 'mt-auto pt-3 border-t border-gray-100 dark:border-gray-800',
          )}
        >
          <CopyButton onClick={handleCopy} isCopied={isCopied} size={size} />
          <button
            type="button"
            onClick={() => onViewCode?.(component)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
              'text-gray-600 dark:text-gray-400',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'transition-colors duration-150',
            )}
            style={{ fontSize: sizeConfig.fontSize - 1 }}
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
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            View Code
          </button>
        </div>
      </div>

      {/* File count indicator */}
      <div
        className={cn(
          'absolute top-2 right-2',
          'px-2 py-0.5 rounded-md',
          'bg-white/80 dark:bg-gray-900/80',
          'text-gray-500 dark:text-gray-400',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-150',
        )}
        style={{ fontSize: sizeConfig.fontSize - 2 }}
      >
        {component.files.length} file{component.files.length !== 1 ? 's' : ''}
      </div>
    </motion.div>
  );
}

export default ComponentCard;
