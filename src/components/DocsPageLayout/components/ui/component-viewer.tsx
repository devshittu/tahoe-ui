// src/components/DocsPageLayout/components/ui/component-viewer.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiLayers } from 'react-icons/fi';
import { ComponentData } from '@/lib/data';
import CodePreviewSection from './code-preview-section';
import { cn } from '@/lib/utils';

interface ComponentViewerProps {
  component: ComponentData | null;
}

/**
 * Displays the details, API reference, and live preview for a selected UI component.
 * It now orchestrates the display of the CodePreviewSection.
 * @param component The ComponentData object for the component to display.
 */
const ComponentViewer: React.FC<ComponentViewerProps> = ({ component }) => {
  if (!component) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <FiLayers className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Tahoe UI
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
          Select a component from the sidebar to view its live preview, API
          reference, and code snippets.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto h-full custom-scrollbar"
    >
      {/* Header Card */}
      <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {component.name}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {component.description}
        </p>
      </div>

      {/* Live Preview Section */}
      <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <FiLayers className="w-4 h-4 text-blue-500" />
          </span>
          Live Preview
        </h2>
        <CodePreviewSection component={component} />
      </div>

      {/* API Reference Section */}
      <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <FiBook className="w-4 h-4 text-blue-500" />
          </span>
          API Reference
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <th
                  scope="col"
                  className="py-3.5 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  Prop
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  Default
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {component.api.map((prop, index) => (
                <tr
                  key={prop.name}
                  className={cn(
                    'transition-colors duration-150',
                    index % 2 === 0
                      ? 'bg-white dark:bg-gray-800'
                      : 'bg-gray-50/50 dark:bg-gray-900/30',
                    'hover:bg-blue-50/50 dark:hover:bg-blue-900/10',
                  )}
                >
                  <td className="py-3.5 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400">
                      {prop.name}
                    </code>
                  </td>
                  <td className="py-3.5 px-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                    {prop.type}
                  </td>
                  <td className="py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {prop.description}
                  </td>
                  <td className="py-3.5 px-4 text-sm">
                    {prop.default ? (
                      <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">
                        {prop.default}
                      </code>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Props count badge */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
            {component.api.length} props
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentViewer;
