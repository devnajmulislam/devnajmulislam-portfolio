"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Headphones, Music, Square, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const BPM = 120;
const BEAT_SECONDS = 60 / BPM;
const DURATION_SECONDS = 30;
const PLAY_EVENT = "portfolio:play-beat";

function kick(ctx: AudioContext, time: number, gainValue: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(170, time);
  osc.frequency.exponentialRampToValueAtTime(45, time + 0.18);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(gainValue, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.36);
  osc.connect(gain).connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.42);
}

function hat(ctx: AudioContext, time: number, gainValue: number) {
  const length = Math.floor(ctx.sampleRate * 0.06);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 7000;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(gainValue, time);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start(time);
}

export function MusicButton() {
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  const [playing, setPlaying] = useState(false);
  const [remaining, setRemaining] = useState(DURATION_SECONDS);
  const [nudge, setNudge] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const stopTimeoutRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const pulsesRef = useRef<number[]>([]);
  const beatRef = useRef(0);
  const nextTimeRef = useRef(0);
  const playingRef = useRef(false);
  const playedRef = useRef(false);
  const dismissedRef = useRef(false);
  const nudgesShownRef = useRef(0);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  const pulse = useCallback((strong: boolean) => {
    if (reducedRef.current) return;
    const shell = document.getElementById("site-shell");
    if (!shell) return;
    const dx = (Math.random() * 2 - 1) * (strong ? 4 : 1.8);
    const dy = (Math.random() * 2 - 1) * (strong ? 5 : 2.2);
    const scale = strong ? 1.007 : 1.003;
    shell.animate(
      [
        { transform: "translate3d(0, 0, 0) scale(1)" },
        {
          transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`,
          offset: 0.3,
        },
        { transform: "translate3d(0, 0, 0) scale(1)" },
      ],
      { duration: strong ? 300 : 170, easing: "ease-out" },
    );
  }, []);

  const stop = useCallback(() => {
    if (schedulerRef.current !== null) {
      clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }
    if (stopTimeoutRef.current !== null) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
    if (countdownRef.current !== null) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    pulsesRef.current.forEach((id) => clearTimeout(id));
    pulsesRef.current = [];
    const ctx = ctxRef.current;
    if (ctx && ctx.state !== "closed") {
      ctx.close().catch(() => {});
    }
    ctxRef.current = null;
    playingRef.current = false;
    document.documentElement.classList.remove("beating");
    setPlaying(false);
    setRemaining(DURATION_SECONDS);
  }, []);

  const start = useCallback(async () => {
    if (playingRef.current) return;
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") {
      await ctx.resume().catch(() => {});
    }

    beatRef.current = 0;
    nextTimeRef.current = ctx.currentTime + 0.08;
    setRemaining(DURATION_SECONDS);
    setPlaying(true);
    setNudge(false);
    playingRef.current = true;
    playedRef.current = true;
    document.documentElement.classList.add("beating");

    const scheduler = () => {
      while (nextTimeRef.current < ctx.currentTime + 0.12) {
        const beat = beatRef.current;
        const strong = beat % 4 === 0;
        if (beat % 2 === 0) {
          kick(ctx, nextTimeRef.current, strong ? 0.95 : 0.7);
        } else {
          hat(ctx, nextTimeRef.current, 0.22);
        }
        const delay = Math.max(0, nextTimeRef.current - ctx.currentTime) * 1000;
        pulsesRef.current.push(window.setTimeout(() => pulse(strong), delay));
        nextTimeRef.current += BEAT_SECONDS;
        beatRef.current += 1;
      }
    };

    schedulerRef.current = window.setInterval(scheduler, 25);
    countdownRef.current = window.setInterval(() => {
      setRemaining((value) => (value > 1 ? value - 1 : 0));
    }, 1000);
    stopTimeoutRef.current = window.setTimeout(stop, DURATION_SECONDS * 1000);
  }, [pulse, stop]);

  useEffect(() => stop, [stop]);

  useEffect(() => {
    const onPlay = () => {
      void start();
    };
    window.addEventListener(PLAY_EVENT, onPlay);
    return () => window.removeEventListener(PLAY_EVENT, onPlay);
  }, [start]);

  useEffect(() => {
    let hideTimer = 0;
    const attempt = () => {
      if (playedRef.current || dismissedRef.current || playingRef.current) return;
      if (nudgesShownRef.current >= 3) return;
      const footer = document.getElementById("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) return;
      }
      nudgesShownRef.current += 1;
      setNudge(true);
      hideTimer = window.setTimeout(() => setNudge(false), 9000);
    };
    const firstTimer = window.setTimeout(attempt, 15000);
    const interval = window.setInterval(attempt, 75000);
    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  const goToFooter = () => {
    dismissedRef.current = true;
    setNudge(false);
    document
      .getElementById("footer")
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    setHighlight(true);
    window.setTimeout(() => setHighlight(false), 2400);
  };

  const toggle = () => {
    if (playing) {
      stop();
    } else {
      void start();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className={`border-border bg-surface text-muted hover:text-fg hover:border-accent/50 focus-visible:outline-focus inline-flex items-center gap-2 rounded-full border px-5 py-3 font-mono text-xs transition-all ${
          highlight ? "ring-accent ring-2 ring-offset-0" : ""
        }`}
      >
        {playing ? (
          <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        ) : (
          <Music className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span>{playing ? `Beat · ${remaining}s` : "Play beat"}</span>
        {playing ? (
          <span
            className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full"
            aria-hidden="true"
          />
        ) : null}
      </button>

      {nudge ? (
        <div
          role="status"
          className="border-border bg-surface/95 fixed bottom-24 left-1/2 z-[70] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-full border py-2 pr-2 pl-4 shadow-xl backdrop-blur-md"
          style={{ animation: "fade-up 320ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <Headphones className="text-accent h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="text-fg text-xs whitespace-nowrap sm:text-sm">
            There&apos;s a beat waiting in the footer
          </p>
          <button
            type="button"
            onClick={goToFooter}
            className="bg-accent text-accent-contrast focus-visible:outline-focus shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold"
          >
            Feel it
          </button>
          <button
            type="button"
            onClick={() => {
              dismissedRef.current = true;
              setNudge(false);
            }}
            aria-label="Dismiss"
            className="text-muted hover:text-fg focus-visible:outline-focus grid h-6 w-6 shrink-0 place-items-center rounded-full"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}
    </>
  );
}
