import { Check } from "lucide-react";
import { about } from "@/data/about";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/ui/section";

export function AboutSection() {
  return (
    <Container>
      <Section id="about" labelledBy="about-title">
        <SectionHeading
          id="about-title"
          prompt="$ cat about.md"
          title="About me"
          description="The short version: I am learning to build for the web, and I like explaining what I learn."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="border-border bg-surface rounded-xl border p-6">
              <h3 className="text-fg text-sm font-semibold">
                What I care about
              </h3>
              <ul className="mt-3 space-y-2.5">
                {about.interests.map((interest) => (
                  <li
                    key={interest}
                    className="text-muted flex items-start gap-2 text-sm"
                  >
                    <Check
                      className="text-accent mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </Container>
  );
}
