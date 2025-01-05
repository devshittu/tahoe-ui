// 'use client';

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   useCallback,
//   ComponentPropsWithoutRef,
// } from 'react';
// import { motion, useAnimationControls, Variants } from 'framer-motion';
// import type { Easing } from 'framer-motion';
// import Text from './Text'; // Your existing base Text component
// import { twMerge } from 'tailwind-merge';

// /**
//  * Directions the marquee can move:
//  *  - "left": text slides left => hidden text on right becomes visible
//  *  - "right": text slides right => hidden text on left becomes visible
//  */
// export type MarqueeDirection = 'left' | 'right';

// /**
//  * Props for controlling the marquee behavior.
//  * Extends the base Text component’s props so it inherits
//  * all typography features like fontWeight, color, truncate, etc.
//  */
// export type MarqueeTextProps = ComponentPropsWithoutRef<typeof Text> & {
//   /**
//    * Speed factor (seconds). Lower => faster animation. Default: 10
//    */
//   speed?: number;
//   /**
//    * Direction of text slide: "left" or "right". Default: "left"
//    */
//   direction?: MarqueeDirection;
//   /**
//    * If true, the animation starts only on hover. Default: true
//    * (We also show a warning about CPU if set to false).
//    */
//   lazyHover?: boolean;
//   /**
//    * Number of loops before stopping. "infinite" or a finite number.
//    * Default: "infinite"
//    */
//   cycles?: number | 'infinite';
//   /**
//    * Easing function for transitions. Default: "linear"
//    */
//   easing?: Easing | 'linear';
//   /**
//    * Whether to flip logic for RTL languages. Default: false
//    */
//   rtl?: boolean;
//   /**
//    * If true, resets the marquee to start when mouse leaves. Default: true
//    */
//   resetOnMouseLeave?: boolean;
// };

// /**
//  * A marquee text component that truncates with "..." by default
//  * and animates horizontally when needed. By default, we only animate
//  * on hover (lazyHover=true). We also let the user choose to disable
//  * lazy hover, but we warn about increased CPU usage.
//  */
// export function MarqueeText({
//   speed = 10,
//   direction = 'left',
//   lazyHover = true, // default
//   cycles = 'infinite',
//   easing = 'linear',
//   rtl = false,
//   resetOnMouseLeave = true,
//   children,
//   className = '',
//   ...restTextProps
// }: MarqueeTextProps) {
//   // Outer container measuring overflow
//   const containerRef = useRef<HTMLSpanElement | null>(null);
//   const [isOverflowing, setIsOverflowing] = useState(false);
//   const [loopCount, setLoopCount] = useState(0);
//   const controls = useAnimationControls();

//   // Check if text is truncated (overflowing)
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const el = containerRef.current;
//     setIsOverflowing(el.scrollWidth > el.offsetWidth);
//   }, [children]);

//   // Warn if lazyHover is disabled
//   useEffect(() => {
//     if (!lazyHover) {
//       console.warn(
//         '[MarqueeText]: Setting lazyHover=false can significantly increase CPU/GPU usage, especially with 3000+ instances. Use with caution.',
//       );
//     }
//   }, [lazyHover]);

//   /**
//    * Determine the starting and ending X positions based on direction and RTL.
//    */
//   const fromX = rtl ? (direction === 'left' ? '100%' : '-100%') : '0%';
//   const toX = rtl
//     ? direction === 'left'
//       ? '0%'
//       : '100%'
//     : direction === 'left'
//       ? '-100%'
//       : '100%';

//   // Define marquee animation variants
//   const marqueeVariants: Variants = {
//     animate: {
//       x: [fromX, toX],
//       transition: {
//         x: {
//           repeat: cycles === 'infinite' ? Infinity : cycles,
//           repeatType: 'loop',
//           duration: speed,
//           ease: easing,
//           onRepeat: () => {
//             if (typeof cycles === 'number') {
//               setLoopCount((c) => c + 1);
//             }
//           },
//         },
//       },
//     },
//   };

