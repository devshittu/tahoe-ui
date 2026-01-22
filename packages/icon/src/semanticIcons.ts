import type { IconType } from 'react-icons';
import {
  FiCheck,
  FiX,
  FiAlertTriangle,
  FiAlertCircle,
  FiInfo,
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiMinus,
  FiSearch,
  FiMenu,
  FiUser,
  FiSettings,
  FiHome,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiLoader,
  FiExternalLink,
  FiDownload,
  FiUpload,
} from 'react-icons/fi';
import type { SemanticIconType } from './types';

/**
 * Semantic icon mappings to react-icons/fi (Feather icons)
 * Feather icons are recommended for their consistent 24px grid and 2px stroke
 */
export const SEMANTIC_ICONS: Record<SemanticIconType, IconType> = {
  success: FiCheck,
  error: FiX,
  warning: FiAlertTriangle,
  info: FiInfo,
  close: FiX,
  check: FiCheck,
  chevronDown: FiChevronDown,
  chevronUp: FiChevronUp,
  chevronLeft: FiChevronLeft,
  chevronRight: FiChevronRight,
  plus: FiPlus,
  minus: FiMinus,
  search: FiSearch,
  menu: FiMenu,
  user: FiUser,
  settings: FiSettings,
  home: FiHome,
  edit: FiEdit2,
  delete: FiTrash2,
  copy: FiCopy,
  loading: FiLoader,
  external: FiExternalLink,
  download: FiDownload,
  upload: FiUpload,
};

/**
 * Semantic color mappings for feedback icons (CSS variable-backed via @tahoe-ui/tailwind-preset)
 */
export const SEMANTIC_ICON_COLORS: Partial<Record<SemanticIconType, string>> = {
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-info',
};

/**
 * Check if a value is a semantic icon type
 */
export function isSemanticIcon(icon: unknown): icon is SemanticIconType {
  return typeof icon === 'string' && icon in SEMANTIC_ICONS;
}

/**
 * Get icon component from semantic name or return as-is
 */
export function resolveIcon(icon: IconType | SemanticIconType): IconType {
  if (isSemanticIcon(icon)) {
    return SEMANTIC_ICONS[icon];
  }
  return icon;
}
