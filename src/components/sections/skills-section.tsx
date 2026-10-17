import { Code2, Database, Server, Wrench } from "lucide-react";
import { skillCategories, type SkillIcon } from "@/data/skills";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { SkillMagnet } from "@/components/ui/skill-magnet";
import { brandColor, brandHex, brandTint, TechIcon } from "@/components/ui/tech-icon";

const iconMap = {
  frontend: Code2,
  backend: Server,
  database: Database,
  tools: Wrench,
} satisfies Record<SkillIcon, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>>;

export function SkillsSection() {
  return (
    <Container>
      <Section id="skills" labelledBy="skills-title">
        <SectionHeading
          id="skills-title"
          prompt="$ ls ./skills"
          title="Skills & tools"
          description="Only the technologies I have actually used while learning and building projects."
        />

        <SkillMagnet />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <div
                key={category.id}
                className="border-border bg-surface hover:border-accent/40 hover:shadow-lg group rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-center gap-3">
                  <span className="border-border bg-surface-2 text-accent grid h-10 w-10 place-items-center rounded-lg border transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
                    <Icon className="h-5 w-5" aria-hidden={true} />
                  </span>
                  <div>
                    <h3 className="text-fg font-semibold">{category.title}</h3>
                    <p className="text-muted text-sm">{category.description}</p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((item) => {
                    const hex = brandHex(item);
                    return (
                      <li
                        key={item}
                        data-skill-chip={item}
                        className="border-border bg-surface-2 text-fg/80 flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs"
                        style={
                          hex
                            ? {
                                backgroundColor: brandTint(item, 16),
                                borderColor: `color-mix(in srgb, ${hex} 45%, var(--border))`,
                              }
                            : undefined
                        }
                      >
                        <span
                          data-skill-slot
                          className="grid h-3.5 w-3.5 shrink-0 place-items-center"
                        >
                          <TechIcon
                            label={item}
                            className="hidden h-3.5 w-3.5 motion-reduce:block"
                            style={{ color: brandColor(item) }}
                          />
                        </span>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>
    </Container>
  );
}
