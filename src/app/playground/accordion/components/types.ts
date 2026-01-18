// src/app/playground/accordion/components/types.ts

import { ReactNode } from 'react';

/**
 * Accordion expansion type
 * - single: only one item can be open at a time
 * - multiple: multiple items can be open simultaneously
 */
export type AccordionType = 'single' | 'multiple';

/**
 * Accordion visual variants
 */
export type AccordionVariant = 'default' | 'bordered' | 'separated';

/**
 * Accordion sizes
 */
export type AccordionSize = 'sm' | 'md' | 'lg';

/**
 * Props for AccordionRoot
 */
export interface AccordionRootProps {
  /** Expansion behavior */
  type?: AccordionType;
  /** Visual variant */
  variant?: AccordionVariant;
  /** Size */
  size?: AccordionSize;
  /** Controlled value (item value or array of values) */
  value?: string | string[];
  /** Default expanded items (uncontrolled) */
  defaultValue?: string | string[];
  /** Callback when value changes */
  onValueChange?: (value: string | string[]) => void;
  /** Allow collapsing all items (only for single type) */
  collapsible?: boolean;
  /** Disable all items */
  disabled?: boolean;
  /** Children (AccordionItem components) */
  children: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Props for AccordionItem
 */
export interface AccordionItemProps {
  /** Unique value for this item */
  value: string;
  /** Disable this item */
  disabled?: boolean;
  /** Children (AccordionTrigger and AccordionContent) */
  children: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Props for AccordionTrigger
 */
export interface AccordionTriggerProps {
  /** Trigger content */
  children: ReactNode;
  /** Custom icon (replaces default chevron) */
  icon?: ReactNode;
  /** Hide the icon */
  hideIcon?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Props for AccordionContent
 */
export interface AccordionContentProps {
  /** Content to show when expanded */
  children: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Accordion context value
 */
export interface AccordionContextValue {
  type: AccordionType;
  variant: AccordionVariant;
  size: AccordionSize;
  value: string[];
  onItemToggle: (itemValue: string) => void;
  collapsible: boolean;
  disabled: boolean;
}

/**
 * AccordionItem context value
 */
export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  isDisabled: boolean;
  triggerId: string;
  contentId: string;
}

/**
 * Size configuration
 */
export const ACCORDION_SIZE_CONFIG: Record<
  AccordionSize,
  {
    trigger: string;
    content: string;
    icon: string;
    text: string;
  }
> = {
  sm: {
    trigger: 'px-3 py-2',
    content: 'px-3 pb-3',
    icon: 'w-4 h-4',
    text: 'text-sm',
  },
  md: {
    trigger: 'px-4 py-3',
    content: 'px-4 pb-4',
    icon: 'w-5 h-5',
    text: 'text-base',
  },
  lg: {
    trigger: 'px-5 py-4',
    content: 'px-5 pb-5',
    icon: 'w-5 h-5',
    text: 'text-lg',
  },
};

/**
 * Variant configuration
 */
export const ACCORDION_VARIANT_CONFIG: Record<
  AccordionVariant,
  {
    root: string;
    item: string;
    trigger: string;
    content: string;
  }
> = {
  default: {
    root: '',
    item: 'border-b border-gray-200 dark:border-gray-800 last:border-b-0',
    trigger: 'hover:bg-gray-50 dark:hover:bg-gray-900/50',
    content: '',
  },
  bordered: {
    root: 'border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden',
    item: 'border-b border-gray-200 dark:border-gray-800 last:border-b-0',
    trigger: 'hover:bg-gray-50 dark:hover:bg-gray-900/50',
    content: '',
  },
  separated: {
    root: 'space-y-2',
    item: 'border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden',
    trigger: 'hover:bg-gray-50 dark:hover:bg-gray-900/50',
    content: '',
  },
};
