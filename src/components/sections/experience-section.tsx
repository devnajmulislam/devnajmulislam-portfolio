import { Briefcase, Check } from "lucide-react";
import { experience } from "@/data/experience";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/ui/section";

export function ExperienceSection() {
  return (
    <Container>
      <Section id="experience" labelledBy="experience-title">
        <SectionHeading
          id="experience-title"
          prompt="$ git log --author=najmul"
          title="Experience"
          description="My current professional role."
        />

        <ol className="mt-10 space-y-6">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.role}`}
              className="border-border bg-surface relative rounded-xl border p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="border-border bg-surface-2 text-accent grid h-10 w-10 shrink-0 place-items-center rounded-lg border">
                    <Briefcase className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-fg text-lg font-semibold">{job.role}</h3>
                    <p className="text-muted text-sm">
                      {job.company}
                      {job.companyNote ? ` · ${job.companyNote}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  {job.current ? (
                    <span className="border-accent/40 text-accent inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px]">
                      <span className="bg-accent h-1.5 w-1.5 rounded-full" />
                      Current
                    </span>
                  ) : null}
                  <span className="text-muted font-mono text-xs">
                    {job.period}
                  </span>
                </div>
              </div>

              <p className="text-muted mt-3 font-mono text-xs">
                {job.type} · {job.location}
              </p>

              <ul className="mt-5 space-y-2.5">
                {job.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="text-muted flex items-start gap-2 text-sm"
                  >
                    <Check
                      className="text-accent mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>
    </Container>
  );
}
