// src/components/Theme/theme-toggle.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { cn } from '@/lib/utils';

/**
 * A standalone client component for toggling between light and dark themes.
 * It uses next-themes for theme management and react-icons for visual feedback.
 * The component is designed as a sleek, responsive toggle switch.
 */
const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect runs only on the client-side, ensuring hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder or null until mounted to prevent hydration mismatches
  if (!mounted) {
    return (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg">
        {/* Placeholder for consistent layout during hydration */}
      </div>
    );
  }

  // Determine the current icon and its position based on the active theme
  const isDark = theme === 'dark';
  const Icon = isDark ? FiSun : FiMoon;
  const iconColor = isDark ? 'text-yellow-400' : 'text-blue-600';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative flex items-center w-14 h-8 rounded-full shadow-md', // Increased width for switch effect
        'bg-gray-300 dark:bg-gray-700', // Track background
        'transition-colors duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75',
        'p-1', // Padding for the thumb
      )}
      aria-label="Toggle dark/light mode"
    >
      {/* Sliding thumb */}
      <div
        className={cn(
          'absolute w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-sm', // Thumb styling
          'flex items-center justify-center',
          'transition-transform duration-300 ease-in-out',
          isDark ? 'translate-x-full' : 'translate-x-0', // Slide thumb
        )}
      >
        <Icon size={16} className={iconColor} />
      </div>
    </button>
  );
};

export default ThemeToggle;

// src/components/ui/theme-toggle.tsx