//   // Start marquee on mouse enter if lazyHover and text is overflowing
//   const handleMouseEnter = useCallback(() => {
//     if (lazyHover && isOverflowing) {
//       // Reset position to start
//       controls.set({ x: 0 });
//       // Start animation
//       controls.start('animate');
//     }
//   }, [lazyHover, isOverflowing, controls]);

//   // Stop and reset marquee on mouse leave
//   const handleMouseLeave = useCallback(() => {
//     if (lazyHover && isOverflowing) {
//       // Stop animation
//       controls.stop();
//       // Reset position to start if resetOnMouseLeave is true
//       if (resetOnMouseLeave) {
//         controls.set({ x: 0 });
//       }
//       // Reset loop count if cycles is finite
//       if (typeof cycles === 'number') {
//         setLoopCount(0);
//       }
//     }
//   }, [lazyHover, isOverflowing, controls, resetOnMouseLeave, cycles]);

//   // Auto-start marquee if lazyHover is false and text is overflowing
//   useEffect(() => {
//     if (!lazyHover && isOverflowing) {
//       controls.set({ x: 0 });
//       controls.start('animate');
//     }
//   }, [lazyHover, isOverflowing, controls]);

//   // Stop animation if finite cycles are completed
//   useEffect(() => {
//     if (typeof cycles === 'number' && loopCount >= cycles) {
//       controls.stop();
//     }
//   }, [cycles, loopCount, controls]);

//   // Container classes: ensure truncation and prevent wrapping
//   const containerClasses = twMerge(
//     'relative inline-block overflow-hidden whitespace-nowrap truncate',
//     className,
//   );

//   return (
//     <span
//       ref={containerRef}
//       className={containerClasses}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {isOverflowing ? (
//         <motion.span
//           initial={{ x: 0 }}
//           animate={controls}
//           variants={marqueeVariants}
//           style={{ display: 'inline-block' }}
//         >
//           <Text {...restTextProps} className="inline">
//             {children}
//           </Text>
//         </motion.span>
//       ) : (
//         <Text {...restTextProps} className="inline">
//           {children}
//         </Text>
//       )}
//     </span>
//   );
// }

// src/components/Typography/MarqueeText.tsx
'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ComponentPropsWithoutRef,
} from 'react';
import { motion, useAnimationControls, Variants } from 'framer-motion';
import type { Easing } from 'framer-motion';
import Text from './Text'; // Your existing base Text component
import { twMerge } from 'tailwind-merge';

/**
 * Directions the marquee can move:
 *  - "left": text slides left => hidden text on right becomes visible
 *  - "right": text slides right => hidden text on left becomes visible
 */
export type MarqueeDirection = 'left' | 'right';

/**
 * Props for controlling the marquee behavior.
 * Extends the base Text component’s props so it inherits
 * all typography features like fontWeight, color, truncate, etc.
 */
export type MarqueeTextProps = ComponentPropsWithoutRef<typeof Text> & {
  /**
   * Speed factor (seconds). Lower => faster animation. Default: 10
   */
  speed?: number;
  /**
   * Direction of text slide: "left" or "right". Default: "left"
   */
  direction?: MarqueeDirection;
  /**
   * If true, the animation starts only on hover. Default: true
   * (We also show a warning about CPU if set to false).
   */
  lazyHover?: boolean;
  /**
   * Number of loops before stopping. "infinite" or a finite number.
   * Default: "infinite"
   */
  cycles?: number | 'infinite';
  /**
   * Easing function for transitions. Default: "linear"
   */
  easing?: Easing | 'linear';
  /**
   * Whether to flip logic for RTL languages. Default: false
   */
  rtl?: boolean;
  /**
   * If true, resets the marquee to start when mouse leaves. Default: true
   */
  resetOnMouseLeave?: boolean;
};

/**
 * A marquee text component that truncates with "..." by default
 * and animates horizontally when needed. By default, we only animate
 * on hover (lazyHover=true). We also let the user choose to disable
 * lazy hover, but we warn about potential CPU usage.
 */
