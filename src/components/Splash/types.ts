export type SplashScreenProps = {
  id?: string;
};

export type SplashScreenConfig = {
  /** URL of a custom logo image.
   *  If not provided, the default Icon is used.
   */
  logoImage?: string;
  /** Tailwind text color class for the logo (e.g. "text-cyan-500").
   *  Defaults to existing color.
   */
  logoColor?: string;
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
  backgroundColor?: string;
};

// src/components/SplashScreen/types.ts
