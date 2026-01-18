// src/app/playground/code-blocks/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  CodeBlocks,
  RegistryConfig,
  RegistryComponent,
  BlocksSize,
} from './components';

/**
 * Sample Button Preview Component
 */
function ButtonPreview({
  variant = 'primary',
  size = 'md',
}: {
  variant?: string;
  size?: string;
}) {
  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses: Record<string, string> = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100',
    outline: 'border-2 border-gray-300 text-gray-700 dark:text-gray-300',
  };

  return (
    <button
      type="button"
      className={cn(
        'rounded-lg font-medium',
        sizeClasses[size] || sizeClasses.md,
        variantClasses[variant] || variantClasses.primary,
      )}
    >
      Button
    </button>
  );
}

/**
 * Sample Input Preview Component
 */
function InputPreview() {
  return (
    <input
      type="text"
      placeholder="Enter text..."
      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm w-full max-w-[200px]"
    />
  );
}

/**
 * Sample Card Preview Component
 */
function CardPreview() {
  return (
    <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 w-full max-w-[180px]">
      <div className="w-full h-12 rounded bg-gray-100 dark:bg-gray-700 mb-2" />
      <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-600 mb-1" />
      <div className="h-2 w-1/2 rounded bg-gray-200 dark:bg-gray-600" />
    </div>
  );
}

/**
 * Sample Toast Preview Component
 */
function ToastPreview() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm shadow-lg">
      <svg
        className="w-4 h-4 text-emerald-400"
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
      Saved successfully
    </div>
  );
}

/**
 * Sample Badge Preview Component
 */
function BadgePreview() {
  return (
    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
      Badge
    </span>
  );
}

/**
 * Sample Modal Preview Component
 */
function ModalPreview() {
  return (
    <div className="relative w-full max-w-[160px]">
      <div className="absolute inset-0 bg-black/20 rounded-lg" />
      <div className="relative m-2 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
        <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-600 mb-1" />
        <div className="h-2 w-1/2 rounded bg-gray-200 dark:bg-gray-600" />
      </div>
    </div>
  );
}

/**
 * Sample component registry
 */
