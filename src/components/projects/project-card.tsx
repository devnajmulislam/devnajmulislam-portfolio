import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { GithubIcon } from "@/components/ui/brand-icons";

export function ProjectCard({ project }: { project: Project }) {
  const detailHref = `/projects/${project.slug}`;

  return (
    <article className="border-border bg-surface hover:border-accent/40 group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        href={detailHref}
        aria-label={`View details for ${project.name}`}
        className="focus-visible:outline-focus block overflow-hidden"
      >
        <div className="border-border bg-surface-2 relative aspect-video overflow-hidden border-b">
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            width={project.screenshot.width}
            height={project.screenshot.height}
            sizes="(max-width: 768px) 100vw, 560px"
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-fg text-lg font-semibold tracking-tight">
            <Link href={detailHref} className="focus-visible:outline-focus">
              {project.name}
            </Link>
            {project.nativeName ? (
              <span className="text-muted ml-2 font-mono text-sm">
                {project.nativeName}
              </span>
            ) : null}
          </h3>
          <span className="text-muted shrink-0 font-mono text-xs">
            {project.year}
          </span>
        </div>

        <p className="text-muted mt-2 text-sm text-pretty">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="border-border bg-surface-2 text-muted rounded-md border px-2 py-0.5 font-mono text-[11px]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3 pt-1">
          <Link
            href={detailHref}
            className="bg-accent text-accent-contrast hover:bg-accent/90 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            View Details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-muted hover:text-fg hover:border-accent/60 focus-visible:outline-focus inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors"
            aria-label={`Open the live ${project.name} site`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-muted hover:text-fg hover:border-accent/60 focus-visible:outline-focus ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
            aria-label={`Open the ${project.name} source code on GitHub`}
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
