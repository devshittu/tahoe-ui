// src/components/DocsPageLayout/components/ui/component-viewer.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';
import { ComponentData } from '@/lib/data';
import CodePreviewSection from './code-preview-section'; // Import the new section component
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
    // Placeholder message when no component is selected
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-4 text-center">
        <p className="text-2xl sm:text-3xl font-semibold mb-4">
          Welcome to Tahoe UI Design System
        </p>
        <p className="text-lg max-w-xl">
          Select a component from the sidebar to view its live preview, API
          reference, and code snippet. Explore our collection of modern UI
          components designed for a seamless user experience.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={component.id} // Key for Framer Motion animation, ensures re-animation on component change
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 lg:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto h-full custom-scrollbar"
    >
      {/* Component Title and Description */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
        {component.name}
      </h1>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        {component.description}
      </p>

      {/* Live Preview and Code Snippet Section */}
      <CodePreviewSection component={component} />

      {/* API Reference Section */}
      <section className="mt-10 mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          API Reference
          <FiCode className="ml-2 text-purple-500" />
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider rounded-tl-lg"
                >
                  Prop
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider rounded-tr-lg"
                >
                  Default
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {component.api.map((prop, index) => (
                <tr
                  key={prop.name}
                  className={cn(
                    index % 2 === 0
                      ? 'bg-white dark:bg-gray-800'
                      : 'bg-gray-50 dark:bg-gray-750',
                    'hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150',
                  )}
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {prop.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-blue-600 dark:text-blue-300 font-mono">
                    {prop.type}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {prop.description}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                    {prop.default || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
};

export default ComponentViewer;

// components/ui/component-viewer.tsx
