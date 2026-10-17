"use client";

import { useId, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

const TRAVEL = 26;
const DRAG_THRESHOLD = 12;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

interface DragState {
  pointerId: number;
  startY: number;
  startTranslate: number;
  moved: boolean;
}

export function ThemeSlider({ className = "" }: { className?: string }) {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [dragOffset, setDragOffset] = useState<number | null>(null);
  const drag = useRef<DragState>({
    pointerId: -1,
    startY: 0,
    startTranslate: 0,
    moved: false,
  });
  const describedById = useId();

  const baseTranslate = theme === "light" ? TRAVEL : 0;
  const translate = dragOffset ?? baseTranslate;
  const isDragging = dragOffset !== null;

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startTranslate: baseTranslate,
      moved: false,
    };
    setDragOffset(baseTranslate);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (drag.current.pointerId !== event.pointerId) return;
    const delta = event.clientY - drag.current.startY;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    setDragOffset(clamp(drag.current.startTranslate + delta, 0, TRAVEL));
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (drag.current.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const { startTranslate, startY, moved } = drag.current;
    drag.current.pointerId = -1;
    setDragOffset(null);

    if (!moved) {
      toggleTheme();
      return;
    }

    const finalOffset = clamp(
      startTranslate + (event.clientY - startY),
      0,
      TRAVEL,
    );
    if (Math.abs(finalOffset - startTranslate) < DRAG_THRESHOLD) return;
    setTheme(finalOffset > TRAVEL / 2 ? "light" : "dark");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case " ":
      case "Enter":
        event.preventDefault();
        toggleTheme();
        break;
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        setTheme("light");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        setTheme("dark");
        break;
      default:
        break;
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "light"}
      aria-label="Color theme"
      aria-describedby={describedById}
      title="Drag down for light · up for dark"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
      className={`border-border-strong bg-surface-2 hover:border-accent/60 focus-visible:outline-focus relative h-[58px] w-[32px] shrink-0 cursor-pointer touch-none rounded-full border shadow-inner transition-colors ${className}`}
    >
      <span
        aria-hidden="true"
        className="bg-border-strong absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2"
      />
      <span
        aria-hidden="true"
        className={`bg-accent text-accent-contrast ring-border-strong/40 pointer-events-none absolute top-1 left-1/2 grid h-6 w-6 place-items-center rounded-full ring-1 ring-inset ${
          isDragging
            ? ""
            : "transition-transform duration-200 ease-out motion-reduce:transition-none"
        }`}
        style={{ transform: `translate(-50%, ${translate}px)` }}
      >
        {theme === "light" ? (
          <Sun className="h-3.5 w-3.5" strokeWidth={2.5} />
        ) : (
          <Moon className="h-3.5 w-3.5" strokeWidth={2.5} />
        )}
      </span>
      <span id={describedById} className="sr-only">
        Theme switch. Drag the thumb down for light mode or up for dark mode.
        Press Space or Enter to toggle.
      </span>
    </button>
  );
}
