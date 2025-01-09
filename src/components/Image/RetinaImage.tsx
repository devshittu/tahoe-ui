import React, { forwardRef, CSSProperties } from 'react';
import NextImage, { StaticImageData } from 'next/image';

export type RetinaImageProps = {
  src: string | StaticImageData; // Might come from static import or string
  alt: string;
  width?: number;
  height?: number;
  retina?: boolean;
  className?: string;
  style?: CSSProperties;
};

const generateSrcSet = (originalSrc: string) => {
  const ext = originalSrc.substring(originalSrc.lastIndexOf('.'));
  const base = originalSrc.substring(0, originalSrc.lastIndexOf('.'));
  return `${base}${ext} 1x, ${base}@2x${ext} 2x, ${base}@3x${ext} 3x`;
};

const RetinaImage = forwardRef<HTMLDivElement, RetinaImageProps>(
  ({ src, alt, width, height, retina, className, style }, ref) => {
    const srcAsString = typeof src === 'string' ? src : ''; // Cast or default

    return (
      <div ref={ref} style={style} className={className}>
        <NextImage
          alt={alt}
          src={srcAsString}
          width={width}
          height={height}
          unoptimized // Allows custom <img> attrs
          // Pass custom srcSet if retina is true
          {...(retina && srcAsString
            ? { srcSet: generateSrcSet(srcAsString) }
            : {})}
        />
      </div>
    );
  },
);

RetinaImage.displayName = 'RetinaImage';
export default RetinaImage;
