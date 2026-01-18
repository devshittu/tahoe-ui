// src/app/playground/segmented-control/components/index.ts

/**
 * SegmentedControl - Apple-style grouped toggle buttons
 *
 * A compact, inline control for mutually exclusive selections.
 * Perfect for view switchers, filters, and mode toggles.
 *
 * Features:
 * - Spring-animated sliding indicator
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - ARIA radiogroup semantics
 * - Three sizes (sm, md, lg)
 * - Optional icons per segment
 * - Individual segment disable
 * - Form-compatible with hidden input
 * - Dark mode support
 *
 * @example
 * ```tsx
 * import { SegmentedControl } from './components';
 *
 * function ViewToggle() {
 *   const [view, setView] = useState<'list' | 'grid'>('list');
 *
 *   return (
 *     <SegmentedControl
 *       options={[
 *         { value: 'list', label: 'List' },
 *         { value: 'grid', label: 'Grid' },
 *       ]}
 *       value={view}
 *       onChange={setView}
 *     />
 *   );
 * }
 * ```
 */

export { SegmentedControl } from './SegmentedControl';
export { Segment } from './Segment';
export type {
  SegmentedControlProps,
  SegmentedControlSize,
  SegmentOption,
  SegmentProps,
} from './types';
export { SEGMENT_SIZE_CONFIG, SEGMENT_ANIMATION_CONFIG } from './types';
