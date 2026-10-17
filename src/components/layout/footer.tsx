import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { Container } from "@/components/layout/container";
import { Monogram } from "@/components/ui/brand";
import { MusicButton } from "@/components/ui/music-button";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="border-border bg-surface-2 mt-auto border-t"
    >
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Monogram />
            <div className="flex flex-col leading-none">
              <span className="text-fg font-semibold tracking-tight">
                {site.name}
              </span>
              <span className="text-muted font-mono text-[11px]">
                @{site.handle}
              </span>
            </div>
          </div>
          <p className="text-muted mt-4 text-sm text-pretty">
            {site.designation} from {site.location}. Building practical web
            applications and writing clear technical content.
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-accent text-xs tracking-wider uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-fg focus-visible:outline-focus text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-accent text-xs tracking-wider uppercase">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-muted hover:text-fg focus-visible:outline-focus inline-flex items-center gap-2 transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone}`}
                className="text-muted hover:text-fg focus-visible:outline-focus inline-flex items-center gap-2 transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </li>
            <li className="text-muted inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {site.location}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-border border-t">
        <Container className="flex flex-col items-center gap-3 py-8 text-center">
          <p className="text-muted font-mono text-xs tracking-wider uppercase">
            Turn up the vibe
          </p>
          <MusicButton />
          <p className="text-muted/80 font-mono text-[11px]">
            A 30-second beat made with the Web Audio API
          </p>
        </Container>
      </div>

      <div className="border-border border-t">
        <Container className="text-muted flex flex-col gap-2 py-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </Container>
      </div>
    </footer>
  );
}
