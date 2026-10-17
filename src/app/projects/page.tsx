import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects built by Najmul Islam (Nahid) — BazarDor and Fit Log — with the full tech stack, live links and source code.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="grow">
      <Container className="py-14 sm:py-20">
        <Link
          href="/"
          className="text-muted hover:text-accent focus-visible:outline-focus inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back home
        </Link>

        <div className="mt-8 max-w-2xl">
          <p className="text-accent font-mono text-xs sm:text-sm">
            $ ls ./projects
          </p>
          <h1 className="text-fg mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects
          </h1>
          <p className="text-muted mt-3 text-pretty">
            These are the applications I have built while learning web
            development. Each one links to a detailed write-up and its source
            code.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </main>
  );
}
