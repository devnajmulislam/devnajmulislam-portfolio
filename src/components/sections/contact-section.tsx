import { Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";

export function ContactSection() {
  return (
    <Container>
      <Section id="contact" labelledBy="contact-title">
        <div className="border-border bg-surface bg-grid relative overflow-hidden rounded-2xl border p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                id="contact-title"
                prompt="$ ping nahid"
                title="Let's build something together"
                description="I am always happy to talk about web development, learning, or a content-writing collaboration. The quickest way to reach me is email."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="bg-accent text-accent-contrast hover:bg-accent/90 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send an email
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="border-border-strong bg-surface text-fg hover:border-accent/60 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call me
                </a>
              </div>
              <div className="mt-8">
                <p className="text-muted font-mono text-xs tracking-wider uppercase">
                  Find me online
                </p>
                <SocialLinks className="mt-3" />
              </div>
            </div>

            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="border-border bg-surface-2 hover:border-accent/40 focus-visible:outline-focus flex items-center gap-4 rounded-xl border p-4 transition-colors"
                >
                  <span className="border-border bg-surface text-accent grid h-10 w-10 shrink-0 place-items-center rounded-lg border">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-muted font-mono text-[11px] tracking-wide uppercase">
                      Email
                    </span>
                    <span className="text-fg text-sm">{site.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="border-border bg-surface-2 hover:border-accent/40 focus-visible:outline-focus flex items-center gap-4 rounded-xl border p-4 transition-colors"
                >
                  <span className="border-border bg-surface text-accent grid h-10 w-10 shrink-0 place-items-center rounded-lg border">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-muted font-mono text-[11px] tracking-wide uppercase">
                      Phone
                    </span>
                    <span className="text-fg text-sm">{site.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li className="border-border bg-surface-2 flex items-center gap-4 rounded-xl border p-4">
                <span className="border-border bg-surface text-accent grid h-10 w-10 shrink-0 place-items-center rounded-lg border">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-muted font-mono text-[11px] tracking-wide uppercase">
                    Location
                  </span>
                  <span className="text-fg text-sm">{site.location}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </Container>
  );
}
