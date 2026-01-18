// src/app/playground/accordion/components/index.ts

/**
 * Accordion - Expandable content sections
 *
 * A vertically stacked set of interactive headings that
 * reveal or hide associated content panels.
 *
 * Features:
 * - Single or multiple expansion modes
 * - Three visual variants (default, bordered, separated)
 * - Three sizes
 * - Animated expand/collapse with spring physics
 * - Full keyboard navigation
 * - ARIA attributes for accessibility
 * - Controlled and uncontrolled modes
 * - Dark mode support
 *
 * @example
 * ```tsx
 * import {
 *   AccordionRoot,
 *   AccordionItem,
 *   AccordionTrigger,
 *   AccordionContent,
 * } from './components';
 *
 * <AccordionRoot type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Section 2</AccordionTrigger>
 *     <AccordionContent>Content for section 2</AccordionContent>
 *   </AccordionItem>
 * </AccordionRoot>
 * ```
 */

export {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionType,
  AccordionVariant,
  AccordionSize,
} from './types';

export { ACCORDION_SIZE_CONFIG, ACCORDION_VARIANT_CONFIG } from './types';
