// src/lib/playground-data.ts

/**
 * Playground Component Registry
 *
 * Centralized configuration for all playground components
 * with categories, status tracking, and metadata.
 */

export type ComponentStatus =
  | 'done'
  | 'ready'
  | 'in-progress'
  | 'planned'
  | 'deferred';

export interface PlaygroundComponent {
  /** Unique identifier (used in URL) */
  id: string;
  /** Display name */
  name: string;
  /** Short description */
  description: string;
  /** Route path */
  href: string;
  /** Current implementation status */
  status: ComponentStatus;
  /** Icon name from react-icons (optional) */
  icon?: string;
  /** Tags for filtering */
  tags?: string[];
  /** Whether component is featured on home */
  featured?: boolean;
}

export interface PlaygroundCategory {
  /** Category title */
  title: string;
  /** Category description */
  description: string;
  /** Unique identifier */
  id: string;
  /** Components in this category */
  items: PlaygroundComponent[];
}

/**
 * All playground categories and components
 */
export const playgroundCategories: PlaygroundCategory[] = [
  {
    id: 'display-utility',
    title: 'Display & Utility',
    description: 'Layout primitives, navigation, and information display',
    items: [
      {
        id: 'headline',
        name: 'Headline Block',
        description: 'Apple-style page headlines with fluid typography',
        href: '/playground/headline',
        status: 'done',
        tags: ['typography', 'layout'],
        featured: true,
      },
      {
        id: 'breadcrumb',
        name: 'Breadcrumb Navigator',
        description: 'Animated path navigation with overflow handling',
        href: '/playground/breadcrumb',
        status: 'done',
        tags: ['navigation', 'animation'],
      },
      {
        id: 'dock-bar',
        name: 'Dock Bar',
        description: 'macOS-style bottom bar with magnetic hover effect',
        href: '/playground/dock-bar',
        status: 'done',
        tags: ['navigation', 'gesture', 'animation'],
        featured: true,
      },
      {
        id: 'command-menu',
        name: 'Command Menu',
        description: 'Raycast-style command palette with fuzzy search',
        href: '/playground/command-menu',
        status: 'done',
        tags: ['search', 'navigation', 'keyboard'],
        featured: true,
      },
    ],
  },
  {
    id: 'feedback-messaging',
    title: 'Feedback & Messaging',
    description: 'Notifications, alerts, and user feedback',
    items: [
      {
        id: 'toast',
        name: 'Toast / Snackbar',
        description: 'Queue-managed notifications with swipe dismiss',
        href: '/playground/toast',
        status: 'done',
        tags: ['notification', 'feedback', 'animation'],
        featured: true,
      },
    ],
  },
  {
    id: 'interactive-surfaces',
    title: 'Interactive Surfaces',
    description: 'Overlays, popovers, and contextual interfaces',
    items: [
      {
        id: 'modal',
        name: 'Modal System',
        description: 'Dialog + PageMode with physics-based drag',
        href: '/playground/modal',
        status: 'done',
        tags: ['overlay', 'gesture', 'animation'],
        featured: true,
      },
      {
        id: 'context-menu',
        name: 'Context Menu',
        description: 'Right-click + long-press with modal/contextual modes',
        href: '/playground/context-menu',
        status: 'done',
        tags: ['menu', 'gesture', 'overlay'],
        featured: true,
      },
      {
        id: 'hover-card',
        name: 'Hover Card',
        description: 'Preview cards with hover intent and lazy loading',
        href: '/playground/hover-card',
        status: 'done',
        tags: ['overlay', 'preview', 'animation'],
        featured: true,
      },
      {
        id: 'tooltip',
        name: 'Smart Tooltip',
        description: 'Hover intent detection with smart positioning',
        href: '/playground/tooltip',
        status: 'done',
        tags: ['overlay', 'help', 'positioning'],
        featured: true,
      },
    ],
  },
  {
    id: 'gestural',
    title: 'Gestural Components',
    description: 'Touch and gesture-based interactions',
    items: [
      {
        id: 'slide-to-confirm',
        name: 'Slide to Confirm',
        description: 'iOS-style swipe confirmation for destructive actions',
        href: '/playground/slide-to-confirm',
        status: 'done',
        tags: ['gesture', 'confirmation', 'animation'],
        featured: true,
      },
      {
        id: 'long-press-reveal',
        name: 'Long-press Reveal',
        description: 'Progressive reveal with haptic feedback stages',
        href: '/playground/long-press-reveal',
        status: 'done',
        tags: ['gesture', 'reveal', 'animation'],
        featured: true,
      },
    ],
  },
  {
    id: 'form-input',
    title: 'Form & Input',
    description: 'Specialized input components for forms and data entry',
    items: [
      {
        id: 'digit-input',
        name: 'Digit Input',
        description: 'Apple-style OTP/PIN entry with smart paste and haptics',
        href: '/playground/digit-input',
        status: 'done',
        tags: ['input', 'form', 'otp', 'pin'],
        featured: true,
      },
    ],
  },
  {
    id: 'foundation',
    title: 'Foundation',
    description: 'Core components and primitives',
    items: [
      {
        id: 'typography',
        name: 'Typography',
        description: '48+ text components with fluid scaling',
        href: '/playground/typography',
        status: 'done',
        tags: ['typography', 'text'],
      },
      {
        id: 'box',
        name: 'Box Primitives',
        description: 'Flex, Grid, Stack, and layout components',
        href: '/playground/box',
        status: 'done',
        tags: ['layout', 'primitive'],
      },
    ],
  },
];

/**
 * Get all featured components for homepage
 */
export function getFeaturedComponents(): PlaygroundComponent[] {
  return playgroundCategories
    .flatMap((cat) => cat.items)
    .filter((item) => item.featured);
}

/**
 * Get all components flattened
 */
export function getAllComponents(): PlaygroundComponent[] {
  return playgroundCategories.flatMap((cat) => cat.items);
}

/**
 * Get component by ID
 */
export function getComponentById(id: string): PlaygroundComponent | undefined {
  return getAllComponents().find((item) => item.id === id);
}

/**
 * Get components by status
 */
export function getComponentsByStatus(
  status: ComponentStatus,
): PlaygroundComponent[] {
  return getAllComponents().filter((item) => item.status === status);
}

/**
 * Get components by tag
 */
export function getComponentsByTag(tag: string): PlaygroundComponent[] {
  return getAllComponents().filter((item) => item.tags?.includes(tag));
}

/**
 * Status badge color mapping
 */
export const statusColors: Record<
  ComponentStatus,
  { bg: string; text: string; border: string }
> = {
  done: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-700 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  ready: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  'in-progress': {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
  },
  planned: {
    bg: 'bg-gray-50 dark:bg-gray-800/50',
    text: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
  },
  deferred: {
    bg: 'bg-gray-50 dark:bg-gray-900/50',
    text: 'text-gray-400 dark:text-gray-500',
    border: 'border-gray-200 dark:border-gray-800',
  },
};

/**
 * Status display labels
 */
export const statusLabels: Record<ComponentStatus, string> = {
  done: 'Complete',
  ready: 'Ready',
  'in-progress': 'In Progress',
  planned: 'Planned',
  deferred: 'Deferred',
};
