/**
 * @tahoe-ui/layout
 *
 * Layout primitives for the Tahoe UI design system.
 * Provides composable, type-safe layout components following the 8pt grid system.
 *
 * @packageDocumentation
 *
 * @example
 * ```tsx
 * import { Box, Flex, Grid, Stack, Center, Container, Section, Spacer, Divider } from '@tahoe-ui/layout';
 *
 * // Flexbox layout
 * <Flex gap="4" align="center">
 *   <Avatar />
 *   <Text>Username</Text>
 * </Flex>
 *
 * // CSS Grid layout
 * <Grid cols="3" gap="6">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 *
 * // Page layout
 * <Section bg="gray-50" py="xl">
 *   <Container size="lg">
 *     <Stack gap="8">
 *       <Heading>Title</Heading>
 *       <Paragraph>Content</Paragraph>
 *     </Stack>
 *   </Container>
 * </Section>
 * ```
 */

// Types
export * from './types';

// Box primitives
export {
  Box,
  type BoxProps,
  Flex,
  type FlexProps,
  Grid,
  type GridProps,
  Stack,
  type StackProps,
  type StackDirection,
  type StackAlign,
  type StackJustify,
  Center,
  type CenterProps,
  type CenterOwnProps,
  Spacer,
  type SpacerProps,
  type SpacerSize,
  type SpacerDirection,
  Divider,
  type DividerProps,
  type DividerOrientation,
  type DividerVariant,
  type DividerThickness,
  type DividerAlign,
  type DividerColor,
  type DividerSpacing,
} from './box';

// Container primitives
export {
  Container,
  type ContainerProps,
  type ContainerSize,
  type ContainerPadding,
  Section,
  type SectionProps,
  type SectionBackground,
  type SectionPadding,
} from './container';
