// src/components/FloatingNav/FloatingNav.tsx
// FloatingNav.tsx - A floating navigation component with expandable/collapsible functionality
// This component provides a vertical navigation menu with icons and labels,
'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes'; // For theme detection
import { iconMap } from '@/lib/iconMap'; // Import the centralized icon map
import { cn } from '@/lib/utils'; // Assuming cn utility is available
import { Transition, TransitionChild } from '@headlessui/react'; // Import Transition and TransitionChild

// Define the structure for a navigation item
export interface NavItem {
  id: string;
  label: string;
  icon: string; // Icon is now a string key from iconMap
  dataT?: string; // Optional data-t attribute value for tracking
}

// Props for the FloatingNav component
interface FloatingNavProps {
  initialExpanded?: boolean;
  initialActiveItem?: string;
  onExpandChange?: (expanded: boolean) => void;
  onItemClick?: (itemId: string) => void;
  items?: NavItem[]; // Allow external definition of nav items
}

// Default navigation items if not provided via props
const defaultNavItems: NavItem[] = [
  { id: 'weatherContainerButton', label: 'Current', icon: 'FiSun' },
  { id: 'WeatherForecastButton', label: 'Hourly', icon: 'FiCalendar' },
  { id: 'WeatherDetailsSectionButton', label: 'Details', icon: 'FiInfo' },
  { id: 'WeatherMapMiniV2Button', label: 'Maps', icon: 'FiMap' },
  { id: 'WeatherMonthCalendarButton', label: 'Monthly', icon: 'FiCalendar' }, // Re-using FiCalendar
  { id: 'WeatherTrendSectionButton', label: 'Trends', icon: 'FiTrendingUp' },
  { id: 'newsContentTitleButton', label: 'News', icon: 'FiBookOpen' },
];

// Reusable NavItemButton component to reduce duplication and improve maintainability
interface NavItemButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: (id: string) => void;
  isExpanded: boolean;
  index: number; // Added index for staggered animation
}

const NavItemButton: React.FC<NavItemButtonProps> = ({
  item,
  isActive,
  onClick,
  isExpanded,
  index, // Destructure index
}) => {
  const IconComponent = iconMap[item.icon];

  return (
    <motion.button
      id={item.id}
      role="link"
      onClick={() => onClick(item.id)}
      className={cn(
        'group flex items-center cursor-pointer border-none bg-transparent rounded-lg',
        'py-2 px-3', // Increased padding for more whitespace
        'text-sm font-medium leading-5', // Adjusted font size and weight
        'text-gray-700 hover:bg-gray-100/70 hover:text-gray-900', // Light mode subtle hover
        'dark:text-gray-300 dark:hover:bg-gray-700/70 dark:hover:text-white', // Dark mode subtle hover
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'forced-colors:border forced-colors:border-[Highlight] forced-colors:text-[WindowText]', // High contrast
        isActive && 'bg-blue-500 text-white font-semibold', // Apple-like active state (blue background, white text)
        isActive && 'dark:bg-blue-600 dark:text-white', // Dark mode active state
        isActive &&
          'forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
      )}
      whileHover={{ scale: 1.02 }} // Subtle scale on hover
      whileTap={{ scale: 0.98 }} // Subtle scale on tap
      data-t={item.dataT}
      aria-current={isActive ? 'page' : undefined}
    >
      {IconComponent && (
        <span
          className={cn(
            'flex justify-center items-center mr-2', // Added margin-right for icon-label separation
            'w-5 h-5', // Consistent icon size
            isActive
              ? 'text-white' // Active icon color
              : 'text-gray-500 dark:text-gray-400', // Inactive icon color
            isActive
              ? 'forced-colors:text-[HighlightText]'
              : 'forced-colors:text-[WindowText]',
            !isActive &&
              'group-hover:text-gray-700 dark:group-hover:text-gray-200', // Hover effect for inactive icons
          )}
        >
          <IconComponent size={20} />
        </span>
      )}
      {/* Use TransitionChild to animate the label.
          The 'as="span"' prop ensures it renders an actual span element,
          allowing headlessui to apply its internal animation props (including style).
          The 'isExpanded' prop from the parent Transition will control its visibility. */}
      <TransitionChild
        as="span" // Render as a span directly
        enter="transition-opacity transition-transform duration-175 ease-out" // Slightly faster enter
        enterFrom="opacity-0 translate-x-[-10px]"
        enterTo="opacity-100 translate-x-0"
        leave="transition-opacity transition-transform duration-125 ease-in" // Slightly faster leave
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-[-10px]"
        className="whitespace-nowrap" // Apply Tailwind classes directly to the span
        style={{ transitionDelay: isExpanded ? `${index * 0.03}s` : '0s' }} // Apply staggered delay here
      >
        {item.label}{' '}
        {/* Always render the label; headlessui will manage its presence */}
      </TransitionChild>
    </motion.button>
  );
};

