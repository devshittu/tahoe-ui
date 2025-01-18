import { IconBlockScaleProps } from './LoadingSplash';

export type SplashScreenProps = {
  id?: string;
  config?: SplashScreenConfig;
};

export type TailwindColor =
  | 'blue'
  | 'red'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'cyan'
  | 'indigo';

/** Palette map type defining light and dark color classes */
export type PaletteMap = {
  [key: string]: {
    light: string; // Tailwind class for the light mode background
    dark: string; // Tailwind class for the dark mode background
  };
};

export type SplashScreenConfig = {
  /** Flag to enable/disable the animated growing background box.
   *  Defaults to true.
   */
  enableGrowingAnimation?: boolean;
  /** Custom animation duration for the growing box (e.g. "2.5s").
   *  Defaults to the original animation duration.
   */
  animationDuration?: string;
  /** Custom animation easing for the growing box (e.g. "cubic-bezier(.8, 0, .3, 1)").
   *  Defaults to the original easing.
   */
  animationEasing?: string;
  /** Tailwind background color class for the splash screen container.
   *  Defaults to "bg-slate-50 dark:bg-slate-950".
   */
  backgroundColor?: TailwindColor | string;

  text?: string; // Optional text to display in the splash screen
  textColor?: 'primary' | 'secondary' | 'accent' | string; // Optional text color

  colorPreset?: keyof PaletteMap | string; // Color preset or custom classes
} & IconBlockScaleProps; // Includes logoImage, svgIcon, logoColor, and colorPreset.;

// src/components/SplashScreen/types.ts
