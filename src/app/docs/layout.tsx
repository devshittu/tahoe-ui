// src/app/docs/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { mockComponents, staticNavLinks } from '@/lib/data';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/DocsPageLayout/components/ui/sidebar';
// ComponentViewer will be used by a specific 'page' component, not the layout directly
// import ComponentViewer from '@/components/ui/component-viewer'; // REMOVED from here

export default function DocsLayout({
  children, // This will be the actual page content (e.g., from docs/page.tsx or docs/[id]/page.tsx)
}: {
  children: React.ReactNode;
}) {
  // State for sidebar visibility (mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // In a layout, you generally don't manage the 'selectedComponentId' based on internal state,
  // but rather derive it from the route or let the child page manage it.
  // For the sidebar to highlight, we need to know the *currently active* component.
  // We'll use the URL path to infer this in a more robust way later,
  // but for now, we can pass a dummy selected ID or refine this.

  // For the purpose of highlighting the sidebar, let's keep a state,
  // but understand its interaction with dynamic routes.
  // If you only have /docs/page.tsx and /docs/[id]/page.tsx,
  // the sidebar should infer the selected ID from the URL param.
  // For now, let's keep the state for the `onSelectComponent` callback from the sidebar.
  // The actual rendering of ComponentViewer will be in `src/app/docs/[id]/page.tsx`

  // This state is just for the sidebar's visual selection, not for what's rendered in main.
  const [activeComponentIdInSidebar, setActiveComponentIdInSidebar] = useState<
    string | null
  >(null);

  // Optional: Update activeComponentIdInSidebar based on URL path if you have dynamic routes
  // useEffect(() => {
  //   // You'd use useRouter here to get the current path and parse component ID
  //   // For example: if (router.pathname.startsWith('/docs/')) { ... }
  // }, []);

  return (
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
        // This callback should ideally navigate, or update a route parameter
        // For now, it will update internal state, but route change is preferred.
        onSelectComponent={setActiveComponentIdInSidebar} // Update this to navigate later
        selectedComponentId={activeComponentIdInSidebar} // Pass the state to sidebar
        components={mockComponents}
        staticLinks={staticNavLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-hidden">
        <div className="h-full rounded-lg">
          <AnimatePresence mode="wait">
            {children}{' '}
            {/* This is where the specific docs page content will be rendered */}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
