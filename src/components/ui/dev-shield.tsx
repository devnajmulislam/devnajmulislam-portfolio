"use client";

import { useEffect } from "react";

const BLOCKED_SHIFT_KEYS = new Set(["i", "j", "c", "k", "e", "u", "s"]);
const BLOCKED_PLAIN_KEYS = new Set(["u", "s"]);

export function DevShield() {
  useEffect(() => {
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const withModifier = event.ctrlKey || event.metaKey;
      const blocked =
        event.key === "F12" ||
        (withModifier && event.shiftKey && BLOCKED_SHIFT_KEYS.has(key)) ||
        (withModifier && !event.shiftKey && BLOCKED_PLAIN_KEYS.has(key));

      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const onDragStart = (event: DragEvent) => {
      if (event.target instanceof HTMLImageElement) event.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, { capture: true });
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown, { capture: true });
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