export function MarqueeText({
  speed = 10,
  direction = 'left',
  lazyHover = true, // default
  cycles = 'infinite',
  easing = 'linear',
  rtl = false,
  resetOnMouseLeave = true,
  children,
  className = '',
  ...restTextProps
}: MarqueeTextProps) {
  // Outer container measuring overflow
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const controls = useAnimationControls();

  // Check if text is truncated (overflowing)
  // If scrollWidth > offsetWidth => text overflows => truncated with "..."
  const measureOverflow = useCallback(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    setIsOverflowing(el.scrollWidth > el.offsetWidth);
  }, []);

  useEffect(() => {
    measureOverflow();
  }, [children, measureOverflow]);

  // Warn if lazyHover is disabled
  useEffect(() => {
    if (!lazyHover) {
      console.warn(
        '[MarqueeText]: Setting lazyHover=false can significantly increase CPU/GPU usage, especially with 3000+ instances. Use with caution.',
      );
    }
  }, [lazyHover]);

  /**
   * Determine the starting and ending X positions based on direction and RTL.
   */
  const fromX = rtl ? (direction === 'left' ? '100%' : '-100%') : '0%';
  const toX = rtl
    ? direction === 'left'
      ? '0%'
      : '100%'
    : direction === 'left'
      ? '-100%'
      : '100%';

  // Define marquee animation variants
  const marqueeVariants: Variants = {
    animate: {
      x: [fromX, toX],
      transition: {
        x: {
          repeat: cycles === 'infinite' ? Infinity : cycles,
          repeatType: 'loop',
          duration: speed,
          ease: easing,
          onRepeat: () => {
            if (typeof cycles === 'number') {
              setLoopCount((c) => c + 1);
            }
          },
        },
      },
    },
  };

  // Start marquee on mouse enter if lazyHover and text is overflowing
  const handleMouseEnter = useCallback(() => {
    if (lazyHover && isOverflowing) {
      // Reset position to start
      controls.set({ x: 0 });
      // Start animation
      controls.start('animate');
    }
  }, [lazyHover, isOverflowing, controls]);

  // Stop and reset marquee on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (lazyHover && isOverflowing) {
      // Stop animation
      controls.stop();
      // Reset position to start if resetOnMouseLeave is true
      if (resetOnMouseLeave) {
        controls.set({ x: 0 });
      }
      // Reset loop count if cycles is finite
      if (typeof cycles === 'number') {
        setLoopCount(0);
      }
      // Re-check overflow => ensure ellipsis is visible again
      measureOverflow();
    }
  }, [
    lazyHover,
    isOverflowing,
    controls,
    resetOnMouseLeave,
    cycles,
    measureOverflow,
  ]);

  // Auto-start marquee if lazyHover=false and text is overflowing
  useEffect(() => {
    if (!lazyHover && isOverflowing) {
      controls.set({ x: 0 });
      controls.start('animate');
    }
  }, [lazyHover, isOverflowing, controls]);

  // Stop animation if finite cycles are completed
  useEffect(() => {
    if (typeof cycles === 'number' && loopCount >= cycles) {
      controls.stop();
    }
  }, [cycles, loopCount, controls]);

  // Container classes: ensure truncation and prevent wrapping
  const containerClasses = twMerge(
    'relative inline-block overflow-hidden whitespace-nowrap truncate',
    className,
  );

  return (
    <span
      ref={containerRef}
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isOverflowing ? (
        <motion.span
          initial={{ x: 0 }}
          animate={controls}
          variants={marqueeVariants}
          style={{ display: 'inline-block' }}
        >
          <Text {...restTextProps} className="inline">
            {children}
          </Text>
        </motion.span>
      ) : (
        <Text {...restTextProps} className="inline">
          {children}
        </Text>
      )}
    </span>
  );
}
// src/components/Typography/MarqueeText.tsx
