import React, { MutableRefObject, CSSProperties, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type MotionDivProps = Omit<HTMLMotionProps<"div">, "onAnimationStart"> & {
  ref?: MutableRefObject<HTMLDivElement | null>;
  tabIndex?: number;
  style?: CSSProperties;
  className?: string;
  onAnimationStart?: (definition: string) => void; // Corrected type for framer-motion
};

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>((props, ref) => {
  return <motion.div {...props} ref={ref} />;
});

MotionDiv.displayName = "MotionDiv";

export default MotionDiv;