'use client';
import React from 'react';
import { IconBlockScale, IconGrow } from './LoadingSplash';
import { SplashScreenProps } from './types';
import { TypingText, Heading } from '../Typography';

const responsiveWxHClasses =
  'w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64';

export const SplashScreen: React.FC<SplashScreenProps> = ({
  id = 'app-splash',
  config,
}) => {
  const {
    enableGrowingAnimation = true,
    animationDuration = '2.5s',
    animationEasing = 'cubic-bezier(.8,0,.3,1)',
    backgroundColor = 'bg-slate-50 dark:bg-slate-950',
    text,
    textColor = 'primary',
    logoImage,
    logoColor,
    colorPreset,
    svgIcon,
  } = config || {};

  return (
    <div
      className={`fixed inset-0 z-[9999] ${backgroundColor} w-full h-screen overflow-hidden`}
      id={`${id}-splash-loader`}
      aria-labelledby={`${id}-label`}
      aria-hidden="true"
      data-splash-state="open"
    >
      <div
        className={`relative left-1/2 top-1/2 ${responsiveWxHClasses}  -translate-x-1/2 -translate-y-1/2`}
      >
        {logoImage ? (
          <IconBlockScale
            logoImage={logoImage}
            logoColor={logoColor}
            colorPreset={colorPreset}
          />
        ) : svgIcon ? (
          <IconBlockScale
            svgIcon={svgIcon}
            logoColor={logoColor}
            colorPreset={colorPreset}
          />
        ) : (
          <IconBlockScale logoColor={logoColor} colorPreset={colorPreset} />
        )}

        {enableGrowingAnimation && (
          <IconGrow
            animationDuration={animationDuration}
            animationEasing={animationEasing}
            colorPreset={colorPreset}
          />
        )}

        {text && (
          <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-full max-w-xs text-center">
            <TypingText
              text={text}
              TypographyComponent={Heading}
              typographyProps={{
                level: 6,
                size: 'sm',
                weight: 'extrabold',
                color: textColor,
                align: 'center',
                margin: 'my-4',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;

// Path: src/components/SplashScreen/SplashScreen.tsx
