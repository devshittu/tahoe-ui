// src/components/Typography/Image.tsx
'use client';

import React, { forwardRef, useState, useCallback, CSSProperties } from 'react';
import NextImage from 'next/image';
import clsx from 'clsx';

/** Fallback or error state placeholder — customize as needed */
const DefaultFallback = () => (
  <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
    <span>Failed to load image</span>
  </div>
);

type ImageVariant =
  | 'default'
  | 'rounded'
  | 'circle'
  | 'shadow'
  | 'caption'
  | 'card'
  | 'effects' // grayscale, blur on hover, etc.
  | 'custom';

type ImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  variant?: ImageVariant;
  caption?: string; // For 'caption' variant
  link?: string; // For 'card' or general usage
  grayscale?: boolean;
  blurOnHover?: boolean;
  retina?: boolean; // If true, we expect a srcSet or handle 2x automatically
  fallbackSrc?: string; // fallback image
  priority?: boolean;
  fill?: boolean;
  onLoad?: () => void;
  onError?: () => void;
};

/**
 * A versatile Next.js image component that supports:
 * - Rounded corners, circles
 * - Shadows, grayscale, blur on hover
 * - Captions (via <figure> / <figcaption>)
 * - Card layout with link
 * - Retina readiness (via srcSet or custom logic)
 */
const Image = forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      className = '',
      style,
      variant = 'default',
      caption,
      link,
      grayscale = false,
      blurOnHover = false,
      retina = false,
      fallbackSrc,
      priority = false,
      fill = false,
      onLoad,
      onError,
    },
    ref,
  ) => {
    const [hasError, setHasError] = useState(false);

    /** Convert width/height to safe numbers if they are numeric strings. */
    const parseSafeNumber = useCallback(
      (val: string | number | undefined): number | undefined => {
        if (typeof val === 'number') return val;
        if (val && !isNaN(Number(val))) return Number(val);
        return undefined;
      },
      [],
    );

    const safeWidth = parseSafeNumber(width);
    const safeHeight = parseSafeNumber(height);

    /** Common Tailwind classes for images. */
    const baseClasses = clsx(
      'h-auto', // keep ratio
      'max-w-full', // or user can override with w-{size}
      variant === 'rounded' && 'rounded-lg',
      variant === 'circle' && 'rounded-full',
      variant === 'shadow' && 'shadow-xl dark:shadow-gray-800',
      grayscale && 'filter grayscale hover:grayscale-0',
      blurOnHover && 'transition-all duration-300 filter blur-0 hover:blur-sm',
      className,
    );

    /** If retina is true, we encourage srcSet usage. Example usage:
        <Image
          src="/path/image-1.jpg"
          alt="desc"
          retina
          className=""
          ...
          // you'd also pass "srcSet" manually if desired:
        />
      For brevity, we assume user can add a custom 'srcSet' if needed.
    */

    /** Handle image load & error. */
    const handleLoad = () => {
      if (onLoad) onLoad();
    };

    const handleError = () => {
      if (onError) onError();
      setHasError(true);
      console.error(`Error loading image: ${src}`);
    };

    /** Render actual NextImage or fallback. */
    const imageContent =
      hasError && fallbackSrc ? (
        <NextImage
          src={fallbackSrc}
          alt="fallback"
          width={safeWidth}
          height={safeHeight}
          priority={priority}
          className={baseClasses}
          onLoad={handleLoad}
        />
      ) : hasError ? (
        <DefaultFallback />
      ) : (
        <NextImage
          src={src}
          alt={alt}
          width={safeWidth}
          height={safeHeight}
          priority={priority}
          onError={handleError}
          onLoad={handleLoad}
          className={baseClasses}
          style={style}
          fill={fill}
        />
      );

    /** If variant=caption, wrap in <figure> & <figcaption>. */
    if (variant === 'caption' && caption) {
      return (
        <figure
          className="max-w-lg mx-auto"
          style={{ textAlign: 'center' }}
          ref={ref}
        >
          {imageContent}
          <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {caption}
          </figcaption>
        </figure>
      );
    }

    /** If variant=card (or user sets link), wrap in <figure> with link & text overlay. */
    if (variant === 'card' || link) {
      return (
        <figure
          ref={ref}
          className={clsx(
            'relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0',
            className,
          )}
        >
          {link ? (
            <a href={link} aria-label={alt}>
              {imageContent}
            </a>
          ) : (
            imageContent
          )}
          {caption && (
            <figcaption className="absolute bottom-6 px-4 text-lg text-white">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    /** Otherwise, standard <div> wrapper to maintain a consistent usage pattern. */
    return (
      <div ref={ref} className="relative inline-block" style={style}>
        {imageContent}
      </div>
    );
  },
);

Image.displayName = 'Image';
export default Image;
