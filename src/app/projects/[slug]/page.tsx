import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  ListChecks,
  Rocket,
} from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { Container } from "@/components/layout/container";
import { GithubIcon } from "@/components/ui/brand-icons";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${site.name}`,
      description: project.summary,
      images: [{ url: project.screenshot.src }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((item) => item.slug !== project.slug);

  return (
    <main id="main" className="grow">
      <Container className="py-14 sm:py-20">
        <Link
          href="/projects"
          className="text-muted hover:text-accent focus-visible:outline-focus inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="text-accent font-mono text-xs sm:text-sm">
            {project.tagline}
          </p>
          <h1 className="text-fg mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
          {project.nativeName ? (
            <p className="text-muted mt-1 font-mono text-sm">
              {project.nativeName}
            </p>
          ) : null}
          <p className="text-muted mt-4 text-pretty">{project.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-contrast hover:bg-accent/90 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live project
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border-strong bg-surface text-fg hover:border-accent/60 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              Source code
            </a>
            <span className="text-muted font-mono text-xs">
              {project.year}
            </span>
          </div>
        </header>

        <figure className="border-border bg-surface mt-10 overflow-hidden rounded-xl border">
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            width={project.screenshot.width}
            height={project.screenshot.height}
            sizes="(max-width: 1152px) 100vw, 1100px"
            priority
            className="w-full"
          />
        </figure>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-14">
          <div className="space-y-12">
            <section aria-labelledby="overview">
              <h2
                id="overview"
                className="text-fg text-xl font-semibold tracking-tight"
              >
                Overview
              </h2>
              <p className="text-muted mt-3 text-pretty">
                {project.description}
              </p>
            </section>

            <section aria-labelledby="features">
              <h2
                id="features"
                className="text-fg flex items-center gap-2 text-xl font-semibold tracking-tight"
              >
                <ListChecks className="text-accent h-5 w-5" aria-hidden="true" />
                Key features
              </h2>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="text-muted flex items-start gap-3 text-sm"
                  >
                    <span className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="challenges">
              <h2
                id="challenges"
                className="text-fg flex items-center gap-2 text-xl font-semibold tracking-tight"
              >
                <AlertTriangle
                  className="text-accent h-5 w-5"
                  aria-hidden="true"
                />
                Development challenges
              </h2>
              <ul className="mt-4 space-y-3">
                {project.challenges.map((item) => (
                  <li
                    key={item}
                    className="text-muted flex items-start gap-3 text-sm"
                  >
                    <span className="bg-accent/60 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid gap-8 sm:grid-cols-2">
              <section aria-labelledby="improvements">
                <h2
                  id="improvements"
                  className="text-fg flex items-center gap-2 text-lg font-semibold tracking-tight"
                >
                  <Lightbulb className="text-accent h-5 w-5" aria-hidden="true" />
                  Potential improvements
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {project.improvements.map((item) => (
                    <li
                      key={item}
                      className="text-muted flex items-start gap-2 text-sm"
                    >
                      <span className="bg-border-strong mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="future-plans">
                <h2
                  id="future-plans"
                  className="text-fg flex items-center gap-2 text-lg font-semibold tracking-tight"
                >
                  <Rocket className="text-accent h-5 w-5" aria-hidden="true" />
                  Future plans
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {project.futurePlans.map((item) => (
                    <li
                      key={item}
                      className="text-muted flex items-start gap-2 text-sm"
                    >
                      <span className="bg-border-strong mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border-border bg-surface rounded-xl border p-6">
              <h2 className="font-mono text-accent text-xs tracking-wider uppercase">
                Tech stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="border-border bg-surface-2 text-muted rounded-md border px-2.5 py-1 font-mono text-xs"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {others.length ? (
          <div className="border-border mt-16 border-t pt-10">
            <h2 className="text-fg text-lg font-semibold">More projects</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/projects/${item.slug}`}
                    className="border-border bg-surface hover:border-accent/40 focus-visible:outline-focus flex items-center justify-between gap-4 rounded-xl border p-4 transition-colors"
                  >
                    <span>
                      <span className="text-fg block font-medium">
                        {item.name}
                      </span>
                      <span className="text-muted block text-sm">
                        {item.stack[0]}
                      </span>
                    </span>
                    <ExternalLink
                      className="text-muted h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </main>
  );
}
