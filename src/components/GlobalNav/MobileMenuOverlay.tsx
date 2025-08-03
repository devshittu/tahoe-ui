'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { staticNavLinks, NavLink } from '@/lib/staticNavLinks';
import { iconMap } from '@/lib/iconMap';
import { Transition, TransitionChild } from '@headlessui/react'; // Ensure TransitionChild is imported

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenuOverlay Component
 *
 * Implements a full-screen, multi-page mobile navigation menu inspired by Apple Music.
 * - Displays top-level links.
 * - Tapping a link with sub-content slides to a new view with sub-links.
 * - Provides a back button to return to the previous view.
 * - Uses Headless UI's Transition component for smooth page transitions and staggered item animations.
 * - Dynamically updates the header based on the current menu level.
 * - Covers the entire screen, hiding underlying content.
 */
export default function MobileMenuOverlay({
  isOpen,
  onClose,
}: MobileMenuOverlayProps) {
  // State to track the currently active sub-menu ID for multi-page navigation
  const [activeSubMenuId, setActiveSubMenuId] = useState<string | null>(null);

  // Get the current sub-menu data based on activeSubMenuId
  const currentSubMenu = activeSubMenuId
    ? staticNavLinks.find((link) => link.id === activeSubMenuId)
    : null;

  // Icons for back button and close button
  const FiChevronLeft = iconMap['FiChevronLeft'];
  const FiX = iconMap['FiX'];
  const FiChevronRight = iconMap['FiChevronRight'];

  // Reset activeSubMenuId when the overlay is closed
  useEffect(() => {
    if (!isOpen) {
      // Reset state after the close animation completes
      const timer = setTimeout(() => {
        setActiveSubMenuId(null);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleBack = () => {
    setActiveSubMenuId(null); // Go back to the main menu
  };

  const handleLinkClick = (
    link: NavLink,
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (link.flyoutContent) {
      e.preventDefault(); // Prevent default navigation for sub-menus
      setActiveSubMenuId(link.id); // Open sub-menu
    } else {
      // If it's a direct navigation link, close the menu and let Next.js Link handle navigation
      onClose();
    }
  };

  // Determine header title
  const headerTitle = activeSubMenuId ? currentSubMenu?.label : '';

  return (
    <Transition as={Fragment} show={isOpen}>
      <div
        className={cn(
          'fixed inset-0 z-[100] bg-white dark:bg-black lg:hidden',
          'overflow-hidden',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="relative h-full w-full flex flex-col">
          {/* Header for Mobile Menu (Dynamic content based on view) */}
          <div className="flex items-center justify-between h-11 md:h-12 px-4 border-b border-gray-200 dark:border-gray-800">
            {/* Back button for sub-menus */}
            <Transition
              as={Fragment}
              show={!!activeSubMenuId}
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <button
                onClick={handleBack}
                className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-base py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={`Back to ${headerTitle} menu`}
              >
                {FiChevronLeft && <FiChevronLeft size={20} className="mr-1" />}
                {headerTitle}
              </button>
            </Transition>
            {/* Spacer for the main menu view */}
            <span className={cn({ 'flex-grow': !activeSubMenuId })}></span>
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Close menu"
            >
              {FiX && <FiX size={24} />}
            </button>
          </div>

          {/* Main Content Area for Sliding Views */}
          <div className="relative flex-grow overflow-hidden">
            {/* Main Menu View */}
            <Transition
              as={Fragment}
              show={!activeSubMenuId}
              enter="transition-transform duration-300 ease-in-out"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform duration-300 ease-in-out"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full" // Main menu slides left on exit
            >
              <ul className="absolute inset-0 w-full h-full overflow-y-auto bg-white dark:bg-black flex flex-col py-4 px-6 list-none m-0 p-0">
                {staticNavLinks.slice(1, -2).map((link, index) => (
                  <TransitionChild
                    as="li"
                    key={link.id}
                    className="py-3 border-b border-gray-200 dark:border-gray-800 last:border-b-0"
                    enter="transition-opacity duration-200 ease-in-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-200 ease-in-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    style={{ transitionDelay: `${index * 0.03}s` }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                      onClick={(e) => handleLinkClick(link, e)}
                    >
                      {link.label}
                      {link.flyoutContent && FiChevronRight && (
                        <span className="text-gray-500 dark:text-gray-400">
                          <FiChevronRight size={20} />
                        </span>
                      )}
                    </Link>
                  </TransitionChild>
                ))}
              </ul>
            </Transition>

            {/* Sub-Menu View */}
            {currentSubMenu && currentSubMenu.flyoutContent && (
              <Transition
                as={Fragment}
                show={!!activeSubMenuId}
                enter="transition-transform duration-300 ease-in-out"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform duration-300 ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full" // Sub-menu slides right on exit
              >
                <div className="absolute inset-0 w-full h-full overflow-y-auto bg-white dark:bg-black flex flex-col py-4 px-6">
                  {currentSubMenu.flyoutContent.map((column, colIndex) => (
                    <div key={colIndex} className="mb-6 last:mb-0">
                      <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
                        {column.header}
                      </h3>
                      <ul className="list-none p-0 m-0">
                        {column.items.map((item, itemIndex) => (
                          <TransitionChild
                            as="li"
                            key={itemIndex}
                            className="mb-1 last:mb-0"
                            enter="transition-opacity duration-200 ease-in-out"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-200 ease-in-out"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            style={{ transitionDelay: `${itemIndex * 0.03}s` }}
                          >
                            <Link
                              href={item.href}
                              className={cn(
                                'block py-1 px-2 -mx-2 rounded-md',
                                'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
                                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                                {
                                  'text-lg font-bold text-gray-900 dark:text-white':
                                    column.elevated,
                                  'text-sm': !column.elevated,
                                },
                              )}
                              onClick={onClose} // Close entire menu on sub-link click
                            >
                              {item.label}
                            </Link>
                          </TransitionChild>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Transition>
            )}
          </div>
        </div>
      </div>
    </Transition>
  );
}

// src/components/GlobalNav/MobileMenuOverlay.tsx
