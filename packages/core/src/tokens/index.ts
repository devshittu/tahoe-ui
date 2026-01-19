/**
 * Design Tokens Barrel Export
 *
 * Centralized design tokens for the Tahoe UI design system.
 * Import from '@tahoe-ui/core/tokens' for all token needs.
 *
 * Available token groups:
 * - SPACING_TOKENS: Touch targets, handlebar zones, z-index, padding, modal/dialog sizes
 * - MOTION_TOKENS: Duration, spring physics, easing curves, squash-stretch
 * - COLOR_TOKENS: Gray scale, brand colors, feedback colors, semantic aliases
 * - SHADOW_TOKENS: Elevation scale, inset shadows, focus rings, component shadows
 * - RADIUS_TOKENS: Border radius scale, component-specific radii
 * - INTERACTION_TOKENS: Hover, active, focus, disabled state patterns
 * - A11Y_TOKENS: Accessibility patterns, touch targets, focus rings, ARIA
 */

// Export all types and constants from each token file
export * from './spacing.tokens';
export * from './motion.tokens';
export * from './color.tokens';
export * from './shadow.tokens';
export * from './radius.tokens';
export * from './interaction.tokens';
export * from './a11y.tokens';

// Re-export commonly used token objects for convenience
export { SPACING_TOKENS } from './spacing.tokens';
export { MOTION_TOKENS } from './motion.tokens';
export { COLOR_TOKENS } from './color.tokens';
export { SHADOW_TOKENS } from './shadow.tokens';
export { RADIUS_TOKENS, getRadiusValue } from './radius.tokens';
export { INTERACTION_TOKENS } from './interaction.tokens';
export { A11Y_TOKENS } from './a11y.tokens';
