// src/components/DocsPageLayout/components/ui/sidebar.tsx
'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiX, FiLayers, FiExternalLink } from 'react-icons/fi';
import { ComponentData, StaticNavLink } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  onSelectComponent: (componentId: string) => void;
  selectedComponentId: string | null;
  components: ComponentData[];
  staticLinks: StaticNavLink[];
  isOpen: boolean;
  onClose: () => void;
  basePath?: string;
}

/**
 * The navigation sidebar for the UI component design system.
 * Supports dynamic base paths for different documentation sections.
 */
const Sidebar: React.FC<SidebarProps> = ({
  onSelectComponent,
  selectedComponentId,
  components,
  staticLinks,
  isOpen,
  onClose,
  basePath,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Derive base path from current pathname if not provided
  const effectiveBasePath =
    basePath || pathname?.split('/').slice(0, -1).join('/') || '/docs';

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const handleKeyboardClick = (
    event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
    action: () => void,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const getComponentPath = (compId: string) => {
    // Check if we're in typography playground
    if (pathname?.includes('/playground/typography')) {
      return `/playground/typography/${compId}`;
    }
    return `/docs/${compId}`;
  };

  const isActiveComponent = (compId: string) => {
    return pathname?.endsWith(`/${compId}`);
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isDesktop || isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed inset-y-0 left-0 w-72 z-50',
          'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
          'lg:relative lg:translate-x-0 lg:flex-shrink-0',
          'flex flex-col',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <FiLayers className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Tahoe UI
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Component Library
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow overflow-y-auto p-4 custom-scrollbar">
          {/* Components Section */}
          <div className="mb-6">
            <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Components
            </h3>
            <ul className="space-y-1">
              {components.map((comp) => {
                const isActive = isActiveComponent(comp.id);
                return (
                  <li key={comp.id}>
                    <button
                      onClick={() => {
                        router.push(getComponentPath(comp.id));
                        if (!isDesktop) onClose();
                      }}
                      onKeyDown={(e) =>
                        handleKeyboardClick(e, () => {
                          router.push(getComponentPath(comp.id));
                          if (!isDesktop) onClose();
                        })
                      }
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg text-sm',
                        'transition-all duration-150',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500/40',
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                      )}
                    >
                      {comp.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Static Links Section */}
          {staticLinks.length > 0 && (
            <div>
              <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Navigation
              </h3>
              <ul className="space-y-1">
                {staticLinks.map((link) => {
                  const isActive = pathname === link.path;
                  const isExternal = link.path.startsWith('http');
                  return (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        onClick={() => {
                          if (!isDesktop) onClose();
                        }}
                        className={cn(
                          'flex items-center justify-between px-3 py-2 rounded-lg text-sm',
                          'transition-all duration-150',
                          'focus:outline-none focus:ring-2 focus:ring-blue-500/40',
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                        )}
                      >
                        <span>{link.label}</span>
                        {isExternal && (
                          <FiExternalLink size={14} className="opacity-50" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Tahoe UI
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            by Muhammed Shittu
          </p>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
