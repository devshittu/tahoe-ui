// src/app/playground/typography/layout.tsx
'use client';

import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { typographyComponents } from '@/lib/typography-data';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/DocsPageLayout/components/ui/sidebar';

export default function TypographyDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<string | null>(
    null,
  );

  const typographyNavLinks = [
    { path: '/playground/typography', label: 'Typography Overview' },
    { path: '/playground', label: 'Back to Playground' },
    { path: '/docs', label: 'Main Docs' },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="lg:hidden p-4 bg-gray-900 dark:bg-gray-950 text-white flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold text-blue-400">Typography System</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-label="Open sidebar"
        >
          <FiMenu size={24} />
        </button>
      </header>

      <Sidebar
        onSelectComponent={setActiveComponentId}
        selectedComponentId={activeComponentId}
        components={typographyComponents}
        staticLinks={typographyNavLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 p-4 lg:p-8 overflow-hidden">
        <div className="h-full rounded-lg">
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      </main>
    </div>
  );
}
