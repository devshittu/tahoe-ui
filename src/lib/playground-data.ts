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
      {
        id: 'avatar',
        name: 'Avatar',
        description: 'User profile images with fallback initials and status',
        href: '/playground/avatar',
        status: 'done',
        tags: ['display', 'user', 'image'],
        featured: true,
      },
      {
        id: 'badge',
        name: 'Badge',
        description: 'Status indicators for notifications, counts, and labels',
        href: '/playground/badge',
        status: 'done',
        tags: ['display', 'notification', 'status'],
      },
    ],
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'Components for navigating content and pages',
    items: [
      {
        id: 'section-nav',
        name: 'Section Navigator',
        description:
          'Adaptive scroll-spy navigation with ambient, engaged, and command modes',
        href: '/playground/section-nav',
        status: 'done',
        tags: ['navigation', 'scroll', 'keyboard', 'a11y'],
        featured: true,
      },
      {
        id: 'tabs',
        name: 'Tabs',
        description: 'Accessible tabbed interface with animated indicator',
        href: '/playground/nav/tabs',
        status: 'done',
        tags: ['navigation', 'tabs', 'a11y'],
        featured: true,
      },
      {
        id: 'pagination',
        name: 'Pagination',
        description: 'Page navigation with multiple variants',
        href: '/playground/nav/pagination',
        status: 'done',
        tags: ['navigation', 'pagination'],
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
      {
        id: 'progress-bar',
        name: 'Progress Bar',
        description:
          'Determinate and indeterminate progress with smooth animations',
        href: '/playground/progress-bar',
        status: 'done',
        tags: ['feedback', 'loading', 'animation'],
      },
      {
        id: 'alert',
        name: 'Alert',
        description:
          'Contextual feedback messages for info, success, warning, and errors',
        href: '/playground/alert',
        status: 'done',
        tags: ['feedback', 'notification', 'status'],
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
        id: 'input',
        name: 'Input',
        description: 'Text input with variants and validation states',
        href: '/playground/forms/input',
        status: 'done',
        tags: ['input', 'form'],
      },
      {
        id: 'textarea',
        name: 'Textarea',
        description: 'Multi-line text input with auto-resize',
        href: '/playground/forms/textarea',
        status: 'done',
        tags: ['input', 'form'],
      },
      {
        id: 'select',
        name: 'Select',
        description: 'Dropdown select with search and multi-select',
        href: '/playground/forms/select',
        status: 'done',
        tags: ['input', 'form', 'dropdown'],
      },
      {
        id: 'checkbox',
        name: 'Checkbox',
        description: 'Checkbox with indeterminate state support',
        href: '/playground/forms/checkbox',
        status: 'done',
        tags: ['input', 'form', 'toggle'],
      },
      {
        id: 'radio-group',
        name: 'Radio Group',
        description: 'Radio buttons for single selection',
        href: '/playground/forms/radio-group',
        status: 'done',
        tags: ['input', 'form', 'selection'],
      },
      {
        id: 'switch',
        name: 'Switch',
        description: 'Toggle switch for boolean values',
        href: '/playground/forms/switch',
        status: 'done',
        tags: ['input', 'form', 'toggle'],
      },
      {
        id: 'slider',
        name: 'Slider',
        description: 'Range slider with single and dual handles',
        href: '/playground/forms/slider',
        status: 'done',
        tags: ['input', 'form', 'range'],
      },
      {
        id: 'date-picker',
        name: 'Date Picker',
        description: 'Date selection with calendar dropdown',
        href: '/playground/forms/date-picker',
        status: 'done',
        tags: ['input', 'form', 'date'],
      },
      {
        id: 'file-upload',
        name: 'File Upload',
        description: 'Drag-and-drop file upload with preview',
        href: '/playground/forms/file-upload',
        status: 'done',
        tags: ['input', 'form', 'file'],
      },
      {
        id: 'digit-input',
        name: 'Digit Input',
        description: 'Apple-style OTP/PIN entry with smart paste and haptics',
        href: '/playground/digit-input',
        status: 'done',
        tags: ['input', 'form', 'otp', 'pin'],
        featured: true,
      },
      {
        id: 'segmented-control',
        name: 'Segmented Control',
        description:
          'Apple-style grouped toggle with spring-animated sliding indicator',
        href: '/playground/segmented-control',
        status: 'done',
        tags: ['input', 'form', 'toggle', 'selection'],
        featured: true,
      },
      {
        id: 'chip',
        name: 'Chip',
        description: 'Compact tags for categorization, filters, and selections',
        href: '/playground/chip',
        status: 'done',
        tags: ['input', 'form', 'tag', 'filter'],
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
        id: 'button',
        name: 'Button',
        description:
          'Interactive button with variants, colors, sizes, icons, and loading states',
        href: '/playground/button',
        status: 'done',
        tags: ['action', 'interactive', 'form'],
        featured: true,
      },
      {
        id: 'typography',
        name: 'Typography',
        description: '48+ text components with fluid scaling',
        href: '/playground/typography',
        status: 'done',
        tags: ['typography', 'text'],
      },
      {
        id: 'skeleton',
        name: 'Skeleton',
        description:
          'Content-shaped loading placeholders with pulse and wave animations',
        href: '/playground/skeleton',
        status: 'done',
        tags: ['loading', 'placeholder', 'animation'],
      },
      {
        id: 'divider',
        name: 'Divider',
        description:
          'Visual separator with text content support and multiple styles',
        href: '/playground/divider',
        status: 'done',
        tags: ['layout', 'separator', 'primitive'],
      },
      {
        id: 'accordion',
        name: 'Accordion',
        description:
          'Expandable content sections with single or multiple modes',
        href: '/playground/accordion',
        status: 'done',
        tags: ['disclosure', 'content', 'animation'],
      },
    ],
  },
  {
    id: 'layout-primitives',
    title: 'Layout Primitives',
    description: 'Core layout components for building interfaces',
    items: [
      {
        id: 'box',
        name: 'Box',
        description: 'Polymorphic base component with style props',
        href: '/playground/layout/box',
        status: 'done',
        tags: ['layout', 'primitive'],
      },
      {
        id: 'flex',
        name: 'Flex',
        description: 'Flexbox layout with intuitive props',
        href: '/playground/layout/flex',
        status: 'done',
        tags: ['layout', 'flexbox'],
      },
      {
        id: 'grid',
        name: 'Grid',
        description: 'CSS Grid with column control and auto-fit',
        href: '/playground/layout/grid',
        status: 'done',
        tags: ['layout', 'grid'],
      },
      {
        id: 'stack',
        name: 'Stack',
        description: 'Vertical/horizontal stacking with dividers',
        href: '/playground/layout/stack',
        status: 'done',
        tags: ['layout', 'stack'],
      },
      {
        id: 'center',
        name: 'Center',
        description: 'Center content horizontally, vertically, or both',
        href: '/playground/layout/center',
        status: 'done',
        tags: ['layout', 'alignment'],
      },
      {
        id: 'container',
        name: 'Container',
        description: 'Max-width constrained container for pages',
        href: '/playground/layout/container',
        status: 'done',
        tags: ['layout', 'container'],
      },
      {
        id: 'spacer',
        name: 'Spacer',
        description: 'Structural spacing following 8pt grid',
        href: '/playground/layout/spacer',
        status: 'done',
        tags: ['layout', 'spacing'],
      },
      {
        id: 'section',
        name: 'Section',
        description: 'Semantic section with background and padding',
        href: '/playground/layout/section',
        status: 'done',
        tags: ['layout', 'section'],
      },
    ],
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools',
    description: 'Code preview, editing, and documentation components',
    items: [
      {
        id: 'code-preview',
        name: 'Code Preview',
        description:
          'Syntax-highlighted code display with Shiki, copy-to-clipboard, collapsible blocks',
        href: '/playground/code-preview',
        status: 'done',
        tags: ['code', 'syntax', 'documentation', 'shiki'],
        featured: true,
      },
      {
        id: 'code-studio',
        name: 'Code Studio',
        description:
          'Interactive component editor with props panel and live preview',
        href: '/playground/code-studio',
        status: 'done',
        tags: ['code', 'editor', 'props', 'interactive'],
        featured: true,
      },
      {
        id: 'code-blocks',
        name: 'Code Blocks',
        description:
          'Component registry with copy-paste installation like shadcn/ui',
        href: '/playground/code-blocks',
        status: 'done',
        tags: ['code', 'registry', 'components'],
        featured: true,
      },
      {
        id: 'code-sandbox',
        name: 'Code Sandbox',
        description:
          'Live code editing with Monaco editor and Sandpack execution',
        href: '/playground/code-sandbox',
        status: 'done',
        tags: ['code', 'editor', 'sandbox', 'monaco'],
        featured: true,
      },
      {
        id: 'code-canvas',
        name: 'Code Canvas',
        description:
          'AI-powered text-to-UI generation with live preview like v0',
        href: '/playground/code-canvas',
        status: 'done',
        tags: ['code', 'ai', 'generation', 'canvas'],
        featured: true,
      },
    ],
  },
  {
    id: 'hooks',
    title: 'Hooks',
    description: 'Reusable React hooks for common patterns',
    items: [
      {
        id: 'use-media-query',
        name: 'useMediaQuery',
        description: 'SSR-safe media query detection',
        href: '/playground/hooks/use-media-query',
        status: 'done',
        tags: ['hooks', 'responsive'],
      },
      {
        id: 'use-breakpoint',
        name: 'useBreakpoint',
        description: 'Tailwind-aligned breakpoint detection',
        href: '/playground/hooks/use-breakpoint',
        status: 'done',
        tags: ['hooks', 'responsive'],
      },
      {
        id: 'use-focus-trap',
        name: 'useFocusTrap',
        description: 'Trap keyboard focus within container',
        href: '/playground/hooks/use-focus-trap',
        status: 'done',
        tags: ['hooks', 'accessibility', 'focus'],
      },
      {
        id: 'use-click-outside',
        name: 'useClickOutside',
        description: 'Detect clicks outside an element',
        href: '/playground/hooks/use-click-outside',
        status: 'done',
        tags: ['hooks', 'interaction'],
      },
      {
        id: 'use-escape-key',
        name: 'useEscapeKey',
        description: 'ESC key handler with priority stack',
        href: '/playground/hooks/use-escape-key',
        status: 'done',
        tags: ['hooks', 'keyboard'],
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
