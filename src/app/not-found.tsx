import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <main id="main" className="bg-grid grow">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="border-border bg-surface text-accent grid h-14 w-14 place-items-center rounded-xl border">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="text-muted mt-6 font-mono text-sm">
          $ cd /requested-page
        </p>
        <p className="text-accent font-mono text-sm">
          bash: cd: no such file or directory
        </p>
        <h1 className="text-fg mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
          404
        </h1>
        <p className="text-muted mt-3 max-w-md text-pretty">
          This page does not exist — or it moved somewhere else. Let&apos;s get
          you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-accent text-accent-contrast hover:bg-accent/90 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back home
          </Link>
          <Link
            href="/projects"
            className="border-border-strong bg-surface text-fg hover:border-accent/60 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            View projects
          </Link>
        </div>
      </Container>
    </main>
  );
}
