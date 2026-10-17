"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, ChevronDown, RotateCcw, Sparkles, X } from "lucide-react";
import { aiSnippets } from "@/data/ai-snippet";
import { Monogram } from "@/components/ui/brand";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Phase = "question" | "thinking" | "answering" | "related";

const QUESTION_MS = 850;
const THINK_MS = 900;
const HOLD_MS = 5200;

export function AiSnippet() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [typed, setTyped] = useState("");
  const [relatedOpen, setRelatedOpen] = useState<number | null>(null);
  const indexRef = useRef(0);

  const current = aiSnippets[index] ?? aiSnippets[0];

  const advance = useCallback(() => {
    setRelatedOpen(null);
    setTyped("");
    setPhase("question");
    let next = indexRef.current;
    if (aiSnippets.length > 1) {
      while (next === indexRef.current) {
        next = Math.floor(Math.random() * aiSnippets.length);
      }
    }
    indexRef.current = next;
    setIndex(next);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (phase === "question") {
      const timer = setTimeout(() => {
        setTyped("");
        setPhase("thinking");
      }, reduced ? 200 : QUESTION_MS);
      return () => clearTimeout(timer);
    }
    if (phase === "thinking") {
      const timer = setTimeout(
        () => setPhase(reduced ? "related" : "answering"),
        reduced ? 300 : THINK_MS,
      );
      return () => clearTimeout(timer);
    }
    if (phase === "related" && relatedOpen === null) {
      const timer = setTimeout(() => advance(), reduced ? HOLD_MS + 1500 : HOLD_MS);
      return () => clearTimeout(timer);
    }
  }, [open, phase, index, reduced, relatedOpen, advance]);

  useEffect(() => {
    if (!open || phase !== "answering" || reduced) return;
    const full = current.answer;
    if (typed.length >= full.length) {
      const timer = setTimeout(() => setPhase("related"), 400);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setTyped(full.slice(0, typed.length + 1)),
      full[typed.length] === " " ? 26 : 15,
    );
    return () => clearTimeout(timer);
  }, [open, phase, typed, current, reduced]);

  const openSnippet = () => {
    setPhase("question");
    setTyped("");
    setRelatedOpen(null);
    setOpen(true);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 print:hidden">
      {open ? (
        <section
          id="ai-snippet-panel"
          aria-label="AI snippet about Najmul Islam"
          className="border-border bg-surface/95 flex max-h-[min(34rem,calc(100vh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-md sm:w-[22.5rem]"
          style={{ animation: "fade-up 320ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <header className="border-border flex items-center gap-3 border-b px-4 py-3">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <Monogram />
              <span className="border-surface bg-accent absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2" />
            </span>
            <div className="min-w-0 grow leading-tight">
              <p className="text-fg flex items-center gap-1.5 text-sm font-semibold">
                Ask about Najmul
                <span className="border-accent/30 bg-accent/10 text-accent rounded-full border px-1.5 py-0.5 font-mono text-[9px] tracking-wider uppercase">
                  AI
                </span>
              </p>
              <p className="text-muted truncate font-mono text-[11px]">
                {phase === "related" ? "answer ready" : "generating answer…"}
              </p>
            </div>
            <button
              type="button"
              onClick={advance}
              aria-label="Next question"
              className="border-border bg-surface-2 text-muted hover:text-fg focus-visible:outline-focus grid h-8 w-8 place-items-center rounded-lg border transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close AI snippet"
              className="border-border bg-surface-2 text-muted hover:text-fg focus-visible:outline-focus grid h-8 w-8 place-items-center rounded-lg border transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-end">
                <p className="bg-accent text-accent-contrast max-w-[85%] rounded-2xl rounded-br-sm px-3 py-2 text-sm font-medium">
                  {current.question}
                </p>
              </div>

              <div className="flex gap-2.5">
                <span className="border-border bg-surface-2 text-accent mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="border-border bg-surface-2 min-w-0 flex-1 rounded-2xl rounded-tl-sm border px-3 py-2.5">
                  {phase === "question" || phase === "thinking" ? (
                    <span className="flex items-center gap-1 py-0.5" aria-hidden="true">
                      <span className="bg-muted h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
                      <span className="bg-muted h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
                      <span className="bg-muted h-1.5 w-1.5 animate-bounce rounded-full" />
                    </span>
                  ) : (
                    <p className="text-fg text-sm leading-relaxed text-pretty">
                      {reduced ? current.answer : typed}
                      {phase === "answering" && !reduced ? (
                        <span
                          aria-hidden="true"
                          className="bg-accent-2 animate-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em]"
                        />
                      ) : null}
                    </p>
                  )}
                </div>
              </div>

              <div className="sr-only" aria-live="polite">
                {phase === "related"
                  ? `Question: ${current.question} Answer: ${current.answer}`
                  : ""}
              </div>

              {phase === "related" ? (
                <div className="mt-1">
                  <p className="text-muted flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Related questions
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {current.related.map((item, relatedIndex) => {
                      const expanded = relatedOpen === relatedIndex;
                      return (
                        <li
                          key={item.question}
                          className="border-border overflow-hidden rounded-lg border"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setRelatedOpen(expanded ? null : relatedIndex)
                            }
                            aria-expanded={expanded}
                            className="text-fg hover:bg-surface-2 focus-visible:outline-focus flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[13px] transition-colors"
                          >
                            <span>{item.question}</span>
                            <ChevronDown
                              className={`text-muted h-4 w-4 shrink-0 transition-transform ${
                                expanded ? "rotate-180" : ""
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                          {expanded ? (
                            <p className="text-muted bg-surface-2 border-border border-t px-3 py-2 text-[13px] leading-relaxed text-pretty">
                              {item.answer}
                            </p>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <footer className="border-border text-muted flex items-center justify-between gap-2 border-t px-4 py-2.5 font-mono text-[10px]">
            <span className="truncate">AI-simulated · answers from profile</span>
            <span className="text-accent shrink-0">
              {phase === "related" && relatedOpen !== null
                ? "paused"
                : "auto-playing"}
            </span>
          </footer>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openSnippet())}
        aria-expanded={open}
        aria-controls="ai-snippet-panel"
        aria-label={open ? "Close AI snippet" : "Open AI snippet about Najmul Islam"}
        className="bg-accent text-accent-contrast focus-visible:outline-focus group relative flex h-14 items-center gap-2 rounded-full pr-4 pl-3.5 font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          {!open ? (
            <span className="bg-accent absolute inset-0 animate-ping rounded-full opacity-30" />
          ) : null}
        </span>
        <span className="text-sm whitespace-nowrap">Ask AI</span>
      </button>
    </div>
  );
}
