"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  brandColor,
  brandHex,
  brandTint,
  techStack,
  TechIcon,
} from "@/components/ui/tech-icon";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ICON_SIZE = 42;
const REACH = 620;
const MAX_LEAN = 150;
const SEAT_EASE = 0.08;

const INTERACTIVE_SELECTOR =
  'a[href], button, input, select, textarea, summary, label, [role="button"], [role="link"], [role="switch"]';

interface Particle {
  x: number;
  y: number;
  nx: number;
  ny: number;
  ease: number;
  phase: number;
  scale: number;
  settle: number;
}

const GLYPH_SIZE = 20;

function subscribeNoop() {
  return () => {};
}

export function SkillMagnet() {
  const reduced = usePrefersReducedMotion();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const particles = useRef<Particle[]>([]);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const seated = useRef(false);
  const [isSeated, setIsSeated] = useState(false);

  const interactive = mounted && !reduced;

  useEffect(() => {
    if (!interactive) return;

    const count = techStack.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const w0 = window.innerWidth;
    const h0 = window.innerHeight;

    particles.current = Array.from({ length: count }, (_, i) => {
      const angle = i * golden;
      const r = Math.sqrt((i + 0.5) / count);
      const nx = Math.cos(angle) * 0.46 * r;
      const ny = Math.sin(angle) * 0.44 * r;
      return {
        nx,
        ny,
        x: w0 / 2 + nx * w0,
        y: h0 / 2 + ny * h0,
        ease: 0.02 + (i % 5) * 0.008,
        phase: i * 0.7,
        scale: 1,
        settle: 0,
      };
    });

    const seatTargets = new Map<number, Element>();
    document.querySelectorAll<HTMLElement>("[data-skill-chip]").forEach((chip) => {
      const label = chip.dataset.skillChip;
      if (!label) return;
      const index = techStack.indexOf(label);
      if (index < 0) return;
      seatTargets.set(index, chip.querySelector("[data-skill-slot]") ?? chip);
    });

    const onMove = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY, active: true };
    };
    const onLeaveWindow = () => {
      pointer.current.active = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);

    let last = performance.now();
    let frameId = requestAnimationFrame(function frame(now) {
      frameId = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 16.6667, 3);
      last = now;

      if (!seated.current && pointer.current.active) {
        const section = document.getElementById("skills");
        if (section) {
          const sr = section.getBoundingClientRect();
          const { x, y } = pointer.current;
          if (x >= sr.left && x <= sr.right && y >= sr.top && y <= sr.bottom) {
            seated.current = true;
            setIsSeated(true);
          }
        }
      }

      if (seated.current) {
        particles.current.forEach((p, i) => {
          const target = seatTargets.get(i);
          const f = 1 - Math.pow(1 - SEAT_EASE, dt);
          if (target) {
            const r = target.getBoundingClientRect();
            p.x += (r.left + r.width / 2 - p.x) * f;
            p.y += (r.top + r.height / 2 - p.y) * f;
            const want = Math.min(1, Math.max(0.3, r.width / GLYPH_SIZE));
            p.scale += (want - p.scale) * f;
          }
          p.settle += (1 - p.settle) * f;

          const node = nodes.current[i];
          if (node) {
            const hex = brandHex(techStack[i]);
            const badge = 1 - p.settle;
            node.style.transform = `translate3d(${p.x - ICON_SIZE / 2}px, ${p.y - ICON_SIZE / 2}px, 0) scale(${p.scale})`;
            node.style.opacity = "1";
            node.style.backgroundColor = hex
              ? `color-mix(in srgb, ${hex} ${Math.round(22 * badge)}%, transparent)`
              : "transparent";
            node.style.borderColor = hex
              ? `color-mix(in srgb, ${hex} ${Math.round(45 * badge)}%, transparent)`
              : "transparent";
            node.style.boxShadow = badge > 0.5 ? "" : "none";
            node.style.backdropFilter = badge > 0.5 ? "" : "none";
          }
        });
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      let overInteractive = false;
      if (pointer.current.active) {
        const el = document.elementFromPoint(pointer.current.x, pointer.current.y);
        overInteractive = !!(el && el.closest(INTERACTIVE_SELECTOR));
      }
      const visible = pointer.current.active && !overInteractive;

      particles.current.forEach((p, i) => {
        const baseX = cx + p.nx * w;
        const baseY = cy + p.ny * h;
        const drift = now * 0.00035;
        let tx = baseX + Math.cos(drift + p.phase) * 24;
        let ty = baseY + Math.sin(drift * 1.25 + p.phase) * 20;

        if (pointer.current.active) {
          const dx = pointer.current.x - p.x;
          const dy = pointer.current.y - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < REACH) {
            const lean = (1 - dist / REACH) ** 2 * MAX_LEAN;
            tx += (dx / dist) * lean;
            ty += (dy / dist) * lean;
          }
        }

        const f = 1 - Math.pow(1 - p.ease, dt);
        p.x += (tx - p.x) * f;
        p.y += (ty - p.y) * f;
        p.scale += (1 - p.scale) * f;

        const node = nodes.current[i];
        if (node) {
          node.style.transform = `translate3d(${p.x - ICON_SIZE / 2}px, ${p.y - ICON_SIZE / 2}px, 0) scale(${p.scale})`;
          node.style.opacity = visible ? "0.72" : "0";
        }
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [interactive]);

  return (
    <>
      <div className="border-border bg-surface-2/40 relative mt-10 flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-dashed px-4 sm:h-44">
        {interactive ? (
          <span className="text-muted/70 pointer-events-none font-mono text-[11px] tracking-wider uppercase">
            {isSeated
              ? "$ stack docked to the cards"
              : "$ move your cursor — the stack follows you here"}
          </span>
        ) : (
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {techStack.map((label) => {
              const hex = brandHex(label);
              return (
                <li
                  key={label}
                  title={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border"
                  style={{
                    backgroundColor: brandTint(label, 22) ?? "var(--surface)",
                    borderColor: hex
                      ? `color-mix(in srgb, ${hex} 45%, var(--border))`
                      : "var(--border)",
                  }}
                >
                  <TechIcon
                    label={label}
                    className="h-5 w-5"
                    style={{ color: brandColor(label) }}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {interactive
        ? createPortal(
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 print:hidden">
              {techStack.map((label, i) => {
                const hex = brandHex(label);
                return (
                  <div
                    key={label}
                    ref={(el) => {
                      nodes.current[i] = el;
                    }}
                    title={label}
                    style={{
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      opacity: 0,
                      willChange: "transform, opacity",
                      backgroundColor: brandTint(label, 22) ?? "var(--surface)",
                      borderColor: hex
                        ? `color-mix(in srgb, ${hex} 45%, var(--border))`
                        : "var(--border)",
                    }}
                    className="absolute top-0 left-0 grid place-items-center rounded-xl border shadow-sm backdrop-blur-sm transition-opacity duration-200 ease-out"
                  >
                    <TechIcon
                      label={label}
                      className="h-5 w-5"
                      style={{ color: brandColor(label) }}
                    />
                  </div>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