const FloatingNav: React.FC<FloatingNavProps> = ({
  initialExpanded = false,
  initialActiveItem = 'weatherContainerButton',
  onExpandChange,
  onItemClick,
  items = defaultNavItems, // Use defaultNavItems if not provided
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(initialExpanded);
  const [activeItem, setActiveItem] = useState<string>(initialActiveItem);
  const { theme } = useTheme(); // Use the useTheme hook

  // Get FiMaximize and FiMinimize from iconMap
  const FiMaximize = iconMap['FiMaximize'];
  const FiMinimize = iconMap['FiMinimize'];
  const FiArrowUp = iconMap['FiArrowUp'];
  const FiRefreshCw = iconMap['FiRefreshCw'];

  // Callback to toggle expanded state, memoized for efficiency
  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => {
      const newState = !prev;
      onExpandChange?.(newState); // Call optional prop callback
      return newState;
    });
  }, [onExpandChange]);

  // Callback for item clicks, memoized for efficiency
  const handleItemClick = useCallback(
    (id: string) => {
      setActiveItem(id);
      onItemClick?.(id); // Call optional prop callback
      console.log(`Navigating to: ${id}`);
    },
    [onItemClick],
  );

  // Variants for Framer Motion animations (for width change)
  const containerVariants = {
    collapsed: { width: 48, transition: { duration: 0.3 } }, // Increased collapsed width for better icon visibility
    expanded: { width: 'auto', transition: { duration: 0.3 } },
  };

  // Determine background and text colors based on theme for better visibility
  const navBgClasses = cn(
    'bg-white/80 backdrop-blur-xl shadow-xl', // Light mode: increased opacity, stronger blur, more prominent shadow
    'dark:bg-gray-900/80 dark:backdrop-blur-xl dark:shadow-xl', // Dark mode: increased opacity, stronger blur, more prominent shadow
  );

  const hrBgClasses = cn(
    'bg-gray-200 dark:bg-gray-700', // Clearer separator colors
  );

  const dotBgClasses = cn(
    'bg-gray-500', // Consistent dot color
    'dark:bg-gray-400',
    'forced-colors:bg-[WindowText]',
  );

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-4 z-50 flex items-center">
      {/* Transition for the Expanded Navigation */}
      <Transition
        as={React.Fragment}
        show={isExpanded} // Show when expanded
        enter="transition-opacity duration-250 ease-out" // Adjusted duration
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200 ease-in" // Adjusted duration
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <motion.nav
          key="expanded-nav"
          initial="collapsed" // Initial state for motion
          animate="expanded" // Animate to expanded
          exit="collapsed" // Exit to collapsed
          variants={containerVariants}
          className={cn(
            'flex flex-col rounded-2xl p-4 space-y-3', // Increased padding and spacing
            navBgClasses,
            'forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:border forced-colors:border-[Highlight]', // High contrast
          )}
          id="weathernavbar"
          aria-label="Weather Navigation Menu"
        >
          <div className="flex flex-col space-y-2">
            {' '}
            {/* Adjusted spacing for nav items */}
            {items.map((item, index) => (
              <NavItemButton
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onClick={handleItemClick}
                isExpanded={isExpanded}
                index={index} // Pass index for staggered animation
              />
            ))}
          </div>
          <hr
            className={cn('h-px my-2 p-0 border-0 w-full', hrBgClasses)} // Adjusted margin
          />
          <div className="flex flex-col items-center space-y-2">
            {' '}
            {/* Adjusted spacing for control buttons */}
            <div className="flex justify-around w-full px-2">
              {' '}
              {/* Group back to top and refresh with spacing */}
              <motion.button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  console.log('Back to top clicked');
                }}
                className={cn(
                  'p-2 rounded-full w-8 h-8 flex justify-center items-center', // Consistent button size and padding
                  'text-gray-700 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-gray-700/70',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                  'forced-colors:border forced-colors:border-[Highlight] forced-colors:text-[WindowText]',
                )}
                title="Back to top"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-t='{"n":"nav_backtotop","t":0,"a":"click","b":76,"d":"","c.hl":"nav_backtotop"}'
              >
                {FiArrowUp && <FiArrowUp size={20} className="block" />}
              </motion.button>
              <motion.button
                onClick={() => {
                  window.location.reload();
                  console.log('Refresh page clicked');
                }}
                className={cn(
                  'p-2 rounded-full w-8 h-8 flex justify-center items-center', // Consistent button size and padding
                  'text-gray-700 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-gray-700/70',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                  'forced-colors:border forced-colors:border-[Highlight] forced-colors:text-[WindowText]',
                )}
                title="Refresh this page"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-t='{"n":"nav_refresh","t":0,"a":"click","b":76,"d":"","c.hl":"nav_refresh"}'
              >
                {FiRefreshCw && <FiRefreshCw size={20} className="block" />}
              </motion.button>
            </div>
            {/* Minimize button for expanded mode - on a separate line */}
            <motion.button
              onClick={toggleExpanded}
              className={cn(
                'p-2 rounded-full w-8 h-8 flex justify-center items-center', // Fixed size for consistent appearance
                'bg-transparent hover:bg-gray-100/70 text-gray-700', // Subtle hover for light mode
                'dark:hover:bg-gray-700/70 dark:text-gray-300', // Subtle hover for dark mode
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                'forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:border forced-colors:border-[Highlight]',
              )}
              title="Collapse view"
              aria-label="Collapse navigation view"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {FiMinimize && <FiMinimize size={20} />}
            </motion.button>
          </div>
        </motion.nav>
      </Transition>

      {/* Transition for the Collapsed Navigation */}
      <Transition
        as={React.Fragment}
        show={!isExpanded} // Show when NOT expanded
        enter="transition-opacity duration-250 ease-out" // Adjusted duration
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200 ease-in" // Adjusted duration
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <motion.div
          key="collapsed-nav"
          initial="expanded" // Initial state for motion
          animate="collapsed" // Animate to collapsed
          exit="expanded" // Exit to expanded
          variants={containerVariants}
          className={cn(
            'flex flex-col justify-center items-center rounded-2xl py-4 px-2 space-y-2', // Increased padding and spacing
            navBgClasses,
            'forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:border forced-colors:border-[Highlight]', // High contrast
          )}
          onClick={toggleExpanded} // Primary click still expands
          role="button"
          aria-label="Expand navigation menu"
          aria-expanded={isExpanded}
          tabIndex={0} // Make it focusable
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleExpanded();
            }
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex justify-center items-center rounded-full', // Changed to rounded-full for dots
                activeItem === item.id
                  ? 'bg-blue-500 p-1' // Active item is a blue circle with icon
                  : 'w-2 h-2', // Inactive item is a small dot
                activeItem === item.id
                  ? 'forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]'
                  : 'forced-colors:bg-[WindowText]',
              )}
              data-t={item.dataT}
            >
              {activeItem === item.id ? (
                <span className="text-white forced-colors:text-[WindowText]">
                  {iconMap[item.icon] &&
                    React.createElement(iconMap[item.icon], { size: 16 })}
                </span>
              ) : (
                <div className={cn('w-2 h-2 rounded-full', dotBgClasses)} />
              )}
            </div>
          ))}
          {/* Maximize button for collapsed mode - always showing icon, last in vertical pill */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent div's onClick from firing
              toggleExpanded();
            }}
            className={cn(
              'mt-3 p-1.5 rounded-full w-7 h-7 flex justify-center items-center', // Adjusted size and padding
              'bg-transparent text-gray-700', // No background, text color for light mode
              'dark:text-gray-300', // No background, text color for dark mode
              'hover:bg-gray-100/70 dark:hover:bg-gray-700/70', // Subtle hover effect
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
              'forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:border forced-colors:border-[Highlight]',
            )}
            title="Toggle expanded view"
            aria-label="Toggle expanded navigation view"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {FiMaximize && <FiMaximize size={18} />}
          </motion.button>
        </motion.div>
      </Transition>
    </div>
  );
};

export default FloatingNav;
// src/components/FloatingNav/FloatingNav.tsx
