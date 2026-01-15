// src/app/playground/typography/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { typographyComponents } from '@/lib/typography-data';

const categories = {
  'Core Components': ['text', 'heading', 'paragraph'],
  'Semantic Elements': ['strong', 'emphasis', 'highlight'],
  Links: ['link'],
  'Form Elements': ['label'],
  'UI Elements': ['tooltip-text', 'badge'],
  Specialized: ['color-text'],
};

export default function TypographyOverviewPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Typography System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          A comprehensive typography system built with semantic HTML, full
          accessibility support, and Tailwind CSS JIT-safe class mappings. All
          components use <code className="text-blue-500">forwardRef</code> for
          DOM access and centralized type definitions.
        </p>
      </div>

      <div className="mb-10 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Key Features
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              Semantic HTML elements (
              <code>
                &lt;strong&gt;, &lt;em&gt;, &lt;mark&gt;, &lt;label&gt;
              </code>
              )
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              Full accessibility with ARIA attributes and keyboard support
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              Static Tailwind class mappings (JIT-safe)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              Centralized types in <code>typography.types.ts</code>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              forwardRef support on all components
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              Dark mode support via design tokens
            </span>
          </li>
        </ul>
      </div>

      {Object.entries(categories).map(([category, componentIds]) => (
        <section key={category} className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {componentIds.map((id) => {
              const component = typographyComponents.find((c) => c.id === id);
              if (!component) return null;
              return (
                <Link
                  key={id}
                  href={`/playground/typography/${id}`}
                  className="group block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    {component.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {component.description}
                  </p>
                  <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium">
                    View documentation →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mb-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Installation & Usage
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Import individual components:
            </h3>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
              <code>{`import { Text, Heading, Paragraph, Strong } from '@/components/Typography';`}</code>
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Import types:
            </h3>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
              <code>{`import type { TextProps, HeadingProps, TextColor } from '@/components/Typography';`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          File Structure
        </h2>
        <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
          <code>{`src/components/Typography/
├── typography.types.ts    # Centralized type definitions
├── typography.classes.ts  # Static Tailwind class mappings
├── index.ts               # Barrel exports
│
├── Text.tsx              # Base inline text
├── Heading.tsx           # h1-h6 headings
├── Paragraph.tsx         # Block text
├── Span.tsx              # Inline wrapper
│
├── Strong.tsx            # <strong> semantic
├── Emphasis.tsx          # <em> semantic
├── Highlight.tsx         # <mark> semantic
│
├── Link.tsx              # Next.js Link wrapper
├── Label.tsx             # <label> for forms
├── TooltipText.tsx       # Accessible tooltip
├── Badge.tsx             # Status badges
├── ColorText.tsx         # Colored text
└── ...                   # Additional components`}</code>
        </pre>
      </section>
    </motion.div>
  );
}
