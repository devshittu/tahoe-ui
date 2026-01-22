/**
 * @tahoe-ui/disclosure
 *
 * Disclosure components for the Tahoe UI design system.
 * Provides accessible accordion and collapsible patterns with smooth animations.
 *
 * @packageDocumentation
 *
 * @example
 * ```tsx
 * import {
 *   AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent
 * } from '@tahoe-ui/disclosure';
 *
 * // Single-select accordion
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
 *
 * // Multi-select accordion
 * <AccordionRoot type="multiple" variant="separated">
 *   <AccordionItem value="faq-1">
 *     <AccordionTrigger>FAQ Question 1</AccordionTrigger>
 *     <AccordionContent>Answer 1</AccordionContent>
 *   </AccordionItem>
 * </AccordionRoot>
 * ```
 */

// Accordion components
export {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  default as AccordionDefault,
} from './Accordion';

// Types
export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionType,
  AccordionVariant,
  AccordionSize,
} from './Accordion';
