/**
 * @tahoe-ui/icon
 *
 * Icon component with semantic mappings and react-icons integration.
 *
 * Features:
 * - Size scale: xs (12px) to 2xl (48px)
 * - Semantic icons: 'success', 'error', 'warning', 'info', etc.
 * - Color variants aligned with design tokens
 * - Stroke weight control for outline icons
 * - Spin animation for loading states
 * - Full accessibility support
 * - Works with any react-icons icon
 */

// Component
export { Icon } from './Icon';

// Semantic Icons
export {
  SEMANTIC_ICONS,
  SEMANTIC_ICON_COLORS,
  isSemanticIcon,
  resolveIcon,
} from './semanticIcons';

// Constants
export { ICON_SIZES, ICON_COLORS, ICON_STROKES } from './types';

// Types
export type {
  IconProps,
  IconButtonProps,
  IconSize,
  IconColor,
  IconStroke,
  SemanticIconType,
} from './types';
