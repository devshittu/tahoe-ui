// src/app/playground/layout.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PlaygroundSidebar } from './components/PlaygroundSidebar';
import { FiMenu, FiX } from 'react-icons/fi';

interface PlaygroundLayoutProps {
  children: React.ReactNode;
}

/**
 * Playground Layout
 *
 * Provides consistent navigation structure with:
 * - Desktop: Fixed sidebar (280px)
 * - Mobile: Slide-out drawer with overlay
 *
 * Design Principles:
 * - #13 Predictable Navigation: Persistent sidebar
 * - #17 Mobile-Native: Responsive with touch-friendly drawer
 * - #3 Intentional White Space: Proper content padding
 */
export default function PlaygroundLayout({ children }: PlaygroundLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[280px] z-30">
        <PlaygroundSidebar className="h-full" />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <FiMenu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          Playground
        </span>
        <div className="w-9" /> {/* Spacer for centering */}
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw]"
            >
              <div className="relative h-full">
                <PlaygroundSidebar className="h-full" />

                {/* Close button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn('lg:ml-[280px]', 'min-h-screen', 'pb-8')}>
        {children}
      </main>
    </div>
  );
}
