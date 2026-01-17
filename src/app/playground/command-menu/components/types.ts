// src/app/playground/command-menu/components/types.ts

import { ReactNode } from 'react';

/**
 * Command item that can be executed
 */
export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Icon component or element */
  icon?: ReactNode;
  /** Keyboard shortcut hint (e.g., "⌘K") */
  shortcut?: string;
  /** Action to execute when selected */
  onSelect: () => void;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Keywords for search matching */
  keywords?: string[];
  /** Group this item belongs to */
  group?: string;
}

/**
 * Group of commands
 */
export interface CommandGroup {
  /** Group identifier */
  id: string;
  /** Group heading */
  heading: string;
  /** Commands in this group */
  items: CommandItem[];
}

/**
 * Size presets for Command Menu width
 */
export type CommandMenuSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Handlebar position
 */
export type HandlebarPosition = 'top' | 'bottom' | 'none';

/**
 * Command Menu configuration
 */
export interface CommandMenuConfig {
  /** Placeholder text for search input */
  placeholder?: string;
  /** Empty state message when no results */
  emptyMessage?: string;
  /** Whether to show recent commands */
  showRecent?: boolean;
  /** Maximum recent commands to show */
  maxRecent?: number;
  /** Whether to close on select */
  closeOnSelect?: boolean;
  /** Custom filter function */
  filter?: (item: CommandItem, query: string) => boolean;
  /** Size preset for width */
  size?: CommandMenuSize;
  /** Handlebar position for drag affordance */
  handlebar?: HandlebarPosition;
}

/**
 * Props for CommandMenu component
 */
export interface CommandMenuProps extends CommandMenuConfig {
  /** Whether menu is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Commands to display (flat list) */
  commands?: CommandItem[];
  /** Grouped commands */
  groups?: CommandGroup[];
  /** Additional class for the dialog */
  className?: string;
}

/**
 * Props for CommandInput component
 */
export interface CommandInputProps {
  /** Current search value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
}

/**
 * Props for CommandList component
 */
export interface CommandListProps {
  /** Filtered items to display */
  items: CommandItem[];
  /** Grouped items */
  groups?: { heading: string; items: CommandItem[] }[];
  /** Currently highlighted index */
  highlightedIndex: number;
  /** Callback when item is selected */
  onSelect: (item: CommandItem) => void;
  /** Empty state message */
  emptyMessage?: string;
}

/**
 * Default configuration
 */
export const DEFAULT_COMMAND_CONFIG: Required<CommandMenuConfig> = {
  placeholder: 'Type a command or search...',
  emptyMessage: 'No results found.',
  showRecent: true,
  maxRecent: 5,
  closeOnSelect: true,
  filter: (item, query) => {
    const searchText = query.toLowerCase();
    const labelMatch = item.label.toLowerCase().includes(searchText);
    const descMatch = item.description?.toLowerCase().includes(searchText);
    const keywordMatch = item.keywords?.some((k) =>
      k.toLowerCase().includes(searchText),
    );
    return labelMatch || descMatch || keywordMatch || false;
  },
  size: 'lg',
  handlebar: 'none',
};

/**
 * Size classes for responsive widths
 */
export const COMMAND_SIZE_CLASSES: Record<CommandMenuSize, string> = {
  sm: 'w-full max-w-md',
  md: 'w-full max-w-xl',
  lg: 'w-full max-w-2xl',
  xl: 'w-full max-w-4xl',
  full: 'w-full max-w-[90vw] lg:max-w-[80vw]',
};
