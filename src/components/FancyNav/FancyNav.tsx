// src/components/FancyNav.tsx

'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export type MenuItem = {
  label: string;
  href: string;
  current?: boolean; // Indicates the active menu item
  className?: string; // Additional classes for individual menu items
};

type FancyNavProps = {
  menuItems: MenuItem[];
  alignment?: 'left' | 'center' | 'right'; // Alignment of the navigation
  magicLineColor?: string; // Tailwind color class for magic line
  magicLineHoverColor?: string; // Tailwind color class for magic line on hover
  containerWidth?: string; // Tailwind width class for the container
};

const FancyNav: React.FC<FancyNavProps> = ({
  menuItems,
  alignment = 'center',
  magicLineColor = 'bg-gray-500',
  magicLineHoverColor = 'bg-yellow-200',
  containerWidth = 'w-[370px]',
}) => {
  const magicLineRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Initialize the magic line position based on the current active link
  useEffect(() => {
    const magicLine = magicLineRef.current;
    const nav = navRef.current;
    const activeLink = nav?.querySelector(
      'a.current-menu-item',
    ) as HTMLAnchorElement;

    activeLinkRef.current = activeLink;

    if (activeLink && magicLine && nav) {
      const setMagicLine = () => {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const left = linkRect.left - navRect.left;
        const width = linkRect.width;

        magicLine.style.left = `${left}px`;
        magicLine.style.width = `${width}px`;
      };

      setMagicLine();

      // Observe changes to the navigation (e.g., window resize)
      const resizeObserver = new ResizeObserver(() => {
        setMagicLine();
      });

      resizeObserver.observe(nav);
      window.addEventListener('resize', setMagicLine);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', setMagicLine);
      };
    }
  }, [menuItems]);

  // Handle mouse enter on menu items
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const target = e.currentTarget;
      const magicLine = magicLineRef.current;
      const nav = navRef.current;

      if (magicLine && nav) {
        const linkRect = target.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const left = linkRect.left - navRect.left;
        const width = linkRect.width;

        magicLine.style.left = `${left}px`;
        magicLine.style.width = `${width}px`;

        // Change magic line color on hover
        magicLine.classList.add(magicLineHoverColor);
      }
    },
    [magicLineHoverColor],
  );

  // Handle mouse leave from menu items
  const handleMouseLeave = useCallback(() => {
    const magicLine = magicLineRef.current;
    const nav = navRef.current;
    const activeLink = activeLinkRef.current;

    if (magicLine && activeLink && nav) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const left = linkRect.left - navRect.left;
      const width = linkRect.width;

      magicLine.style.left = `${left}px`;
      magicLine.style.width = `${width}px`;

      // Revert magic line color after hover
      magicLine.classList.remove(magicLineHoverColor);
    }
  }, [magicLineHoverColor]);

  // Determine alignment classes
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className="fancy-nav-wrapper relative">
      <nav
        id="main-navigation"
        className={twMerge(
          `flex ${alignmentClasses[alignment]} mx-auto mt-2.5 ${containerWidth} relative`,
          'space-x-4', // Adds horizontal spacing between items
        )}
        ref={navRef}
        role="navigation"
        aria-label="Main Navigation"
      >
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <span
              className={twMerge(
                'relative text-white font-semibold uppercase no-underline text-center hover:text-yellow-500 transition-colors duration-300',
                item.current ? 'current-menu-item' : '',
                item.className,
              )}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {item.label}
            </span>
          </Link>
        ))}
        {/* Magic Line */}
        <span
          id="magic-line"
          ref={magicLineRef}
          className={twMerge(
            'absolute bottom-0 h-1 transition-all duration-300',
            magicLineColor,
          )}
        />
      </nav>
    </div>
  );
};

export default FancyNav;
// src/components/FancyNav.tsx
