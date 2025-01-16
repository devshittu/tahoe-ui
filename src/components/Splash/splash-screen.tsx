// import React from 'react';
// import { SplashScreenProps } from './types';
// import { IconBlockScale, IconGrow } from './loading-splash';

// export const SplashScreen = ({ id = 'app-splash' }: SplashScreenProps) => {
//   return (
//     <>
//       <div
//         className={
//           'fixed inset-0 z-[9999] bg-slate-50 dark:bg-slate-950 w-full h-screen overflow-y-hidden'
//         }
//         id={`${id}-splash-loader`}
//         aria-labelledby={`${id}-label`}
//         aria-hidden="true"
//         data-splash-state={`'open'`}
//       >
//         <div
//           className={`block relative left-[50%] top-[50%] w-[100px] h-[100px] -mt-[50px] -ml-[50px]`}
//         >
//           <IconBlockScale />
//           <IconGrow />
//         </div>
//       </div>
//     </>
//   );
// };
// export default SplashScreen;

// // Path: src/components/SplashScreen/splash-screen.tsx

// src/components/SplashScreen/splash-screen.tsx
'use client';
import React from 'react';
import type { SplashScreenProps, SplashScreenConfig } from './types';
import { IconBlockScale, IconGrow } from './loading-splash';

export type CustomSplashScreenProps = SplashScreenProps & {
  config?: SplashScreenConfig;
};

export const SplashScreen: React.FC<CustomSplashScreenProps> = ({
  id = 'app-splash',
  config,
}) => {
  // Extract configuration values with defaults
  const {
    logoImage,
    logoColor = 'text-cyan-500',
    enableGrowingAnimation = true,
    animationDuration = '2.5s',
    animationEasing = 'cubic-bezier(.8,0,.3,1)',
    backgroundColor = 'bg-slate-50 dark:bg-slate-950',
  } = config || {};

  return (
    <div
      className={`fixed inset-0 z-[9999] ${backgroundColor} w-full h-screen overflow-y-hidden`}
      id={`${id}-splash-loader`}
      aria-labelledby={`${id}-label`}
      aria-hidden="true"
      data-splash-state="open"
    >
      <div className="relative left-1/2 top-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2">
        <IconBlockScale logoImage={logoImage} logoColor={logoColor} />
        {enableGrowingAnimation && (
          <IconGrow
            animationDuration={animationDuration}
            animationEasing={animationEasing}
          />
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
