"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import FocusLock from "react-focus-lock";
import { Portal } from "./Portal";
import { useUIManager } from "../UIManager/uiStore";
import { twMerge } from "tailwind-merge";
import { CardStack } from "@/components/background/CardStack";
import { trackPageModeEvent } from "@/components/analytics/analytics";
import { t } from "@/app/i18n";
import { usePageModeConfig } from "./usePageModeConfig";
import { HandlebarZone } from "./HandlebarZone";
import { v4 as uuidv4 } from "uuid";
import { useUIComponent } from "@/stores/useUIComponent";

export type PageModePosition = "top" | "bottom" | "left" | "right";

export type A11yOptions = {
  escapeClose?: boolean;
  role?: "dialog" | "alertdialog";
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaModal?: boolean;
  handlebarAriaLabel?: string;
  lockScroll?: boolean;
  closeOnOutsideClick?: boolean;
};

type PageModeProps = {
  position?: PageModePosition;
  a11yOptions?: A11yOptions;
  useContainer?: boolean;
  roundedEdges?: boolean;
  themeable?: boolean;
  closeThreshold?: number;
  enhancedCloseBox?: boolean;
};

export function PageMode({
  position = "bottom",
  a11yOptions = {},
  useContainer = false,
  roundedEdges = false,
  themeable = false,
  closeThreshold = 0.5,
  enhancedCloseBox = true,
}: PageModeProps) {
  const {
    escapeClose = true,
    role = "dialog",
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaModal = true,
    handlebarAriaLabel,
    lockScroll = false,
    closeOnOutsideClick = true,
  } = a11yOptions;

  const { isOpen, isClosing, content, close } = useUIComponent();
  const dragControls = useDragControls();
  const [showCloseZone, setShowCloseZone] = useState(false);
  const [isBeyondLimit, setIsBeyondLimit] = useState(false);

  const { variants, dragDirection, dragConstraints, dragElastic, layoutStyles } = usePageModeConfig(position);
  const normalizedCloseThreshold = Math.min(Math.max(closeThreshold, 0), 1);

  const componentId = useRef(uuidv4());
  const register = useUIManager((s) => s.register);
  const unregister = useUIManager((s) => s.unregister);

  useEffect(() => {
    if (isOpen) {
      register({ id: componentId.current, onEscape: escapeClose ? close : undefined });
      trackPageModeEvent("PageModeOpened");
    }
    return () => {
      unregister(componentId.current);
      if (isOpen && isClosing) trackPageModeEvent("PageModeClosed");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
  }, [isOpen, isClosing, close, escapeClose]);

  useEffect(() => {
    if (isOpen && lockScroll) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isOpen, lockScroll]);

  const handleDragEnd = (_e: PointerEvent, info: { offset: { x: number; y: number } }) => {
    const { x, y } = info.offset;
    if (position === "bottom" && y > window.innerHeight * normalizedCloseThreshold) close();
    if (position === "top" && -y > window.innerHeight * normalizedCloseThreshold) close();
    if (position === "left" && -x > window.innerWidth * normalizedCloseThreshold) close();
    if (position === "right" && x > window.innerWidth * normalizedCloseThreshold) close();
    setShowCloseZone(false);
    setIsBeyondLimit(false);
  };

  const handleDrag = (_e: PointerEvent, info: { offset: { x: number; y: number } }) => {
    const { x, y } = info.offset;
    let inCloseZone = false;

    if (position === "bottom" && y > window.innerHeight * normalizedCloseThreshold) inCloseZone = true;
    if (position === "top" && -y > window.innerHeight * normalizedCloseThreshold) inCloseZone = true;
    if (position === "left" && -x > window.innerWidth * normalizedCloseThreshold) inCloseZone = true;
    if (position === "right" && x > window.innerWidth * normalizedCloseThreshold) inCloseZone = true;
    setShowCloseZone(inCloseZone);

    let beyondLimit = false;
    if (position === "bottom" && y < 0) beyondLimit = true;
    if (position === "top" && y > 0) beyondLimit = true;
    if (position === "left" && x > 0) beyondLimit = true;
    if (position === "right" && x < 0) beyondLimit = true;
    setIsBeyondLimit(beyondLimit);
  };

  const handleHandlebarClick = () => close();
  const onHandlebarPointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    dragControls.start(event);
  };

  function getRoundedClasses(pos: PageModePosition) {
    switch (pos) {
      case "bottom": return "rounded-t-xl sm:rounded-t-2xl";
      case "top": return "rounded-b-xl sm:rounded-b-2xl";
      case "left": return "rounded-r-xl sm:rounded-r-2xl";
      case "right": return "rounded-l-xl sm:rounded-l-2xl";
      default: return "";
    }
  }

  const containerClasses = twMerge(
    "fixed z-[9999] flex flex-col h-full will-change-transform shadow-xl",
    roundedEdges && getRoundedClasses(position),
    themeable ? "dark:bg-gray-800 bg-white" : "bg-white"
  );

  const dialogProps: React.HTMLAttributes<HTMLDivElement> = {
    role,
    "aria-modal": ariaModal ? "true" : undefined,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
  };

  // For top/bottom => vertical scroll, left/right => hidden
  let contentOverflow = "overflow-hidden";
  if (position === "top" || position === "bottom") {
    contentOverflow = "overflow-y-auto";
  }

  // Minimal margin to avoid overlapping handlebar
  let marginClass = "";
  if (position === "bottom") marginClass = "mt-12";
  else if (position === "top") marginClass = "mb-12";

  // If user wants container layout
  const renderedContent = useContainer ? (
    <div className="container mx-auto h-full">{content}</div>
  ) : (
    content
  );

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
              {...(closeOnOutsideClick ? { onClick: close } : {})}
            >
              <CardStack />
            </motion.div>

            {showCloseZone && enhancedCloseBox && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-[10000] pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                aria-live="assertive"
              >
                <motion.div
                  className="border-4 border-dashed border-blue-400 p-6 text-blue-600 dark:text-blue-400 bg-white/90 dark:bg-gray-700/90 rounded-lg shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {t("releaseToClose")}
                </motion.div>
              </motion.div>
            )}

            <FocusLock autoFocus returnFocus>
              <motion.div
                {...dialogProps}
                className={containerClasses}
                style={layoutStyles}
                custom={position}
                variants={variants}
                initial="hidden"
                animate={isClosing ? "exit" : "visible"}
                exit="exit"
                drag={dragDirection}
                dragControls={dragControls}
                dragListener={false}
                dragElastic={dragElastic}
                dragConstraints={dragConstraints}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
              >
                <HandlebarZone
                  position={position}
                  onPointerDown={onHandlebarPointerDown}
                  onClick={handleHandlebarClick}
                  isBeyondLimit={isBeyondLimit}
                />

                <div
                  className={twMerge(
                    "flex-1 p-4",
                    contentOverflow,
                    marginClass
                  )}
                >
                  {renderedContent}
                </div>
              </motion.div>
            </FocusLock>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}