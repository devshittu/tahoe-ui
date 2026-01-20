/**
 * Common Type Definitions
 *
 * Shared type definitions used across Tahoe UI components.
 */

/**
 * Standard size scale used across components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Standard color variants
 */
export type ColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Standard positions
 */
export type Position = 'top' | 'bottom' | 'left' | 'right';

/**
 * Standard alignment options
 */
export type Alignment = 'start' | 'center' | 'end';

/**
 * Standard orientation
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * Polymorphic component props helper
 */
export type AsProps<T extends React.ElementType> = {
  as?: T;
};

/**
 * Props that can be polymorphic
 */
export type PolymorphicProps<
  T extends React.ElementType,
  Props = object,
> = AsProps<T> &
  Props &
  Omit<React.ComponentPropsWithoutRef<T>, keyof (AsProps<T> & Props)>;

/**
 * Ref forwarding for polymorphic components
 */
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

/**
 * Component with ref for polymorphic components
 */
export type PolymorphicComponentWithRef<
  T extends React.ElementType,
  Props = object,
> = React.ForwardRefExoticComponent<
  PolymorphicProps<T, Props> & React.RefAttributes<Element>
>;

/**
 * Extract the element type from a component
 */
export type ElementOf<T> =
  T extends React.ElementType<infer P>
    ? P extends { ref?: React.Ref<infer E> }
      ? E
      : never
    : never;

/**
 * Make specific properties required
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific properties optional
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
 * Deep partial type
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Maybe type helper (nullable or undefined)
 */
export type Maybe<T> = T | null | undefined;
