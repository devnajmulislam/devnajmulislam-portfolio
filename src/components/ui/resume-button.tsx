"use client";

import { useState } from "react";
import { Download, FileClock } from "lucide-react";
import { site } from "@/data/site";

export function ResumeButton({ className = "" }: { className?: string }) {
  const [notice, setNotice] = useState(false);

  if (site.resumeUrl) {
    return (
      <a
        href={site.resumeUrl}
        download
        className={`bg-accent text-accent-contrast hover:bg-accent/90 focus-visible:outline-focus inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors ${className}`}
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download Resume
      </a>
    );
  }

  return (
    <span className={`inline-flex flex-col gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => setNotice(true)}
        aria-describedby={notice ? "resume-notice" : undefined}
        className="border-border-strong bg-surface text-fg hover:border-accent/60 focus-visible:outline-focus inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors"
      >
        <FileClock className="h-4 w-4" aria-hidden="true" />
        Resume — coming soon
      </button>
      {notice ? (
        <span
          id="resume-notice"
          role="status"
          className="text-muted font-mono text-xs"
        >
          The resume is still being prepared. Please check back soon.
        </span>
      ) : null}
    </span>
  );
}
