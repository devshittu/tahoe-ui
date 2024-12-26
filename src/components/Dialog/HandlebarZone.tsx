// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { DialogHandlebarPosition } from "./types";

// type HandlebarZoneProps = {
//   position: DialogHandlebarPosition;
//   onPointerDown: (e: React.PointerEvent) => void;
//   onClick: () => void;
//   isBeyondLimit: boolean;
// };

// export function HandlebarZone({
//   position,
//   onPointerDown,
//   onClick,
//   isBeyondLimit
// }: HandlebarZoneProps) {
//   let zoneClasses = "";
//   let lineClasses = "rounded-full bg-gray-300 dark:bg-gray-500";

//   switch (position) {
//     case "top":
//       zoneClasses = "w-full h-10 flex items-center justify-center absolute top-0 cursor-pointer";
//       lineClasses += " h-2 w-16 sm:w-12";
//       break;
//     case "bottom":
//       zoneClasses = "w-full h-10 flex items-center justify-center absolute bottom-0 cursor-pointer";
//       lineClasses += " h-2 w-16 sm:w-12";
//       break;
//     case "left":
//       zoneClasses = "h-full w-10 flex items-center justify-center absolute left-0 cursor-pointer";
//       lineClasses += " w-2 h-16 sm:h-12";
//       break;
//     case "right":
//       zoneClasses = "h-full w-10 flex items-center justify-center absolute right-0 cursor-pointer";
//       lineClasses += " w-2 h-16 sm:h-12";
//       break;
//   }

//   return (
//     <div
//       className={zoneClasses}
//       onPointerDown={onPointerDown}
//       onClick={onClick}
//       role="button"
//       tabIndex={0}
//     >
//       <motion.div
//         className={lineClasses}
//         animate={{ scale: isBeyondLimit ? 1.1 : 1, backgroundColor: isBeyondLimit ? "#4B5563" : undefined }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       />
//     </div>
//   );
// }

// src/components/Dialog/HandlebarZone.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { DialogHandlebarPosition } from "./types";

type HandlebarZoneProps = {
  position: DialogHandlebarPosition;
  onPointerDown: (e: React.PointerEvent) => void;
  onClick: () => void;
  isBeyondLimit: boolean;
};

export function HandlebarZone({
  position,
  onPointerDown,
  onClick,
  isBeyondLimit
}: HandlebarZoneProps) {
  let zoneClasses = "";
  let lineClasses = "rounded-full bg-gray-300 dark:bg-gray-500";

  switch (position) {
    case "top":
      zoneClasses = "w-full h-10 flex items-center justify-center absolute top-0 cursor-pointer";
      lineClasses += " h-2 w-16 sm:w-12";
      break;
    case "bottom":
      zoneClasses = "w-full h-10 flex items-center justify-center absolute bottom-0 cursor-pointer";
      lineClasses += " h-2 w-16 sm:w-12";
      break;
    case "left":
      zoneClasses = "h-full w-10 flex items-center justify-center absolute left-0 cursor-pointer";
      lineClasses += " w-2 h-16 sm:h-12";
      break;
    case "right":
      zoneClasses = "h-full w-10 flex items-center justify-center absolute right-0 cursor-pointer";
      lineClasses += " w-2 h-16 sm:h-12";
      break;
  }

  return (
    <div
      className={zoneClasses}
      onPointerDown={onPointerDown}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Drag handle to close"
    >
      <motion.div
        className={lineClasses}
        animate={{
          scale: isBeyondLimit ? 1.1 : 1,
          backgroundColor: isBeyondLimit ? "#4B5563" : undefined,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  );
}