const sampleRegistry: RegistryConfig = {
  name: 'Tahoe UI',
  basePath: '@/components',
  components: [
    {
      id: 'button',
      name: 'Button',
      description:
        'Versatile button component with multiple variants, sizes, and states.',
      category: 'buttons',
      complexity: 'simple',
      tags: ['button', 'interactive', 'form', 'click'],
      files: [
        {
          name: 'Button.tsx',
          path: 'Button/Button.tsx',
          language: 'tsx',
          isEntry: true,
          content: `'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        'rounded-lg font-medium transition-colors',
        sizeClasses[size],
        variantClasses[variant],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}`,
        },
      ],
      dependencies: [],
      preview: ButtonPreview,
      defaultProps: { variant: 'primary', size: 'md' },
      featured: true,
    },
    {
      id: 'input',
      name: 'Input',
      description:
        'Text input with validation states, labels, and error messages.',
      category: 'inputs',
      complexity: 'simple',
      tags: ['input', 'form', 'text', 'field'],
      files: [
        {
          name: 'Input.tsx',
          path: 'Form/Input.tsx',
          language: 'tsx',
          isEntry: true,
          content: `'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'px-3 py-2 rounded-lg',
          'border border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
          error && 'border-red-500 focus:ring-red-500/30',
          className,
        )}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      {hint && !error && <span className="text-sm text-gray-500">{hint}</span>}
    </div>
  );
}`,
        },
      ],
      dependencies: [],
      preview: InputPreview,
    },
    {
      id: 'card',
      name: 'Card',
      description:
        'Container component with header, body, and footer sections.',
      category: 'layout',
      complexity: 'simple',
      tags: ['card', 'container', 'layout', 'surface'],
      files: [
        {
          name: 'Card.tsx',
          path: 'Card/Card.tsx',
          language: 'tsx',
          isEntry: true,
          content: `'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({
  children,
  variant = 'elevated',
  padding = 'md',
  className,
}: CardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantClasses = {
    elevated: 'bg-white dark:bg-gray-800 shadow-lg',
    outlined: 'border-2 border-gray-200 dark:border-gray-700',
    filled: 'bg-gray-100 dark:bg-gray-800',
  };

  return (
    <div
      className={cn(
        'rounded-xl',
        paddingClasses[padding],
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}`,
        },
      ],
      dependencies: [],
      preview: CardPreview,
    },
    {
      id: 'toast',
      name: 'Toast',
      description:
        'Notification toast with queue management and swipe-to-dismiss.',
      category: 'feedback',
      complexity: 'moderate',
      tags: ['toast', 'notification', 'alert', 'feedback', 'snackbar'],
      files: [
        {
          name: 'Toast.tsx',
          path: 'Toast/Toast.tsx',
          language: 'tsx',
          isEntry: true,
          content: `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  onDismiss?: () => void;
}

export function Toast({
  title,
  description,
  variant = 'default',
  onDismiss,
}: ToastProps) {
  const variantClasses = {
    default: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900',
    success: 'bg-emerald-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-amber-500 text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={cn(
        'px-4 py-3 rounded-xl shadow-lg',
        variantClasses[variant],
      )}
    >
      <p className="font-medium">{title}</p>
      {description && <p className="text-sm opacity-90">{description}</p>}
    </motion.div>
  );
}`,
        },
        {
          name: 'store.ts',
          path: 'Toast/store.ts',
          language: 'typescript',
          content: `import { create } from 'zustand';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => {
    const id = Math.random().toString(36).slice(2);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    return id;
  },
  dismiss: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id),
  })),
  dismissAll: () => set({ toasts: [] }),
}));`,
        },
      ],
      dependencies: [
        { name: 'zustand', version: '^5.0.0' },
        { name: 'framer-motion', version: '^11.0.0' },
      ],
      preview: ToastPreview,
      featured: true,
    },
    {
      id: 'badge',
      name: 'Badge',
      description: 'Small status indicator for labels, counts, and tags.',
      category: 'data-display',
      complexity: 'simple',
      tags: ['badge', 'tag', 'label', 'status', 'pill'],
      files: [
        {
          name: 'Badge.tsx',
          path: 'Badge/Badge.tsx',
          language: 'tsx',
          isEntry: true,
          content: `'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const variantClasses = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}`,
        },
      ],
      dependencies: [],
      preview: BadgePreview,
    },
    {
      id: 'modal',
      name: 'Modal',
      description:
        'Dialog component with backdrop, animations, and focus management.',
      category: 'overlay',
      complexity: 'complex',
      tags: ['modal', 'dialog', 'overlay', 'popup', 'lightbox'],
      files: [
        {
          name: 'Modal.tsx',
          path: 'Modal/Modal.tsx',
          language: 'tsx',
          isEntry: true,
          content: `'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              'fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-full p-6 rounded-2xl',
              'bg-white dark:bg-gray-900',
              'shadow-2xl',
              sizeClasses[size],
            )}
          >
            {title && (
              <h2 className="text-xl font-semibold mb-4">{title}</h2>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}`,
        },
      ],
      dependencies: [{ name: 'framer-motion', version: '^11.0.0' }],
      preview: ModalPreview,
      featured: true,
    },
    {
      id: 'tabs',
      name: 'Tabs',
      description: 'Tabbed navigation component with animated indicator.',
      category: 'navigation',
      complexity: 'moderate',
      tags: ['tabs', 'navigation', 'tabbed', 'segmented'],
      files: [
        {
          name: 'Tabs.tsx',
          path: 'Navigation/Tabs.tsx',
          language: 'tsx',
          isEntry: true,
          content: `'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div>
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                style={{ zIndex: -1 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{activeContent}</div>
    </div>
  );
}`,
        },
      ],
      dependencies: [{ name: 'framer-motion', version: '^11.0.0' }],
    },
    {
      id: 'skeleton',
      name: 'Skeleton',
      description: 'Loading placeholder with shimmer animation.',
      category: 'feedback',
      complexity: 'simple',
      tags: ['skeleton', 'loading', 'placeholder', 'shimmer'],
      files: [
        {
          name: 'Skeleton.tsx',
          path: 'Skeleton/Skeleton.tsx',
          language: 'tsx',
          isEntry: true,
          content: `'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

export function Skeleton({
  width,
  height,
  rounded = 'md',
  className,
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700',
        roundedClasses[rounded],
        className,
      )}
      style={{ width, height }}
    />
  );
}`,
        },
      ],
      dependencies: [],
    },
  ],
};

/**
 * Demo page content
 */
function CodeBlocksDemo() {
  const [blocksSize, setBlocksSize] = useState<BlocksSize>('default');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/playground"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Code Blocks
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Component registry with copy-paste installation
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Size selector */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Size:
            </span>
            <div className="flex gap-1">
              {(['compact', 'default', 'large'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setBlocksSize(s)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-lg capitalize transition-colors',
                    blocksSize === s
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <CodeBlocks
          registry={sampleRegistry}
          size={blocksSize}
          showSearch
          showCategoryFilter
          showComplexityFilter
          onCopy={(component, files) => {
            console.log('Copied:', component.name, files);
          }}
        />

        {/* Features Section */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Fuzzy Search',
                description:
                  'Find components quickly with intelligent fuzzy matching.',
              },
              {
                title: 'Category Filtering',
                description:
                  'Filter by category: buttons, inputs, feedback, navigation, and more.',
              },
              {
                title: 'Complexity Levels',
                description:
                  'Components marked as simple, moderate, or complex.',
              },
              {
                title: 'One-Click Copy',
                description: 'Copy component code with imports ready to paste.',
              },
              {
                title: 'Code Viewer',
                description:
                  'View all files in a component with syntax highlighting.',
              },
              {
                title: 'Component Preview',
                description: 'See how components look before copying.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/50"
              >
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function CodeBlocksPage() {
  return <CodeBlocksDemo />;
}
