// src/app/playground/code-studio/page.tsx
'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  CodeStudio,
  PropsConfig,
  StudioLayout,
  StudioSize,
} from './components';

/**
 * Example Button component for demonstration
 */
interface DemoButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  icon?: 'none' | 'arrow' | 'plus' | 'check';
}

function DemoButton({
  children = 'Button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  rounded = false,
  icon = 'none',
}: DemoButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    outline:
      'border-2 border-gray-300 text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500',
    ghost:
      'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
  };

  const icons = {
    none: null,
    arrow: (
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
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    ),
    plus: (
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
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
    check: (
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
    ),
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150',
        sizeClasses[size],
        variantClasses[variant],
        rounded ? 'rounded-full' : 'rounded-lg',
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
      )}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin\" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
      {icon !== 'none' && icons[icon]}
    </button>
  );
}

/**
 * Example Card component for demonstration
 */
interface DemoCardProps {
  title?: string;
  description?: string;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'sm' | 'md' | 'lg';
  showImage?: boolean;
  showFooter?: boolean;
}

function DemoCard({
  title = 'Card Title',
  description = 'This is a description of the card content.',
  variant = 'elevated',
  padding = 'md',
  showImage = false,
  showFooter = false,
}: DemoCardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantClasses = {
    elevated: 'bg-white dark:bg-gray-800 shadow-lg',
    outlined: 'border-2 border-gray-200 dark:border-gray-700 bg-transparent',
    filled: 'bg-gray-100 dark:bg-gray-800',
  };

  return (
    <div className={cn('rounded-xl overflow-hidden', variantClasses[variant])}>
      {showImage && (
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600" />
      )}
      <div className={paddingClasses[padding]}>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {description}
        </p>
      </div>
      {showFooter && (
        <div
          className={cn(
            'border-t border-gray-200 dark:border-gray-700',
            paddingClasses[padding],
          )}
        >
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Action
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Controls configuration for Button demo
 */
const buttonControls: PropsConfig = {
  children: {
    type: 'text',
    label: 'Label',
    defaultValue: 'Click Me',
    description: 'Button text content',
  },
  variant: {
    type: 'radio',
    label: 'Variant',
    options: ['primary', 'secondary', 'outline', 'ghost'],
    defaultValue: 'primary',
    group: 'Appearance',
  },
  size: {
    type: 'radio',
    label: 'Size',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
    group: 'Appearance',
  },
  icon: {
    type: 'select',
    label: 'Icon',
    options: ['none', 'arrow', 'plus', 'check'],
    defaultValue: 'none',
    group: 'Appearance',
  },
  rounded: {
    type: 'boolean',
    label: 'Rounded',
    defaultValue: false,
    group: 'Style',
  },
  fullWidth: {
    type: 'boolean',
    label: 'Full Width',
    defaultValue: false,
    group: 'Style',
  },
  disabled: {
    type: 'boolean',
    label: 'Disabled',
    defaultValue: false,
    group: 'State',
  },
  loading: {
    type: 'boolean',
    label: 'Loading',
    defaultValue: false,
    group: 'State',
  },
};

/**
 * Controls configuration for Card demo
 */
const cardControls: PropsConfig = {
  title: {
    type: 'text',
    label: 'Title',
    defaultValue: 'Card Title',
    description: 'Main heading of the card',
  },
  description: {
    type: 'text',
    label: 'Description',
    defaultValue: 'This is a description of the card content.',
    multiline: true,
    description: 'Body text content',
  },
  variant: {
    type: 'radio',
    label: 'Variant',
    options: ['elevated', 'outlined', 'filled'],
    defaultValue: 'elevated',
    group: 'Appearance',
  },
  padding: {
    type: 'radio',
    label: 'Padding',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
    group: 'Appearance',
  },
  showImage: {
    type: 'boolean',
    label: 'Show Image',
    defaultValue: false,
    group: 'Features',
  },
  showFooter: {
    type: 'boolean',
    label: 'Show Footer',
    defaultValue: false,
    group: 'Features',
  },
};

/**
 * Demo page content
 */
function CodeStudioDemo() {
  const [activeDemo, setActiveDemo] = useState<'button' | 'card'>('button');
  const [layout, setLayout] = useState<StudioLayout>('horizontal');
  const [studioSize, setStudioSize] = useState<StudioSize>('default');

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
                  Code Studio
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Interactive component playground with live code generation
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Demo selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Component:
              </span>
              <div className="flex gap-1">
                {(['button', 'card'] as const).map((demo) => (
                  <button
                    key={demo}
                    onClick={() => setActiveDemo(demo)}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-lg capitalize transition-colors',
                      activeDemo === demo
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                    )}
                  >
                    {demo}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Layout:
              </span>
              <div className="flex gap-1">
                {(['horizontal', 'vertical', 'stacked'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLayout(l)}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-lg capitalize transition-colors',
                      layout === l
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Size:
              </span>
              <div className="flex gap-1">
                {(['compact', 'default', 'large'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStudioSize(s)}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-lg capitalize transition-colors',
                      studioSize === s
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
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeDemo === 'button' ? (
            <CodeStudio
              component={
                DemoButton as React.ComponentType<Record<string, unknown>>
              }
              componentName="Button"
              controls={buttonControls}
              layout={layout}
              size={studioSize}
              showCode={true}
              showViewportControls={true}
              showStateSimulator={false}
              enableUrlState={true}
            />
          ) : (
            <CodeStudio
              component={
                DemoCard as React.ComponentType<Record<string, unknown>>
              }
              componentName="Card"
              controls={cardControls}
              layout={layout}
              size={studioSize}
              showCode={true}
              showViewportControls={true}
              showStateSimulator={false}
              enableUrlState={true}
            />
          )}
        </motion.div>

        {/* Features Section */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Auto-Generated Controls',
                description:
                  'Define your props schema and get an interactive control panel automatically.',
              },
              {
                title: 'Live Code Generation',
                description:
                  'See JSX code update in real-time as you modify props.',
              },
              {
                title: 'Shareable Links',
                description:
                  'Enable URL state encoding to share specific configurations.',
              },
              {
                title: 'Viewport Testing',
                description: 'Test your component at different viewport sizes.',
              },
              {
                title: 'Multiple Layouts',
                description:
                  'Choose horizontal, vertical, or stacked layouts to fit your needs.',
              },
              {
                title: 'Grouped Controls',
                description: 'Organize related props into collapsible groups.',
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

export default function CodeStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Loading Code Studio...
            </span>
          </div>
        </div>
      }
    >
      <CodeStudioDemo />
    </Suspense>
  );
}
