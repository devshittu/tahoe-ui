// src/lib/modal-data.ts
import { ComponentData } from './data';

/**
 * Modal system component documentation data.
 * Used by DocsPageLayout to render documentation pages.
 */
export const modalComponents: ComponentData[] = [
  {
    id: 'dialog',
    name: 'Dialog',
    description:
      'Modal dialog with gesture-based dismissal, enhanced motion effects, and comprehensive accessibility features. Built on HeadlessUI with Framer Motion physics.',
    api: [
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controls dialog visibility',
        default: 'false',
      },
      {
        name: 'onClose',
        type: '() => void',
        description: 'Callback when dialog should close',
        default: '-',
      },
      {
        name: 'showFrom',
        type: "'top' | 'bottom' | 'left' | 'right'",
        description: 'Direction the dialog slides in from',
        default: "'top'",
      },
      {
        name: 'handlebarPosition',
        type: "'top' | 'bottom' | 'left' | 'right'",
        description: 'Position of the drag handlebar',
        default: "'top'",
      },
      {
        name: 'roundedEdges',
        type: 'boolean',
        description: 'Apply rounded corners based on position',
        default: 'false',
      },
      {
        name: 'themeable',
        type: 'boolean',
        description: 'Enable dark mode support',
        default: 'false',
      },
      {
        name: 'closeThreshold',
        type: 'number',
        description: 'Drag distance ratio (0-1) to trigger close',
        default: '0.5',
      },
      {
        name: 'enhancedCloseBox',
        type: 'boolean',
        description: 'Show visual indicator when drag exceeds threshold',
        default: 'false',
      },
      {
        name: 'zIndex',
        type: 'number',
        description: 'Custom z-index for stacking control',
        default: '9998',
      },
      {
        name: 'resistance',
        type: 'DragResistanceConfig',
        description: 'Configure drag resistance physics',
        default: '-',
      },
      {
        name: 'backdropEffects',
        type: 'BackdropEffectsConfig',
        description: 'Backdrop blur and scale effects',
        default: '-',
      },
      {
        name: 'squashStretch',
        type: 'SquashStretchConfig',
        description: 'Squash-and-stretch animation config',
        default: '-',
      },
      {
        name: 'loadingState',
        type: 'LoadingStateConfig',
        description: 'Loading state with shimmer effect',
        default: '-',
      },
      {
        name: 'a11yOptions',
        type: 'A11yOptions',
        description: 'Accessibility configuration options',
        default: '-',
      },
    ],
    previewComponentCode: `
<div class="flex flex-col gap-4 p-6">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Dialog Preview</h2>
  <p class="text-gray-600 dark:text-gray-400">
    A modal dialog with gesture-based dismissal. Features include:
  </p>
  <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
    <li>Drag handlebar to close</li>
    <li>Backdrop blur effect</li>
    <li>Squash-and-stretch animation</li>
    <li>Resistance feedback</li>
    <li>Focus trap and screen reader support</li>
  </ul>
  <div class="flex gap-2 mt-4">
    <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">HeadlessUI</span>
    <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm">Framer Motion</span>
  </div>
</div>`,
    codeSnippet: `import { Dialog } from '@/app/playground/modal/components/Dialog';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showFrom="top"
        handlebarPosition="top"
        roundedEdges={true}
        themeable={true}
        closeThreshold={0.5}
        enhancedCloseBox={true}
        resistance={{
          enabled: true,
          threshold: 50,
          strength: 0.6,
          visualFeedback: true,
        }}
        backdropEffects={{
          blur: true,
          blurAmount: '8px',
          scale: true,
          scaleAmount: 0.98,
          backgroundOpacity: 0.3,
        }}
        squashStretch={{
          enabled: true,
          trigger: 'start',
          intensity: 0.03,
          duration: 150,
        }}
        a11yOptions={{
          enableFocusTrap: true,
          announceToScreenReader: true,
          escapeClose: true,
        }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Dialog Content</h2>
          <p>Drag the handlebar or click outside to close.</p>
        </div>
      </Dialog>
    </>
  );
}`,
  },
  {
    id: 'page-mode',
    name: 'PageMode',
    description:
      'Full-screen overlay panel with Zustand-powered state management. Supports multiple positions, sizes, and modal stacking with automatic z-index management.',
    api: [
      {
        name: 'position',
        type: "'top' | 'bottom' | 'left' | 'right'",
        description: 'Edge position of the overlay',
        default: "'bottom'",
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large' | 'full'",
        description: 'Size of the overlay (50vh/65vh/80vh/100vh)',
        default: "'large'",
      },
      {
        name: 'roundedEdges',
        type: 'boolean',
        description: 'Apply rounded corners based on position',
        default: 'false',
      },
      {
        name: 'themeable',
        type: 'boolean',
        description: 'Enable dark mode support',
        default: 'false',
      },
      {
        name: 'closeThreshold',
        type: 'number',
        description: 'Drag distance ratio (0-1) to trigger close',
        default: '0.5',
      },
      {
        name: 'enhancedCloseBox',
        type: 'boolean',
        description: 'Show visual indicator when drag exceeds threshold',
        default: 'true',
      },
      {
        name: 'enableContentScroll',
        type: 'boolean',
        description: 'Allow content scrolling within the panel',
        default: 'true',
      },
      {
        name: 'useContainer',
        type: 'boolean',
        description: 'Wrap content in a centered container',
        default: 'false',
      },
      {
        name: 'zIndex',
        type: 'number',
        description: 'Custom z-index (auto-managed by store)',
        default: '9999',
      },
      {
        name: 'resistance',
        type: 'DragResistanceConfig',
        description: 'Configure drag resistance physics',
        default: '-',
      },
      {
        name: 'backdropEffects',
        type: 'BackdropEffectsConfig',
        description: 'Backdrop blur and scale effects',
        default: '-',
      },
      {
        name: 'squashStretch',
        type: 'SquashStretchConfig',
        description: 'Squash-and-stretch animation config',
        default: '-',
      },
      {
        name: 'a11yOptions',
        type: 'A11yOptions',
        description: 'Accessibility configuration options',
        default: '-',
      },
    ],
    previewComponentCode: `
<div class="flex flex-col gap-4 p-6">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">PageMode Preview</h2>
  <p class="text-gray-600 dark:text-gray-400">
    Full-screen overlay with Zustand-powered state. Features include:
  </p>
  <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
    <li>Multiple positions (top/bottom/left/right)</li>
    <li>Size variants (small/medium/large/full)</li>
    <li>Modal stacking support</li>
    <li>Per-instance loading control</li>
    <li>Cross-modal triggers</li>
  </ul>
  <div class="flex flex-wrap gap-2 mt-4">
    <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm">Zustand</span>
    <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">HeadlessUI</span>
    <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">Framer Motion</span>
  </div>
</div>`,
    codeSnippet: `import { PageMode } from '@/app/playground/modal/components/PageMode';
import { useModals, usePageMode } from '@/app/playground/modal/components/stores/useModalStore';

function MyComponent() {
  const { openPageMode } = useModals();

  const handleOpen = () => {
    openPageMode(
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">PageMode Content</h2>
        <p>Drag the handlebar or click outside to close.</p>
      </div>,
      { position: 'bottom', size: 'large' }
    );
  };

  return (
    <>
      <button onClick={handleOpen}>
        Open PageMode
      </button>

      {/* PageMode renders globally via store */}
      <PageMode
        roundedEdges={true}
        themeable={true}
        closeThreshold={0.5}
        enhancedCloseBox={true}
        resistance={{
          enabled: true,
          threshold: 50,
          strength: 0.6,
          visualFeedback: true,
        }}
        backdropEffects={{
          blur: true,
          blurAmount: '8px',
          scale: true,
          scaleAmount: 0.98,
          backgroundOpacity: 0.3,
        }}
        squashStretch={{
          enabled: true,
          trigger: 'start',
          intensity: 0.03,
          duration: 150,
        }}
        a11yOptions={{
          enableFocusTrap: true,
          announceToScreenReader: true,
          escapeClose: true,
        }}
      />
    </>
  );
}`,
  },
  {
    id: 'modal-store',
    name: 'Modal Store',
    description:
      'Zustand-based unified modal store providing global state management, modal stacking, and cross-modal triggers without Context providers.',
    api: [
      {
        name: 'openDialog',
        type: '(content, options?) => void',
        description: 'Open a Dialog with content and options',
        default: '-',
      },
      {
        name: 'openPageMode',
        type: '(content, options?) => void',
        description: 'Open a PageMode with content and options',
        default: '-',
      },
      {
        name: 'closeAll',
        type: '() => void',
        description: 'Close all open modals at once',
        default: '-',
      },
      {
        name: 'getDialog',
        type: '() => ModalInstance | undefined',
        description: 'Get the current Dialog instance',
        default: '-',
      },
      {
        name: 'getPageMode',
        type: '() => ModalInstance | undefined',
        description: 'Get the current PageMode instance',
        default: '-',
      },
      {
        name: 'useDialog',
        type: '() => DialogState',
        description: 'Hook for Dialog-specific state',
        default: '-',
      },
      {
        name: 'usePageMode',
        type: '() => PageModeState',
        description: 'Hook for PageMode-specific state',
        default: '-',
      },
    ],
    previewComponentCode: `
<div class="flex flex-col gap-4 p-6">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Modal Store</h2>
  <p class="text-gray-600 dark:text-gray-400">
    Zustand-powered unified modal management with:
  </p>
  <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
    <li>Global state without Context providers</li>
    <li>Automatic z-index management</li>
    <li>Modal stacking support</li>
    <li>Per-instance loading control</li>
    <li>Cross-modal triggers</li>
    <li>Close all modals with one call</li>
  </ul>
  <div class="flex gap-2 mt-4">
    <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm">Zustand</span>
  </div>
</div>`,
    codeSnippet: `import { useModals, useDialog, usePageMode } from '@/app/playground/modal/components/stores/useModalStore';

function ModalController() {
  const { openDialog, openPageMode, closeAll } = useModals();

  // Open Dialog from anywhere
  const handleOpenDialog = () => {
    openDialog(
      <div className="p-6">
        <h2>Dialog Content</h2>
        <button onClick={() => openPageMode(
          <div>Nested PageMode!</div>,
          { position: 'bottom' }
        )}>
          Open PageMode from Dialog
        </button>
      </div>,
      { showFrom: 'top' }
    );
  };

  // Open PageMode from anywhere
  const handleOpenPageMode = () => {
    openPageMode(
      <div className="p-6">
        <h2>PageMode Content</h2>
        <button onClick={() => openDialog(
          <div>Nested Dialog!</div>,
          { showFrom: 'bottom' }
        )}>
          Open Dialog from PageMode
        </button>
      </div>,
      { position: 'bottom', size: 'large' }
    );
  };

  return (
    <div className="space-x-4">
      <button onClick={handleOpenDialog}>Open Dialog</button>
      <button onClick={handleOpenPageMode}>Open PageMode</button>
      <button onClick={closeAll}>Close All</button>
    </div>
  );
}`,
  },
  {
    id: 'shared-types',
    name: 'Shared Types',
    description:
      'TypeScript type definitions shared between Dialog and PageMode components including configuration interfaces for resistance, backdrop effects, squash-stretch, and accessibility.',
    api: [
      {
        name: 'Position',
        type: "'top' | 'bottom' | 'left' | 'right'",
        description: 'Modal position type',
        default: '-',
      },
      {
        name: 'A11yOptions',
        type: 'object',
        description: 'Accessibility configuration interface',
        default: '-',
      },
      {
        name: 'DragResistanceConfig',
        type: 'object',
        description: 'Drag resistance physics configuration',
        default: '-',
      },
      {
        name: 'BackdropEffectsConfig',
        type: 'object',
        description: 'Backdrop blur and scale effects config',
        default: '-',
      },
      {
        name: 'SquashStretchConfig',
        type: 'object',
        description: 'Squash-and-stretch animation config',
        default: '-',
      },
      {
        name: 'LoadingStateConfig',
        type: 'object',
        description: 'Loading state with shimmer effect config',
        default: '-',
      },
    ],
    previewComponentCode: `
<div class="flex flex-col gap-4 p-6">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Shared Types</h2>
  <p class="text-gray-600 dark:text-gray-400">
    TypeScript interfaces for modal configuration:
  </p>
  <div class="grid grid-cols-2 gap-3 mt-2">
    <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <code class="text-sm text-blue-600 dark:text-blue-400">Position</code>
    </div>
    <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <code class="text-sm text-blue-600 dark:text-blue-400">A11yOptions</code>
    </div>
    <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <code class="text-sm text-blue-600 dark:text-blue-400">DragResistanceConfig</code>
    </div>
    <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <code class="text-sm text-blue-600 dark:text-blue-400">BackdropEffectsConfig</code>
    </div>
    <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <code class="text-sm text-blue-600 dark:text-blue-400">SquashStretchConfig</code>
    </div>
    <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <code class="text-sm text-blue-600 dark:text-blue-400">LoadingStateConfig</code>
    </div>
  </div>
</div>`,
    codeSnippet: `// src/app/playground/modal/components/shared/types.ts

export type Position = 'top' | 'bottom' | 'left' | 'right';

export type A11yOptions = {
  escapeClose?: boolean;
  role?: 'dialog' | 'alertdialog';
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  handlebarAriaLabel?: string;
  lockScroll?: boolean;
  closeOnOutsideClick?: boolean;
  scrollable?: boolean;
  generateUniqueIds?: boolean;
  enableFocusTrap?: boolean;
  announceToScreenReader?: boolean;
};

export type DragResistanceConfig = {
  enabled?: boolean;
  threshold?: number;      // Distance in px before resistance
  strength?: number;       // 0-1, resistance force
  visualFeedback?: boolean; // Handle darkening/scaling
};

export type BackdropEffectsConfig = {
  blur?: boolean;
  blurAmount?: string;     // e.g., '8px'
  scale?: boolean;
  scaleAmount?: number;    // e.g., 0.98
  backgroundOpacity?: number; // 0-1
};

export type SquashStretchConfig = {
  enabled?: boolean;
  trigger?: 'start' | 'during' | 'both';
  intensity?: number;      // 0-1
  duration?: number;       // ms
};

export type LoadingStateConfig = {
  isLoading: boolean;
  message?: string;
  lockInteraction?: boolean;
  shimmerColor?: string;
  shimmerSpeed?: 'slow' | 'fast';
};`,
  },
];

/**
 * Static navigation links for the modal docs sidebar
 */
export const modalStaticLinks = [
  { label: 'Interactive Demo', path: '/playground/modal' },
  { label: 'Typography Docs', path: '/playground/typography' },
  {
    label: 'GitHub',
    path: 'https://github.com/devshittu/tahoe-ui/tree/main/src/app/playground/modal',
  },
];
