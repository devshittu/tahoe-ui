// src/components/DocsPageLayout/components/ui/preview-toolbar.tsx
'use client';

import React, { useState } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import {
  FiGithub,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiSun,
  FiMoon,
  FiRefreshCcw,
} from 'react-icons/fi';

import { cn } from '@/lib/utils';

// Define types for preview controls
export type PreviewViewMode = 'desktop' | 'tablet' | 'mobile';
export type PreviewTheme = 'light' | 'dark';
export type CodeLanguage = 'html' | 'typescript'; // Exported for use in other components

interface PreviewToolbarProps {
  currentViewMode: PreviewViewMode;
  onViewModeChange: (mode: PreviewViewMode) => void;
  currentTheme: PreviewTheme;
  onThemeChange: (theme: PreviewTheme) => void;
  isRtl: boolean;
  onRtlToggle: () => void;
  githubLink?: string; // Optional GitHub link for the component
}

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

// Helper component for tooltips
const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      {React.cloneElement(
        children,
        getReferenceProps({ ref: refs.setReference }),
      )}
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700 opacity-90"
          >
            {content}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

/**
 * Toolbar for controlling the preview of UI components.
 * Includes device view toggles, theme switch, RTL toggle, and GitHub link.
 */
const PreviewToolbar: React.FC<PreviewToolbarProps> = ({
  currentViewMode,
  onViewModeChange,
  currentTheme,
  onThemeChange,
  isRtl,
  onRtlToggle,
  githubLink,
}) => {
  // Base styles for all toolbar buttons
  const buttonBaseClasses =
    'flex items-center justify-center h-9 text-xs font-medium focus:outline-none focus:z-10 focus:ring-2 transition-all duration-200';

  // Styles for primary action buttons (like GitHub link, RTL, Theme)
  const actionButtonClasses =
    'px-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 rounded-lg';

  // Styles for device toggle buttons within their segmented group
  const deviceToggleButtonClasses =
    'w-9 text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700';

  // Styles for active toggle buttons
  const activeToggleClasses =
    'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 ring-2 ring-blue-300 dark:ring-blue-600';

  const iconSize = 16;

  return (
    <div className="w-full p-4 border border-gray-200 bg-gray-50 rounded-t-xl dark:border-gray-700 dark:bg-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Left section: GitHub Link */}
      <div className="flex-shrink-0 w-full sm:w-auto flex justify-start">
        {githubLink && (
          <Tooltip content="Edit on GitHub">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonBaseClasses, actionButtonClasses, 'mr-3')}
            >
              <FiGithub size={iconSize} className="mr-2" /> Edit on GitHub
            </a>
          </Tooltip>
        )}
      </div>

      {/* Center section: Device Toggles */}
      <div className="flex items-center justify-center flex-grow w-full sm:w-auto">
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm overflow-hidden">
          {' '}
          {/* Removed inner borders */}
          <Tooltip content="Toggle desktop view">
            <button
              onClick={() => onViewModeChange('desktop')}
              className={cn(
                buttonBaseClasses,
                deviceToggleButtonClasses,
                currentViewMode === 'desktop' && activeToggleClasses,
              )}
              aria-label="Toggle desktop view"
            >
              <FiMonitor size={iconSize} />
            </button>
          </Tooltip>
          <Tooltip content="Toggle tablet view">
            <button
              onClick={() => onViewModeChange('tablet')}
              className={cn(
                buttonBaseClasses,
                deviceToggleButtonClasses,
                currentViewMode === 'tablet' && activeToggleClasses,
                'border-l border-gray-200 dark:border-gray-600',
              )}
              aria-label="Toggle tablet view"
            >
              <FiTablet size={iconSize} />
            </button>
          </Tooltip>
          <Tooltip content="Toggle mobile view">
            <button
              onClick={() => onViewModeChange('mobile')}
              className={cn(
                buttonBaseClasses,
                deviceToggleButtonClasses,
                currentViewMode === 'mobile' && activeToggleClasses,
                'border-l border-gray-200 dark:border-gray-600',
              )}
              aria-label="Toggle mobile view"
            >
              <FiSmartphone size={iconSize} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Right section: RTL and Dark/Light Mode */}
      <div className="flex items-center justify-end space-x-2 flex-shrink-0 w-full sm:w-auto">
        <Tooltip content={isRtl ? 'Disable RTL mode' : 'Enable RTL mode'}>
          <button
            onClick={onRtlToggle}
            className={cn(buttonBaseClasses, actionButtonClasses)}
            aria-label="Toggle RTL mode"
          >
            <FiRefreshCcw
              size={iconSize}
              className={cn('mr-1', isRtl ? 'scale-x-[-1]' : '')}
            />
            RTL
          </button>
        </Tooltip>
        <Tooltip
          content={
            currentTheme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'
          }
        >
          <button
            onClick={() =>
              onThemeChange(currentTheme === 'light' ? 'dark' : 'light')
            }
            className={cn(buttonBaseClasses, actionButtonClasses)}
            aria-label="Toggle dark/light mode"
          >
            {currentTheme === 'light' ? (
              <FiMoon size={iconSize} />
            ) : (
              <FiSun size={iconSize} />
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default PreviewToolbar;
