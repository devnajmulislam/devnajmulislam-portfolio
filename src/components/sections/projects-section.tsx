import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/ui/section";

export function ProjectsSection({
  eyebrow = "$ ls ./projects",
  description = "A few things I have designed, built and shipped. Every card links to a full write-up.",
  showAllLink = true,
}: {
  eyebrow?: string;
  description?: string;
  showAllLink?: boolean;
}) {
  const featured = projects.filter((project) => project.featured);

  return (
    <Container>
      <Section id="projects" labelledBy="projects-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="projects-title"
            prompt={eyebrow}
            title="Projects"
            description={description}
          />
          {showAllLink ? (
            <Link
              href="/projects"
              className="text-muted hover:text-accent focus-visible:outline-focus inline-flex items-center gap-1.5 text-sm transition-colors"
            >
              All projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
