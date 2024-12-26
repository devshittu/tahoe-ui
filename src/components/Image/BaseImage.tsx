// src/components/Image/BaseImage.tsx
'use client';

import React, {
  forwardRef,
  useState,
  useCallback,
  ReactNode,
  CSSProperties,
} from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import clsx from 'clsx';
import { motion, AnimatePresence, Variants } from 'framer-motion';

/** Basic shape presets */
type ImageShape =
  | 'none'        // no special rounding or clipping
  | 'rounded'     // standard rounded corners
  | 'circle'      // fully rounded
  | 'polygon'     // example: diamond or hex, or user can override
  | 'custom';     // completely user-defined clip-path

/** Basic theme presets for container styling */
type ImageTheme = 'light' | 'dark' | 'custom';

/** A set of optional visual effects toggles */
type ImageEffects = {
  /** Apply grayscale filter, removing grayscale on hover? */
  grayscale?: boolean;
  /** Slight blur on hover */
  blurOnHover?: boolean;
  /** Animate transitions: e.g., fade, scale, or transform. */
  transition?: boolean;
  /** Additional or custom effects, e.g. brightness, saturate */
  custom?: string;
};

/** Minimal fallback item for error states */
type ImageFallback = {
  /** If src fails, fallback to fallbackSrc instead of a default error element */
  fallbackSrc?: string;
  /** Provide a custom JSX fallback node for advanced error states */
  fallbackNode?: ReactNode;
};

/** Framer Motion integration to animate container */
type ImageAnimation = {
  /** Custom motion variants */
  variants?: Variants;
  /** Animate presence on mount/unmount */
  animatePresence?: boolean;
};

/**
 * The core props for our BaseImage.
 * We omit onError / onLoad from Next.js because we'll handle them ourselves.
 */
export type BaseImageProps = Omit<NextImageProps, 'onError' | 'onLoad'> & {
  /** Container className for styling around the <Image> */
  containerClassName?: string;
  /** Container style for inline styling */
  containerStyle?: CSSProperties;
  /** The shape/clipping style to apply. */
  shape?: ImageShape;
  /** The theme for the container. */
  theme?: ImageTheme;
  /** Visual effect toggles (grayscale, blur, transitions, etc.) */
  effects?: ImageEffects;
  /** Fallback logic in case the primary src fails */
  fallback?: ImageFallback;
  /** (Optional) integration with Framer Motion for container */
  animation?: ImageAnimation;
};

const BaseImage = forwardRef<HTMLDivElement, BaseImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fill = false,
      priority = false,
      containerClassName = '',
      containerStyle,
      shape = 'none',
      theme = 'custom',
      effects,
      fallback,
      animation,
      className, // className for the actual <Image> itself
      ...rest
    },
    ref
  ) => {
    // Tracks if the main src has failed
    const [hasError, setHasError] = useState(false);

    /** Convert numeric strings for width/height to numbers if feasible */
    const parseDimension = useCallback((val: number | string | undefined) => {
      if (typeof val === 'number') return val;
      const parsed = Number(val);
      return Number.isNaN(parsed) ? undefined : parsed;
    }, []);

    const safeWidth = parseDimension(width);
    const safeHeight = parseDimension(height);

    /** On error, attempt fallback or show default error */
    const handleError = () => {
      setHasError(true);
      console.error(`BaseImage: failed to load image: ${src}`);
    };

    /** 1) Container: handle shape, theme, and effects */
    const shapeClasses = {
      none: '',
      rounded: 'rounded-lg',
      circle: 'rounded-full',
      polygon: 'clip-path-[polygon(50%_0%,100%_50%,50%_100%,0%_50%)]', // diamond shape
      custom: '', // user overrides with containerClassName
    };

    const themeClasses = {
      light: 'bg-white text-black',
      dark: 'bg-gray-900 text-white',
      custom: '',
    };

    const effectClasses = clsx(
      effects?.grayscale && 'filter grayscale hover:grayscale-0',
      effects?.blurOnHover && 'hover:blur-sm',
      effects?.transition && 'transition-all duration-300',
      effects?.custom
    );

    // Combine everything into the container's classes
    const containerClasses = clsx(
      'relative inline-block', // base container
      shapeClasses[shape],
      themeClasses[theme],
      effectClasses,
      containerClassName
    );

    /** 2) Determine what image or fallback to show */
    let imageElement: ReactNode;

    if (!hasError) {
      // Show the main Next.js image
      imageElement = (
        <NextImage
          src={src}
          alt={alt}
          width={safeWidth}
          height={safeHeight}
          fill={fill}
          priority={priority}
          className={clsx('object-cover h-auto w-auto max-w-full', className)}
          onError={handleError}
          {...rest}
        />
      );
    } else if (fallback?.fallbackSrc) {
      // Show fallback image
      imageElement = (
        <NextImage
          src={fallback.fallbackSrc}
          alt="fallback"
          width={safeWidth}
          height={safeHeight}
          fill={fill}
          priority={priority}
          className={clsx('object-contain h-auto w-auto max-w-full', className)}
          {...rest}
        />
      );
    } else if (fallback?.fallbackNode) {
      // Show custom fallback node
      imageElement = fallback.fallbackNode;
    } else {
      // Default error container
      imageElement = (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-600">
          <span>Image failed to load.</span>
        </div>
      );
    }

    /** 3) If there's animation, wrap container in AnimatePresence & motion.div */
    if (animation?.variants || animation?.animatePresence) {
      const defaultVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      };

      return (
        <AnimatePresence>
          <motion.div
            ref={ref}
            style={containerStyle}
            className={containerClasses}
            variants={animation.variants || defaultVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {imageElement}
          </motion.div>
        </AnimatePresence>
      );
    }

    /** 4) No animation => standard container */
    return (
      <div ref={ref} className={containerClasses} style={containerStyle}>
        {imageElement}
      </div>
    );
  }
);

BaseImage.displayName = 'BaseImage';
export default BaseImage;