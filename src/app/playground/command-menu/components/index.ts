// src/app/playground/command-menu/components/index.ts

/**
 * Command Menu - Raycast/Spotlight style command palette
 *
 * Built with HeadlessUI Dialog + Combobox for reliable a11y.
 *
 * Features:
 * - Keyboard shortcut activation (Cmd+K / Ctrl+K)
 * - Fuzzy search across commands
 * - Grouped commands with headings
 * - Keyboard navigation (arrow keys, enter, escape)
 * - No X button - Escape to close
 */

// Components
export { CommandMenu } from './CommandMenu';

// Hooks
export { useCommandMenu } from './useCommandMenu';

// Types
export type {
  CommandMenuProps,
  CommandItem,
  CommandGroup,
  CommandMenuConfig,
  CommandInputProps,
  CommandListProps,
  CommandMenuSize,
  HandlebarPosition,
} from './types';

export { DEFAULT_COMMAND_CONFIG, COMMAND_SIZE_CLASSES } from './types';
