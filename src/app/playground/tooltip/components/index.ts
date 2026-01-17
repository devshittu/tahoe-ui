// src/app/playground/tooltip/components/index.ts

/**
 * Tooltip System - Contextual information with smart positioning
 *
 * Built with @floating-ui/react for reliable positioning.
 *
 * Features:
 * - Smart positioning with automatic flip/shift (via Floating UI)
 * - Multiple trigger modes (hover, focus, click, manual)
 * - Arrow pointer with proper positioning
 * - Escape key and click-outside dismissal
 * - No X button - natural dismissal only
 */

// Components
export { Tooltip } from './Tooltip';

// Types
export type {
  TooltipProps,
  TooltipConfig,
  TooltipTrigger,
  TooltipVariant,
  TooltipSize,
} from './types';

export {
  DEFAULT_TOOLTIP_CONFIG,
  TOOLTIP_VARIANT_STYLES,
  TOOLTIP_SIZE_STYLES,
} from './types';
