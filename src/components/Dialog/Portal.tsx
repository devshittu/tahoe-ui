// src/components/DialogBox/Portal.tsx
"use client";

import React from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
};

export function Portal({ children }: PortalProps) {
  if (typeof window === "undefined") return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("Modal root element not found. Please add a div with id 'modal-root' to your HTML.");
    return null;
  }

  return createPortal(children, modalRoot);
}
