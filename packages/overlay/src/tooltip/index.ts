/**
 * Tooltip System - Contextual information with CSS-based positioning
 *
 * Built with HeadlessUI Popover + Framer Motion.
 *
 * Features:
 * - 12 placement options with CSS positioning
 * - Multiple trigger modes (hover, focus, click, manual)
 * - Arrow pointer with proper positioning
 * - Escape key and click-outside dismissal
 * - Full accessibility (ARIA attributes)
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
  TooltipPlacement,
} from './types';

export {
  DEFAULT_TOOLTIP_CONFIG,
  TOOLTIP_VARIANT_STYLES,
  TOOLTIP_SIZE_STYLES,
  PLACEMENT_CLASSES,
  ARROW_CLASSES,
  ARROW_COLORS,
} from './types';
