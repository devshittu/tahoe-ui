/**
 * Layout Type System
 *
 * Comprehensive type definitions for the layout primitive components.
 * All spacing values follow the 8pt grid system per design-principles.md #4.
 *
 * Key principles:
 * - Consistent spacing values across all components
 * - Type-safe prop combinations
 * - Polymorphic component support
 * - Tailwind CSS class generation
 */

// ============================================================================
// Spacing Types
// ============================================================================

/**
 * Spacing values following 8pt grid system
 * Maps to Tailwind spacing scale
 */
export type SpacingValue =
  | '0'
  | '0.5' // 2px
  | '1' // 4px
  | '1.5' // 6px
  | '2' // 8px
  | '2.5' // 10px
  | '3' // 12px
  | '3.5' // 14px
  | '4' // 16px
  | '5' // 20px
  | '6' // 24px
  | '7' // 28px
  | '8' // 32px
  | '9' // 36px
  | '10' // 40px
  | '11' // 44px
  | '12' // 48px
  | '14' // 56px
  | '16' // 64px
  | '20' // 80px
  | '24' // 96px
  | '28' // 112px
  | '32' // 128px
  | '36' // 144px
  | '40' // 160px
  | '44' // 176px
  | '48' // 192px
  | '52' // 208px
  | '56' // 224px
  | '60' // 240px
  | '64' // 256px
  | '72' // 288px
  | '80' // 320px
  | '96'; // 384px

/**
 * Extended spacing for margins (includes 'auto')
 */
export type MarginValue = SpacingValue | 'auto';

// ============================================================================
// Sizing Types
// ============================================================================

/**
 * Width values - includes fractions, viewport units, and keywords
 */
export type WidthValue =
  | SpacingValue
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5'
  | '1/6'
  | '5/6'
  | '1/12'
  | '2/12'
  | '3/12'
  | '4/12'
  | '5/12'
  | '6/12'
  | '7/12'
  | '8/12'
  | '9/12'
  | '10/12'
  | '11/12'
  | 'full'
  | 'screen'
  | 'svw'
  | 'lvw'
  | 'dvw'
  | 'min'
  | 'max'
  | 'fit'
  | 'auto';

/**
 * Height values - includes viewport units and keywords
 */
export type HeightValue =
  | SpacingValue
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5'
  | '1/6'
  | '5/6'
  | 'full'
  | 'screen'
  | 'svh'
  | 'lvh'
  | 'dvh'
  | 'min'
  | 'max'
  | 'fit'
  | 'auto';

/**
 * Max-width presets following Tailwind defaults
 */
export type MaxWidthValue =
  | '0'
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full'
  | 'min'
  | 'max'
  | 'fit'
  | 'prose'
  | 'screen-sm'
  | 'screen-md'
  | 'screen-lg'
  | 'screen-xl'
  | 'screen-2xl';

/**
 * Min-width values
 */
export type MinWidthValue = '0' | 'full' | 'min' | 'max' | 'fit';

/**
 * Min-height values
 */
export type MinHeightValue =
  | '0'
  | 'full'
  | 'screen'
  | 'svh'
  | 'lvh'
  | 'dvh'
  | 'min'
  | 'max'
  | 'fit';

/**
 * Max-height values
 */
export type MaxHeightValue =
  | '0'
  | 'none'
  | 'full'
  | 'screen'
  | 'svh'
  | 'lvh'
  | 'dvh'
  | 'min'
  | 'max'
  | 'fit';

// ============================================================================
// Visual Types
// ============================================================================

/**
 * Border radius presets
 */
export type RadiusValue =
  | 'none'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full';

/**
 * Box shadow presets
 */
export type ShadowValue =
  | 'none'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'inner';

/**
 * Overflow behavior
 */
export type OverflowValue =
  | 'auto'
  | 'hidden'
  | 'clip'
  | 'visible'
  | 'scroll'
  | 'x-auto'
  | 'y-auto'
  | 'x-hidden'
  | 'y-hidden'
  | 'x-clip'
  | 'y-clip'
  | 'x-visible'
  | 'y-visible'
  | 'x-scroll'
  | 'y-scroll';

/**
 * CSS position values
 */
export type PositionValue =
  | 'static'
  | 'fixed'
  | 'absolute'
  | 'relative'
  | 'sticky';

/**
 * Z-index presets
 */
export type ZIndexValue =
  | '0'
  | '10'
  | '20'
  | '30'
  | '40'
  | '50'
  | 'auto';

// ============================================================================
// Flexbox Types
// ============================================================================

/**
 * Flex direction
 */
export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';

