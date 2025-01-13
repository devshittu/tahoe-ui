// src/components/SplashScreen/splash-config.ts
'use client';
import type React from 'react';

/** Frequency of displaying the splash screen. */
export type SplashFrequency = 'once-per-window' | 'once-per-session' | 'always';

/** Basic animation types for the splash container. */
export type SplashAnimation = 'grow' | 'fade' | 'slide' | 'spin';

export type SplashConfig = {
  /**
   * Unique ID for a11y and for DOM references.
   */
  id?: string;

  /**
   * If true, apply a dark/light theming via Tailwind classes (dark:bg-..., etc.).
   */
  themable?: boolean;

  /**
   * CSS or Tailwind classes to define background color(s).
   * e.g. "bg-slate-50 dark:bg-slate-950" or "bg-white"
   */
  backgroundColor?: string;

  /**
   * Container sizing, e.g. "w-[100px] h-[100px]" or "w-32 h-32".
   */
  containerSize?: string;

  /**
   * Container shape, e.g. "rounded-[20px]" or "rounded-full", or "rounded-md".
   */
  containerShape?: string;

  /**
   * Frequency to display the splash screen.
   */
  frequency?: SplashFrequency;

  /**
   * If we want a logo or icon (React node).
   * e.g. `<FaMoon className="text-4xl text-purple-500" />`
   */
  icon?: React.ReactNode;

  /**
   * Additional text or element to display under the icon.
   */
  message?: React.ReactNode;

  /**
   * Animation style of the container.
   * "grow" "fade" "slide" "spin" or your own expansions
   */
  animation?: SplashAnimation;

  /**
   * The display duration in ms before hiding.
   * e.g. 2000 => 2 seconds
   */
  displayDuration?: number;
};
