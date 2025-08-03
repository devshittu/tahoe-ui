// File: components/GlobalNav/GlobalNav.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { staticNavLinks, NavLink } from '@/lib/staticNavLinks';
import GlobalNavLink from './GlobalNavLink';
import GlobalNavFlyout from './GlobalNavFlyout';
import GlobalNavSearch from './GlobalNavSearch';
import GlobalNavOverlay from './GlobalNavOverlay';
import MobileMenuOverlay from './MobileMenuOverlay'; // Import the new component
import { iconMap } from '@/lib/iconMap';
import React from 'react';

/**
 * GlobalNav Component
 * Implements an Apple-like global navigation bar with a mega menu.
 * It handles hover/focus states for menu items, manages the open/closed
 * state of the flyouts, and controls a full-page overlay.
 * It is fully responsive, adapting for mobile views.
 */
export default function GlobalNav() {
  const [activeFlyoutId, setActiveFlyoutId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flyoutContentRef = useRef<HTMLDivElement>(null); // Ref for the actual flyout content height

  const FiMenu = iconMap['FiMenu'];
  const FiX = iconMap['FiX'];

  // Determine the current active navigation item for flyout content
  const activeNavItem = staticNavLinks.find(
    (link) => link.id === activeFlyoutId,
  );

  // Close flyout and search when clicking outside the entire nav area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If mobile menu is open, its own overlay handles clicks.
      // GlobalNav's click-outside should not interfere.
      if (isMobileMenuOpen) {
        return;
      }

      // For desktop, close flyouts/search if click is outside the nav itself
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveFlyoutId(null);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]); // Depend on isMobileMenuOpen to re-evaluate listener logic

  // --- Hover/Focus Logic for Desktop Mega Menu ---
  const handleNavAreaMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      if (flyoutTimeoutRef.current) {
        clearTimeout(flyoutTimeoutRef.current);
      }
    }
  };

  const handleNavAreaMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      flyoutTimeoutRef.current = setTimeout(() => {
        setActiveFlyoutId(null);
      }, 200);
    }
  };

  const handleNavLinkMouseEnter = (linkId: string) => {
    if (window.innerWidth >= 1024) {
      if (flyoutTimeoutRef.current) {
        clearTimeout(flyoutTimeoutRef.current);
      }
      setActiveFlyoutId(linkId);
      setIsSearchOpen(false);
    }
  };

  const handleNavLinkFocus = (linkId: string) => {
    if (window.innerWidth >= 1024) {
      setActiveFlyoutId(linkId);
      setIsSearchOpen(false);
    }
  };

  const handleNavLinkBlur = () => {
    if (window.innerWidth >= 1024) {
      setTimeout(() => {
        if (!navRef.current?.contains(document.activeElement)) {
          setActiveFlyoutId(null);
        }
      }, 50);
    }
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setActiveFlyoutId(null); // Close any open flyout when toggling mobile menu
    setIsSearchOpen(false); // Close search when toggling mobile menu
  };

  // Handle search toggle
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setActiveFlyoutId(null); // Close any open flyout when toggling search
    setIsMobileMenuOpen(false); // Close mobile menu if opening search
  };

  // Calculate flyout height dynamically for smooth transitions
  useEffect(() => {
    if (
      activeNavItem &&
      activeNavItem.flyoutContent &&
      flyoutContentRef.current
    ) {
      requestAnimationFrame(() => {
        const height = flyoutContentRef.current!.scrollHeight;
        navRef.current?.style.setProperty('--flyout-height', `${height}px`);
      });
    } else {
      navRef.current?.style.setProperty('--flyout-height', '0px');
    }
  }, [activeNavItem]);

  return (
    <>
      {/* Global overlay for when desktop menu or search is open */}
      {(activeFlyoutId !== null || isSearchOpen) && !isMobileMenuOpen && (
        <GlobalNavOverlay isOpen={activeFlyoutId !== null || isSearchOpen} />
      )}

      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'h-11 md:h-12 lg:h-14', // Responsive height
          'bg-white/80 dark:bg-black/80 backdrop-blur-lg', // Blurred background
          'border-b border-gray-200 dark:border-gray-800',
          'transition-all duration-300 ease-in-out',
        )}
        aria-label="Global"
        onMouseEnter={handleNavAreaMouseEnter}
        onMouseLeave={handleNavAreaMouseLeave}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-6 relative">
          {/* Mobile Menu Toggle (Hamburger/X icon) - Always visible on mobile */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-overlay-container"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {FiX &&
              FiMenu &&
              (isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />)}
          </button>

          {/* Apple Logo (Desktop Only, or hidden if mobile menu open) */}
          <div className={cn('hidden lg:block', { hidden: isMobileMenuOpen })}>
            <GlobalNavLink
              label="Apple"
              href="/"
              icon={staticNavLinks[0].icon}
              isActive={false}
            />
          </div>

          {/* Desktop Navigation Links */}
          <ul
            className={cn(
              'hidden lg:flex flex-grow justify-center h-full',
              'list-none p-0 m-0',
              { hidden: isMobileMenuOpen }, // Hide on mobile if menu is open
            )}
            role="menubar"
          >
            {staticNavLinks.slice(1, -2).map((link) => (
              <li
                key={link.id}
                className="h-full flex items-center"
                role="none"
                onMouseEnter={() => handleNavLinkMouseEnter(link.id)}
                onFocus={() => handleNavLinkFocus(link.id)}
                onBlur={handleNavLinkBlur}
              >
                <GlobalNavLink
                  label={link.label}
                  href={link.href}
                  isActive={activeFlyoutId === link.id}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (link.flyoutContent) {
                      e.preventDefault();
                      setActiveFlyoutId(link.id);
                    } else {
                      setActiveFlyoutId(null);
                    }
                  }}
                />
              </li>
            ))}
          </ul>

          {/* Search and Bag Icons (Desktop Only, or hidden if mobile menu open) */}
          <div
            className={cn('hidden lg:flex items-center h-full', {
              hidden: isMobileMenuOpen,
            })}
          >
            <GlobalNavLink
              label="Search"
              href="#"
              icon={staticNavLinks.find((link) => link.id === 'search')?.icon}
              onClick={toggleSearch}
            />
            <GlobalNavLink
              label="Github"
              href={
                staticNavLinks.find((link) => link.id === 'github')?.href || '#'
              }
              icon={staticNavLinks.find((link) => link.id === 'github')?.icon}
            />
          </div>
        </div>

        {/* Flyout Content (Desktop Only) */}
        {activeNavItem && (
          <GlobalNavFlyout
            navItem={activeNavItem}
            isOpen={activeFlyoutId !== null}
            onClose={() => setActiveFlyoutId(null)}
            contentRef={flyoutContentRef}
          />
        )}

        {/* Search Overlay */}
        <GlobalNavSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </nav>

      {/* Mobile Menu Overlay (New Component) */}
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

// File: components/GlobalNav/GlobalNav.tsx