/**
 * Flex wrap behavior
 */
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap';

/**
 * Justify content (main axis alignment)
 */
export type JustifyContent =
  | 'normal'
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';

/**
 * Align items (cross axis alignment)
 */
export type AlignItems =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch';

/**
 * Align content (multi-line cross axis)
 */
export type AlignContent =
  | 'normal'
  | 'center'
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'baseline'
  | 'stretch';

/**
 * Align self (individual item)
 */
export type AlignSelf =
  | 'auto'
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'baseline';

/**
 * Flex grow/shrink
 */
export type FlexGrowShrink = '0' | '1';

/**
 * Flex basis values
 */
export type FlexBasis =
  | SpacingValue
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5'
  | '1/6'
  | '5/6'
  | '1/12'
  | '2/12'
  | '3/12'
  | '4/12'
  | '5/12'
  | '6/12'
  | '7/12'
  | '8/12'
  | '9/12'
  | '10/12'
  | '11/12'
  | 'auto'
  | 'full';

// ============================================================================
// Grid Types
// ============================================================================

/**
 * Grid template columns preset
 */
export type GridCols =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'none'
  | 'subgrid';

/**
 * Grid template rows preset
 */
export type GridRows =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'none'
  | 'subgrid';

/**
 * Grid column span
 */
export type GridColSpan =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'auto'
  | 'full';

/**
 * Grid column start/end
 */
export type GridColStartEnd =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | 'auto';

/**
 * Grid row span
 */
export type GridRowSpan =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'auto'
  | 'full';

/**
 * Grid row start/end
 */
export type GridRowStartEnd =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | 'auto';

/**
 * Grid auto flow
 */
export type GridAutoFlow = 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';

/**
 * Grid auto columns
 */
export type GridAutoCols = 'auto' | 'min' | 'max' | 'fr';

/**
 * Grid auto rows
 */
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr';

/**
 * Place content
 */
export type PlaceContent =
  | 'center'
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'baseline'
  | 'stretch';

/**
 * Place items
 */
export type PlaceItems =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch';

/**
 * Place self
 */
export type PlaceSelf =
  | 'auto'
  | 'start'
  | 'end'
  | 'center'
  | 'stretch';

/**
 * Gap values (shared between flex and grid)
 */
export type GapValue = SpacingValue;

// ============================================================================
// Composite Props Interfaces
// ============================================================================

/**
 * Base layout props shared by all layout primitives
 */
export interface BaseLayoutProps {
  // Padding
  p?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;

  // Margin
  m?: MarginValue;
  mx?: MarginValue;
  my?: MarginValue;
  mt?: MarginValue;
  mr?: MarginValue;
  mb?: MarginValue;
  ml?: MarginValue;

  // Dimensions
  w?: WidthValue;
  h?: HeightValue;
  minW?: MinWidthValue;
  maxW?: MaxWidthValue;
  minH?: MinHeightValue;
  maxH?: MaxHeightValue;

  // Visual
  rounded?: RadiusValue;
  shadow?: ShadowValue;
  bg?: string; // Tailwind color, e.g., 'gray-100'
  overflow?: OverflowValue;

  // Positioning
  position?: PositionValue;
  z?: ZIndexValue;
}

/**
 * Flex-specific props
 */
export interface FlexProps extends BaseLayoutProps {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justify?: JustifyContent;
  align?: AlignItems;
  alignContent?: AlignContent;
  gap?: GapValue;
  gapX?: GapValue;
  gapY?: GapValue;
  inline?: boolean;
}

/**
 * Grid-specific props
 */
export interface GridProps extends BaseLayoutProps {
  cols?: GridCols;
  rows?: GridRows;
  flow?: GridAutoFlow;
  autoCols?: GridAutoCols;
  autoRows?: GridAutoRows;
  gap?: GapValue;
  gapX?: GapValue;
  gapY?: GapValue;
  placeContent?: PlaceContent;
  placeItems?: PlaceItems;
  inline?: boolean;
}

/**
 * Grid item props (for children of Grid)
 */
export interface GridItemProps {
  colSpan?: GridColSpan;
  colStart?: GridColStartEnd;
  colEnd?: GridColStartEnd;
  rowSpan?: GridRowSpan;
  rowStart?: GridRowStartEnd;
  rowEnd?: GridRowStartEnd;
  placeSelf?: PlaceSelf;
}

/**
 * Flex item props (for children of Flex)
 */
export interface FlexItemProps {
  grow?: FlexGrowShrink;
  shrink?: FlexGrowShrink;
  basis?: FlexBasis;
  alignSelf?: AlignSelf;
  order?: number;
}
