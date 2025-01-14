'use client';
import React from 'react';
import { useSplashStore } from './store/splash-store';
import { twMerge } from 'tailwind-merge';
import { IconBlockScale, IconGrow } from './loading-splash';
// import { IconBlockScale, IconGrow } from './loading-splash'; // your fallback shapes

export type SplashScreenProps = {
  /** If you want to override the store logic, do so, or read from the store by default. */
  id?: string;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ id }) => {
  const { config } = useSplashStore();
  const {
    backgroundColor,
    themable,
    containerSize,
    containerShape,
    icon,
    message,
    animation,
  } = config;

  const finalId = id ?? config.id ?? 'app-splash';

  // Build container classes
  const overlayClasses = twMerge(
    // 'fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center transition-colors duration-300',
    'fixed inset-0 z-[9999] overflow-hidden w-full h-screen overflow-y-hidden flexx items-center justify-center transition-colors duration-300',
    themable ? '' : '', // If you prefer a "dark:" approach, do so
    backgroundColor, // e.g. "bg-slate-50 dark:bg-slate-950"
  );

  // Container for the icon, e.g. "w-[100px] h-[100px]" + "rounded-[20px]" + animation
  let animationClass = '';
  switch (animation) {
    case 'grow':
      animationClass = 'animate-loader-grow';
      break;
    case 'fade':
      animationClass = 'animate-fade-in';
      break;
    case 'slide':
      animationClass = 'animate-loader-slide'; // define in tailwind config
      break;
    case 'spin':
      animationClass = 'animate-spin'; // built-in
      break;
    default:
      // fallback or no animation
      animationClass = '';
      break;
  }

  return (
    <div
      id={`${finalId}-splash-loader`}
      aria-hidden="true"
      data-splash-state="open"
      className={overlayClasses}
    >
      <div
        className={twMerge(
          // 'relative transition-transform duration-300',
          'block relative left-[50%] top-[50%]  -mt-[50px] -ml-[50px] transition-transform duration-300',
          containerSize ?? 'w-[100px] h-[100px]',
          containerShape ?? 'rounded-[20px]',
          animationClass,
        )}
      >
        {icon ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            {icon}
            {message && (
              <div className="mt-2 text-center text-gray-700 dark:text-gray-300 text-sm">
                {message}
              </div>
            )}
          </div>
        ) : (
          // fallback

          <>
            <IconBlockScale />
            <IconGrow />
          </>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;

// src/components/Splash/splash-screen.tsx
