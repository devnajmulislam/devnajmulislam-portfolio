"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface RotatingTextProps {
  words: string[];
  srLabel?: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  holdTime?: number;
}

export function RotatingText({
  words,
  srLabel,
  className = "",
  typingSpeed = 68,
  deletingSpeed = 38,
  holdTime = 1700,
}: RotatingTextProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || words.length === 0) return;

    const current = words[index % words.length] ?? "";

    if (!deleting) {
      if (text.length < current.length) {
        const timer = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed,
        );
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setDeleting(true), holdTime);
      return () => clearTimeout(timer);
    }

    if (text.length > 0) {
      const timer = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        deletingSpeed,
      );
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setDeleting(false);
      setIndex((value) => (value + 1) % words.length);
    }, 220);
    return () => clearTimeout(timer);
  }, [text, deleting, index, reduced, words, typingSpeed, deletingSpeed, holdTime]);

  const visibleText = reduced ? (words[0] ?? "") : text;

  return (
    <span className={className}>
      <span aria-hidden="true">{visibleText}</span>
      {reduced ? null : (
        <span
          aria-hidden="true"
          className="bg-accent-2 animate-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em]"
        />
      )}
      <span className="sr-only">{srLabel ?? words.join(", ")}</span>
    </span>
  );
}
