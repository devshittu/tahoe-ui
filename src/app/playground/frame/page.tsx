// src/app/playground/frame/page.tsx
'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { mockComponents, staticNavLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/DocsPageLayout/components/ui/sidebar';
import ComponentViewer from '@/components/DocsPageLayout/components/ui/component-viewer';
/**
 * The main page component for the UI component design system.
 * It orchestrates the layout, manages component selection, and displays the viewer.
 */
const HomePage: React.FC = () => {
  // State to manage the currently selected component's ID
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    mockComponents[0].id,
  ); // Default to the first component

  // State to control the visibility of the sidebar on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Find the selected component from the mock data
  const selectedComponent =
    mockComponents.find((comp) => comp.id === selectedComponentId) ?? null;

  return (
    // Apply theme-aware background and text colors to the root div of the page
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Mobile Header for sidebar toggle */}
      <header className="lg:hidden p-4 bg-gray-900 dark:bg-gray-950 text-white flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold text-blue-400">Tahoe UI</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-label="Open sidebar"
        >
          <FiMenu size={24} />
        </button>
      </header>

      {/* Sidebar Component */}
      <Sidebar
        onSelectComponent={setSelectedComponentId}
        selectedComponentId={selectedComponentId}
        components={mockComponents}
        staticLinks={staticNavLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-hidden">
        <div className="h-full rounded-lg">
          {/* AnimatePresence for smooth transitions when switching components */}
          <AnimatePresence mode="wait">
            <ComponentViewer component={selectedComponent} />
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

// src/app/playground/frame/page.tsx
