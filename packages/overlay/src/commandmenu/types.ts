// packages/overlay/src/commandmenu/types.ts

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

/**
 * CSS variable-backed styles for command menu
 */
export const COMMAND_MENU_STYLES = {
  dialog: {
    base: 'bg-bg-elevated dark:bg-bg-elevated',
    border: 'border border-border-subtle dark:border-border-subtle',
  },
  input: {
    text: 'text-text-primary dark:text-text-primary',
    placeholder: 'placeholder:text-text-muted dark:placeholder:text-text-muted',
    icon: 'text-text-muted',
  },
  item: {
    base: 'text-text-primary dark:text-text-primary',
    hover: 'bg-bg-secondary dark:bg-bg-secondary',
    description: 'text-text-muted dark:text-text-muted',
    icon: {
      wrapper:
        'bg-bg-secondary dark:bg-bg-secondary text-text-secondary dark:text-text-secondary',
    },
    shortcut: 'text-text-muted dark:text-text-muted',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  group: {
    heading: 'text-text-muted dark:text-text-muted',
  },
  empty: {
    text: 'text-text-muted dark:text-text-muted',
  },
  kbd: {
    base: 'bg-bg-secondary dark:bg-bg-secondary text-text-muted dark:text-text-muted',
  },
  handlebar: {
    base: 'bg-border-default dark:bg-border-default',
    hover: 'hover:bg-bg-secondary dark:hover:bg-bg-secondary',
    border: 'border-border-default dark:border-border-default',
  },
  footer: {
    border: 'border-border-default dark:border-border-default',
    text: 'text-text-muted dark:text-text-muted',
  },
} as const;
