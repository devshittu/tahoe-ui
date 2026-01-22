'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { ComponentCardProps } from '../types';
import {
  getSizeConfig,
  BLOCKS_ANIMATIONS,
  BLOCKS_STYLES,
  CATEGORY_INFO,
  COMPLEXITY_INFO,
} from '../types';

// Simple icons
const CopyIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CodeIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * ComponentCard - Display card for a registry component
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
  const categoryInfo = CATEGORY_INFO[component.category];
  const complexityInfo = COMPLEXITY_INFO[component.complexity];
  const [justCopied, setJustCopied] = React.useState(false);

  const handleCopy = () => {
    onCopy?.(component);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };

  const isGrid = viewMode === 'grid';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={BLOCKS_ANIMATIONS.spring}
      className={twMerge(
        'group relative',
        'rounded-xl',
        BLOCKS_STYLES.card.base,
        BLOCKS_STYLES.card.border,
        BLOCKS_STYLES.card.hover,
        BLOCKS_STYLES.card.shadow,
        'transition-all duration-200',
        isGrid ? 'flex flex-col' : 'flex flex-row items-center gap-4',
        className,
      )}
      style={{
        padding: sizeConfig.padding,
        borderRadius: sizeConfig.borderRadius,
        minHeight: isGrid ? sizeConfig.cardMinHeight : 'auto',
      }}
    >
      {/* Preview area (grid mode only) */}
      {isGrid && showPreview && component.preview && (
        <div
          className={twMerge(
            'mb-3 rounded-lg overflow-hidden',
            'bg-bg-secondary/50 dark:bg-bg-tertiary/50',
            'border border-border-subtle/30',
          )}
          style={{ height: 80 }}
        >
          <div className="w-full h-full flex items-center justify-center p-2 scale-75 origin-center">
            <component.preview {...(component.defaultProps || {})} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={twMerge('flex-1', isGrid ? '' : 'min-w-0')}>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-semibold text-text-primary dark:text-text-primary truncate"
            style={{ fontSize: sizeConfig.fontSize + 1 }}
          >
            {component.name}
          </h3>
          <span
            className={twMerge(
              'px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0',
              BLOCKS_STYLES.badge[component.complexity],
            )}
          >
            {complexityInfo.label}
          </span>
        </div>

        {/* Description */}
        <p
          className={twMerge(
            'text-text-secondary dark:text-text-muted',
            isGrid ? 'line-clamp-2' : 'line-clamp-1',
          )}
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          {component.description}
        </p>

        {/* Tags */}
        {component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {component.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={twMerge(
                  'px-1.5 py-0.5 rounded',
                  'text-xs',
                  'bg-bg-secondary dark:bg-bg-tertiary',
                  'text-text-muted',
                )}
              >
                {tag}
              </span>
            ))}
            {component.tags.length > 3 && (
              <span className="text-xs text-text-muted">
                +{component.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        className={twMerge(
          'flex gap-2',
          isGrid
            ? 'mt-3 pt-3 border-t border-border-subtle/30'
            : 'flex-shrink-0',
        )}
      >
        <button
          type="button"
          onClick={handleCopy}
          className={twMerge(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
            'text-sm font-medium',
            'transition-colors duration-150',
            justCopied
              ? 'bg-success/10 text-success'
              : 'bg-brand-primary-500/10 text-brand-primary-600 dark:text-brand-primary-400 hover:bg-brand-primary-500/20',
          )}
        >
          {justCopied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          <span>{justCopied ? 'Copied' : 'Copy'}</span>
        </button>
        <button
          type="button"
          onClick={() => onViewCode?.(component)}
          className={twMerge(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
            'text-sm font-medium',
            'bg-bg-secondary dark:bg-bg-tertiary',
            'text-text-secondary dark:text-text-muted',
            'hover:bg-bg-tertiary dark:hover:bg-bg-secondary',
            'transition-colors duration-150',
          )}
        >
          <CodeIcon size={14} />
          <span>Code</span>
        </button>
      </div>
    </motion.article>
  );
}

export default ComponentCard;
