// src/app/playground/code-canvas/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FiZap, FiCode, FiClock, FiShare2 } from 'react-icons/fi';
import {
  CodeCanvas,
  CanvasLayout,
  CanvasSize,
  ExportFormat,
} from './components';

/**
 * Demo page for Code Canvas
 */
export default function CodeCanvasPage() {
  const [layout, setLayout] = useState<CanvasLayout>('side-by-side');
  const [size, setSize] = useState<CanvasSize>('default');
  const [showHistory, setShowHistory] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleGenerate = (code: string, prompt: string) => {
    console.log('Generated:', { prompt, codeLength: code.length });
  };

  const handleExport = (code: string, format: ExportFormat) => {
    console.log('Exported:', { format, codeLength: code.length });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6"
          >
            <FiZap className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Code Canvas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            AI-powered text-to-UI generation. Describe what you want to build
            and watch it come to life with streaming code generation and live
            preview.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Demo Mode - Uses mock generations
          </motion.div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Layout selector */}
            <div>
              <label
                htmlFor="canvas-layout"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Layout
              </label>
              <select
                id="canvas-layout"
                value={layout}
                onChange={(e) => setLayout(e.target.value as CanvasLayout)}
                className={cn(
                  'w-full px-3 py-2 rounded-lg border',
                  'bg-white dark:bg-gray-800',
                  'border-gray-200 dark:border-gray-700',
                  'text-gray-900 dark:text-gray-100',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
                )}
              >
                <option value="side-by-side">Side by Side</option>
                <option value="stacked">Stacked</option>
                <option value="preview-only">Preview Only</option>
              </select>
            </div>

            {/* Size selector */}
            <div>
              <label
                htmlFor="canvas-size"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Size
              </label>
              <select
                id="canvas-size"
                value={size}
                onChange={(e) => setSize(e.target.value as CanvasSize)}
                className={cn(
                  'w-full px-3 py-2 rounded-lg border',
                  'bg-white dark:bg-gray-800',
                  'border-gray-200 dark:border-gray-700',
                  'text-gray-900 dark:text-gray-100',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
                )}
              >
                <option value="compact">Compact</option>
                <option value="default">Default</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Toggles */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Panels
              </legend>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showHistory}
                    onChange={(e) => setShowHistory(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    History
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSuggestions}
                    onChange={(e) => setShowSuggestions(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Suggestions
                  </span>
                </label>
              </div>
            </fieldset>

            {/* Prompt hints */}
            <div>
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Try these prompts
              </p>
              <div className="flex flex-wrap gap-1">
                {['card', 'pricing', 'login', 'navbar'].map((hint) => (
                  <span
                    key={hint}
                    className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {hint}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <CodeCanvas
            layout={layout}
            size={size}
            showHistory={showHistory}
            showSuggestions={showSuggestions}
            mockMode={true}
            height="70vh"
            onGenerate={handleGenerate}
            onExport={handleExport}
          />
        </motion.div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: FiZap,
              title: 'AI Generation',
              description:
                'Describe what you want and watch the code stream in real-time.',
            },
            {
              icon: FiCode,
              title: 'Live Preview',
              description:
                'See your component rendered instantly with Sandpack.',
            },
            {
              icon: FiClock,
              title: 'Version History',
              description:
                'Browse and restore previous generations with full history.',
            },
            {
              icon: FiShare2,
              title: 'Export Anywhere',
              description:
                'Export to CodeSandbox, StackBlitz, or download as file.',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={cn(
                'p-6 rounded-xl',
                'bg-white dark:bg-gray-900',
                'border border-gray-200 dark:border-gray-800',
                'shadow-sm',
              )}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                <feature.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Describe',
                description:
                  'Enter a natural language description of the UI component you want to create.',
              },
              {
                step: '2',
                title: 'Generate',
                description:
                  'Watch as the AI generates React code in real-time with streaming output.',
              },
              {
                step: '3',
                title: 'Iterate',
                description:
                  'Refine your component by requesting changes to colors, layout, or functionality.',
              },
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <svg
                      className="w-6 h-6 text-gray-300 dark:text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
