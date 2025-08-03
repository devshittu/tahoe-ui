// src/components/DocsPageLayout/components/ui/sidebar.tsx
'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { ComponentData, StaticNavLink } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation'; // Corrected import for usePathname

interface SidebarProps {
  onSelectComponent: (componentId: string) => void;
  selectedComponentId: string | null; // This prop might become redundant if selection is purely route-driven
  components: ComponentData[];
  staticLinks: StaticNavLink[];
  isOpen: boolean; // Controls mobile sidebar visibility
  onClose: () => void; // Callback to close mobile sidebar
}

/**
 * The navigation sidebar for the UI component design system.
 * It is always visible on large screens and slides in/out on mobile.
 * @param onSelectComponent Callback when a component is selected.
 * @param selectedComponentId The ID of the currently selected component.
 * @param components Array of all available components.
 * @param staticLinks Array of static navigation links.
 * @param isOpen Controls the visibility of the sidebar (for mobile).
 * @param onClose Callback to close the sidebar (for mobile).
 */
const Sidebar: React.FC<SidebarProps> = ({
  onSelectComponent, // This prop might be less used if navigation drives selection
  selectedComponentId, // This prop might be less used if navigation drives selection
  components,
  staticLinks,
  isOpen,
  onClose,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter(); // For navigation
  const pathname = usePathname(); // For current path, fixes the error

  // Effect to detect screen size and update isDesktop state
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Handler for keyboard events on interactive elements
  const handleKeyboardClick = (
    event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
    action: () => void,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default scroll behavior for space key
      action();
    }
  };

  return (
    <>
      {/* Overlay for mobile sidebar when open */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isDesktop || isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-950 p-6 z-50',
          'lg:relative lg:translate-x-0 lg:flex-shrink-0 lg:w-64 lg:rounded-lg lg:shadow-xl',
          'flex flex-col transform transition-transform duration-300 ease-in-out',
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-blue-400">Tahoe UI</h2>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-label="Close sidebar"
          >
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex-grow overflow-y-auto custom-scrollbar">
          {/* Component Links (using <button> as they trigger an action, not direct navigation) */}
          <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3">
            Components
          </h3>
          <ul className="space-y-2 mb-6">
            {components.map((comp) => (
              <li key={comp.id}>
                <button
                  onClick={() => {
                    // Navigate to the component's doc page
                    router.push(`/docs/${comp.id}`);
                    if (!isDesktop) {
                      onClose();
                    }
                  }}
                  onKeyDown={(e) =>
                    handleKeyboardClick(e, () => {
                      router.push(`/docs/${comp.id}`);
                      if (!isDesktop) {
                        onClose();
                      }
                    })
                  }
                  className={cn(
                    'w-full text-left py-2 px-4 rounded-lg transition-colors duration-200',
                    'hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md',
                    // Highlight based on current pathname
                    pathname === `/docs/${comp.id}`
                      ? 'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300',
                  )}
                >
                  {comp.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Static Navigation Links (using Next/Link directly) */}
          <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3">
            Playgrounds & Demos
          </h3>
          <ul className="space-y-2">
            {staticLinks.map((link) => (
              <li key={link.path}>
                {/* Apply styling and event handlers directly to Link */}
                <Link
                  href={link.path}
                  onClick={() => {
                    if (!isDesktop) {
                      onClose();
                    }
                  }}
                  onKeyDown={(e) =>
                    handleKeyboardClick(e, () => {
                      if (!isDesktop) {
                        onClose();
                      }
                    })
                  }
                  className={cn(
                    'block w-full text-left py-2 px-4 rounded-lg transition-colors duration-200',
                    'hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md',
                    // Highlight based on current pathname
                    pathname === link.path
                      ? 'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Footer section for copyright and attribution */}
        <div className="mt-8 pt-6 border-t border-gray-700 dark:border-gray-800 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tahoe UI</p>
          <p>
            Designed with <span className="text-red-500">&hearts;</span> by
            Muhammed Shittu
          </p>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
