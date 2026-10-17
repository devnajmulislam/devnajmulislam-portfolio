import Image from "next/image";
import Link from "next/link";
import { ArrowRight} from "lucide-react";
import { site } from "@/data/site";
import { about } from "@/data/about";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { ResumeButton } from "@/components/ui/resume-button";
import { RotatingText } from "@/components/ui/rotating-text";
import { SocialLinks } from "@/components/ui/social-links";

export function Hero() {
  return (
    <section
      id="top"
      className="bg-grid border-border relative overflow-hidden border-b"
    >
      <div
        aria-hidden="true"
        className="bg-accent/20 animate-aurora pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="bg-accent-2/10 animate-aurora pointer-events-none absolute top-1/3 -right-10 h-80 w-80 rounded-full blur-[120px]"
      />

      <Container className="relative grid items-stretch gap-12 py-12 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div>
          <Reveal>
            <p className="text-muted inline-flex items-center gap-2 font-mono text-xs">
              <span className="bg-accent inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
              {site.tagline}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              <span className="text-gradient">{site.name}</span>{" "}
              <span
                className="animate-wave inline-block"
                role="img"
                aria-label="waving hand"
              >
                👋
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-accent mt-3 min-h-6 font-mono text-sm sm:text-base">
              <RotatingText
                words={site.taglines}
                srLabel={site.designation}
              />
            </p>
          </Reveal>

          <Reveal delay={260}>
            <p className="text-muted mt-6 max-w-xl text-pretty">
              {about.intro}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ResumeButton />
              <Link
                href="/#projects"
                className="group border-border-strong bg-surface text-fg hover:border-accent/60 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors"
              >
                View projects
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <SocialLinks className="ml-1" />
            </div>
          </Reveal>

          <Reveal delay={380}>
            <dl className="border-border mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 sm:max-w-lg">
              {about.quickFacts.slice(0, 4).map((fact) => (
                <div key={fact.label}>
                  <dt className="text-muted font-mono text-[11px] tracking-wide uppercase">
                    {fact.label}
                  </dt>
                  <dd className="text-fg mt-1 text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Added h-full to Reveal and wrapper components to explicitly match grid row height */}
        <Reveal delay={220} className="mx-auto flex h-full w-full max-w-sm flex-col lg:max-w-none">
          <div className="ring-border bg-border-strong animate-float relative flex h-full flex-col overflow-hidden rounded-xl shadow-lg">
            <figure className="bg-surface relative z-10 m-[3px] flex h-full flex-col overflow-hidden rounded-[9px]">
              <figcaption className="border-border bg-surface-2 flex items-center gap-2 border-b px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="text-muted font-mono text-xs">
                  {site.handle}@image: ~/
                </span>
              </figcaption>

              <div className="relative flex-1">
                <Image
                  src="/images/profile-img.png"
                  alt={`Portrait of ${site.name}`}
                  width={960}
                  height={1280}
                  priority
                  sizes="(max-width: 1024px) 384px, 420px"
                  className="absolute inset-0 h-full w-full object-cover contrast-[1.06] saturate-[0.95]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(150deg, var(--accent), var(--accent-2))",
                    mixBlendMode: "soft-light",
                    opacity: 0.55,
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(150deg, var(--accent), var(--accent-2))",
                    mixBlendMode: "color",
                    opacity: 0.16,
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--bg) 80%, transparent))",
                  }}
                />
              </div>
            </figure>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}