// src/app/playground/chip/components/index.ts

/**
 * Chip - Compact elements for categorization, filtering, and selection
 *
 * A versatile component for displaying tags, filters, selections,
 * and other compact information units.
 *
 * Features:
 * - Three visual variants (filled, outlined, subtle)
 * - Five semantic colors (default, primary, success, warning, error)
 * - Two sizes (sm, md)
 * - Optional leading icon
 * - Dismissible mode with callback
 * - Clickable/selectable mode
 * - Full keyboard support (Enter/Space to select, Delete to dismiss)
 * - Dark mode support
 *
 * @example
 * ```tsx
 * import { Chip } from './components';
 *
 * // Basic chip
 * <Chip>Label</Chip>
 *
 * // Dismissible tag
 * <Chip dismissible onDismiss={() => removeTag(id)}>
 *   React
 * </Chip>
 *
 * // Filter chips
 * {filters.map(filter => (
 *   <Chip
 *     key={filter.id}
 *     clickable
 *     selected={activeFilters.includes(filter.id)}
 *     onClick={() => toggleFilter(filter.id)}
 *   >
 *     {filter.label}
 *   </Chip>
 * ))}
 * ```
 */

export { Chip } from './Chip';
export type { ChipProps, ChipSize, ChipVariant, ChipColor } from './types';
export {
  CHIP_SIZE_CONFIG,
  CHIP_COLOR_CONFIG,
  CHIP_ANIMATION_CONFIG,
} from './types';
