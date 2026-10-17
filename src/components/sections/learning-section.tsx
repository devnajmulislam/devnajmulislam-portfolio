import { GraduationCap, Info } from "lucide-react";
import { education } from "@/data/education";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/ui/section";

export function LearningSection() {
  return (
    <Container>
      <Section id="learning" labelledBy="learning-title">
        <SectionHeading
          id="learning-title"
          prompt="$ cat training.log"
          title="Training & learning"
          description="Where my development skills come from."
        />

        <div className="mt-10 space-y-5">
          {education.entries.map((entry) => (
            <div
              key={entry.title}
              className="border-border bg-surface rounded-xl border p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="border-border bg-surface-2 text-accent grid h-10 w-10 shrink-0 place-items-center rounded-lg border">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-fg font-semibold">{entry.title}</h3>
                    <p className="text-muted text-sm">{entry.institution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="border-accent/40 text-accent rounded-full border px-2.5 py-0.5 font-mono text-[11px]">
                    {entry.status}
                  </span>
                  <span className="text-muted font-mono text-xs">
                    {entry.period}
                  </span>
                </div>
              </div>
              <p className="text-muted mt-4 text-sm text-pretty">
                {entry.description}
              </p>
            </div>
          ))}

          <p className="text-muted border-border bg-surface-2 flex items-start gap-2 rounded-xl border p-4 text-sm">
            <Info className="text-accent mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {education.note}
          </p>
        </div>
      </Section>
    </Container>
  );
}
