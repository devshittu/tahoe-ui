
// src/components/PageMode/HandlebarZone.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { PageModePosition } from "./PageMode";

type HandlebarZoneProps = {
  position: PageModePosition;
  onPointerDown: (event: React.PointerEvent) => void;
  onClick: () => void;
  ariaLabel?: string;
  isBeyondLimit?: boolean;
};

export function HandlebarZone({
  position,
  onPointerDown,
  onClick,
  ariaLabel,
  isBeyondLimit = false,
}: HandlebarZoneProps) {
  let handlebarZoneClasses = "";
  let handlebarLineClasses = "rounded-full";

  // Define handlebar zone and line based on position
  switch (position) {
    case "top":
      handlebarZoneClasses = "w-full h-12 flex items-center justify-center absolute bottom-0 cursor-pointer";
      handlebarLineClasses += " bg-gray-300 dark:bg-gray-500 h-3 w-16 sm:h-2 sm:w-12";
      break;
    case "bottom":
      handlebarZoneClasses = "w-full h-12 flex items-center justify-center absolute top-0 cursor-pointer";
      handlebarLineClasses += " bg-gray-300 dark:bg-gray-500 h-3 w-16 sm:h-2 sm:w-12";
      break;
    case "left":
      handlebarZoneClasses = "h-full w-12 flex items-center justify-center absolute right-0 cursor-pointer";
      handlebarLineClasses += " bg-gray-300 dark:bg-gray-500 w-3 h-16 sm:w-2 sm:h-12";
      break;
    case "right":
      handlebarZoneClasses = "h-full w-12 flex items-center justify-center absolute left-0 cursor-pointer";
      handlebarLineClasses += " bg-gray-300 dark:bg-gray-500 w-3 h-16 sm:w-2 sm:h-12";
      break;
    default:
      handlebarZoneClasses = "w-full h-12 flex items-center justify-center absolute top-0 cursor-pointer";
      handlebarLineClasses += " bg-gray-300 dark:bg-gray-500 h-3 w-16 sm:h-2 sm:w-12";
      break;
  }

  return (
    <div
      className={handlebarZoneClasses}
      onPointerDown={onPointerDown}
      onClick={onClick}
      role="button"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <motion.div
        className={handlebarLineClasses}
        animate={{
          scale: isBeyondLimit ? 1.1 : 1,
          backgroundColor: isBeyondLimit ? "#4B5563" : undefined, // Darken color when beyond limit
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  );
}
// src/components/PageMode/HandlebarZone.tsx