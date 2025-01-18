'use client';
import React, { useMemo } from 'react';
import Icon from '../illustrations/Icon';
import { FiCommand } from 'react-icons/fi';
import BaseImage from '../Image/BaseImage';
import { twMerge } from 'tailwind-merge';
import { PaletteMap, SplashScreenConfig } from './types';
import clsx from 'clsx';

/**
 * A palette map based on the color presets from your Tailwind config.
 * Feel free to adjust these values to match your actual config.
 */
const paletteMap: PaletteMap = {
  cyan: {
    light: 'bg-cyan-200',
    dark: 'dark:bg-cyan-700',
  },
  blue: {
    light: 'bg-blue-200',
    dark: 'dark:bg-blue-700',
  },
  red: {
    light: 'bg-red-200',
    dark: 'dark:bg-red-700',
  },
  green: {
    light: 'bg-green-200',
    dark: 'dark:bg-green-700',
  },
  purple: {
    light: 'bg-purple-200',
    dark: 'dark:bg-purple-700',
  },
};

/** The base fields common to IconBlockScale. */
interface BaseIconBlockScaleProps {
  /** Tailwind text color class for the logo (e.g. "text-cyan-500"). */
  logoColor?: string;
  /** Color preset key or custom classes for the bounding background. */
  colorPreset?: keyof PaletteMap | string;
}

/**
 * When using an image for the logo, the logoImage prop is required.
 * The svgIcon must not be provided.
 */
interface ImageLogoProps extends BaseIconBlockScaleProps {
  logoImage: string;
  svgIcon?: never;
}

/**
 * When providing a custom SVG icon, the svgIcon prop is required.
 * The logoImage must not be provided.
 */
interface SvgLogoProps extends BaseIconBlockScaleProps {
  svgIcon: React.ReactNode;
  logoImage?: never;
}

/**
 * If neither image nor an explicit svgIcon is provided, the component will
 * render a default FiCommand icon.
 */
interface DefaultLogoProps extends BaseIconBlockScaleProps {
  logoImage?: undefined;
  svgIcon?: undefined;
}

/**
 * The union type that combines the three cases.
 * Consumers must either pass:
 * - An image URL (logoImage),
 * - A custom SVG (svgIcon), or
 * - Nothing (which will use the default icon).
 */
export type IconBlockScaleProps =
  | ImageLogoProps
  | SvgLogoProps
  | DefaultLogoProps;

export const IconBlockScale: React.FC<IconBlockScaleProps> = (props) => {
  const {
    logoImage,
    svgIcon,
    logoColor = 'text-cyan-500',
    colorPreset = 'cyan',
  } = props;

  // Resolve background colors based on the selected preset.
  const backgroundClasses = useMemo(() => {
    if (paletteMap[colorPreset]) {
      const preset = paletteMap[colorPreset];
      return twMerge(preset.light, preset.dark);
    }
    return ''; // Default to empty if no match.
  }, [colorPreset]);

  // Define responsive size classes.
  const responsiveClasses = useMemo(
    () =>
      'w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64',
    [],
  );

  // Combine classes for the container.
  const containerClasses = useMemo(
    () =>
      twMerge(
        clsx(
          'icon',
          'block',
          'p-4',
          'rounded-[20px]',
          'absolute',
          'top-1/2',
          'left-1/2',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'z-10',
        ),
        backgroundClasses,
        responsiveClasses,
      ),
    [backgroundClasses, responsiveClasses],
  );

  // The common styling to apply to the icon (default or provided).
  const commonIconClasses =
    'w-12 h-12 overflow-visible animate-loader-dash stroke-current';
  const commonIconStyle = { strokeDasharray: '0 129' };

  return (
    <div className={containerClasses}>
      <div className="flex justify-center items-center h-full">
        {logoImage ? (
          <BaseImage
            src={logoImage}
            alt="Splash Logo"
            fill
            priority
            className={clsx('w-full h-full object-contain', logoColor)}
          />
        ) : svgIcon ? (
          <Icon
            icon={React.cloneElement(svgIcon as React.ReactElement, {
              className: clsx(
                commonIconClasses,
                (svgIcon as React.ReactElement).props?.className,
              ),
              style: {
                ...commonIconStyle,
                ...(svgIcon as React.ReactElement).props?.style,
              },
            })}
          />
        ) : (
          <Icon
            icon={
              <FiCommand
                className={commonIconClasses}
                style={commonIconStyle}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

interface IconGrowProps {
  /** Animation duration (e.g. "2.5s"). Default is "2.5s". */
  animationDuration?: string;
  /** Animation timing function (e.g. "cubic-bezier(.8,0,.3,1)"). Default is "cubic-bezier(.8,0,.3,1)". */
  animationEasing?: string;
  /**
   * The color preset key from the palette map (e.g. "cyan", "blue", etc.),
   * or a custom string of Tailwind classes.
   * Default is "cyan".
   */
  colorPreset?: keyof PaletteMap | string;
  /**
   * Optionally override the default responsive sizing classes.
   * If not provided, the default sizes (based on lg) will be used.
   */
  customResponsiveClasses?: string;
}

export const IconGrow: React.FC<IconGrowProps> = ({
  animationDuration = '2.5s',
  animationEasing = 'cubic-bezier(.8,0,.3,1)',
  colorPreset = 'cyan',
  customResponsiveClasses,
}) => {
  // Resolve the background color classes using a palette map.
  const backgroundClasses = useMemo(() => {
    if (
      typeof colorPreset === 'string' &&
      paletteMap[colorPreset as keyof typeof paletteMap]
    ) {
      const preset = paletteMap[colorPreset as keyof typeof paletteMap];
      return twMerge(preset.light, preset.dark);
    }
    // Otherwise, assume a custom set of Tailwind classes and ensure it's a string.
    return String(colorPreset);
  }, [colorPreset]);

  // Define responsive size classes.
  const responsiveClasses = useMemo(() => {
    // Default responsive sizes:
    // Base (mobile): small size, sm: slightly larger, md: medium, lg: reference, xl and 2xl: larger.
    return (
      customResponsiveClasses ||
      'w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64'
    );
  }, [customResponsiveClasses]);

  // Combine default classes for positioning, shape, and animation.
  const combinedClasses = useMemo(() => {
    return twMerge(
      clsx(
        'icon',
        'block',
        'p-4',
        'rounded-[20px]',
        'absolute',
        'top-1/2',
        'left-1/2',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'icon_grow',
        'z-0',
        'animate-loader-grow',
      ),
      backgroundClasses,
      responsiveClasses,
    );
  }, [backgroundClasses, responsiveClasses]);

  return (
    <div
      className={combinedClasses}
      style={{
        animationDuration,
        animationTimingFunction: animationEasing,
      }}
    />
  );
};

// export default IconGrow;

export const LoadingSplash: React.FC = () => {
  return (
    <>
      <div className="flex h-96 justify-center items-center relative">
        <IconBlockScale />
        <IconGrow />
      </div>
    </>
  );
};
// src/components/SplashScreen/LoadingSplash.tsx
