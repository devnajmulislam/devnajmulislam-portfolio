import Link from "next/link";
import { site } from "@/data/site";

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`border-border-strong bg-surface-2 grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${className}`}
    >
      <svg viewBox="0 0 64 64" className="h-5 w-5">
        <path
          d="M16 21 L28 32 L16 43"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="34" y="38" width="14" height="6" rx="3" fill="var(--accent-2)" />
      </svg>
    </span>
  );
}

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group focus-visible:outline-focus flex items-center gap-2.5 rounded-md ${className}`}
      aria-label={`${site.name} — home`}
    >
      <Monogram className="transition-colors group-hover:border-accent/60" />
      <span className="flex flex-col leading-none">
        <span className="text-fg font-semibold tracking-tight">{site.name}</span>
        <span className="text-muted font-mono text-[11px] tracking-tight">
          @{site.handle}
        </span>
      </span>
    </Link>
  );
}
