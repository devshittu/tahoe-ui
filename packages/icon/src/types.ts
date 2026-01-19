import type { IconType } from 'react-icons';

/**
 * Icon size scale following 8pt grid
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const ICON_SIZES: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

/**
 * Icon color variants aligned with design tokens
 */
export type IconColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'inherit'
  | 'currentColor';

export const ICON_COLORS: Record<IconColor, string> = {
  default: 'text-gray-700 dark:text-gray-300',
  muted: 'text-gray-400 dark:text-gray-500',
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-amber-600 dark:text-amber-400',
  error: 'text-red-600 dark:text-red-400',
  info: 'text-blue-500 dark:text-blue-400',
  inherit: 'text-inherit',
  currentColor: 'text-current',
};

/**
 * Stroke weight options
 */
export type IconStroke = 'thin' | 'light' | 'regular' | 'medium' | 'bold';

export const ICON_STROKES: Record<IconStroke, number> = {
  thin: 1,
  light: 1.5,
  regular: 2,
  medium: 2.5,
  bold: 3,
};

/**
 * Semantic icon categories
 */
export type SemanticIconType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'close'
  | 'check'
  | 'chevronDown'
  | 'chevronUp'
  | 'chevronLeft'
  | 'chevronRight'
  | 'plus'
  | 'minus'
  | 'search'
  | 'menu'
  | 'user'
  | 'settings'
  | 'home'
  | 'edit'
  | 'delete'
  | 'copy'
  | 'loading'
  | 'external'
  | 'download'
  | 'upload';

/**
 * Icon component props
 */
export interface IconProps {
  /** The icon to render - can be a react-icons component or semantic name */
  icon: IconType | SemanticIconType;
  /** Size of the icon */
  size?: IconSize | number;
  /** Color variant */
  color?: IconColor;
  /** Stroke weight for outline icons */
  stroke?: IconStroke;
  /** Accessible label (required if icon is meaningful) */
  label?: string;
  /** Whether to hide from screen readers (decorative icon) */
  decorative?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether the icon should spin (for loading states) */
  spin?: boolean;
}

/**
 * Icon button props (icon with click action)
 */
export interface IconButtonProps extends Omit<IconProps, 'decorative'> {
  /** Accessible label (required for buttons) */
  label: string;
  /** Disabled state */
  disabled?: boolean;
  /** Button variant */
  variant?: 'default' | 'ghost' | 'outline';
}
