"use client";

import { useRef, useState } from "react";
import { Check, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { site } from "@/data/site";
import { gmailComposeUrl, mapsUrl, whatsappChatUrl } from "@/data/contact";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";

type CopyTarget = "email" | "phone";

export function ContactSection() {
  const [copied, setCopied] = useState<CopyTarget | null>(null);
  const resetTimer = useRef<number | null>(null);

  const copy = (target: CopyTarget, value: string) => {
    navigator.clipboard?.writeText(value).then(
      () => {
        setCopied(target);
        if (resetTimer.current !== null) {
          window.clearTimeout(resetTimer.current);
        }
        resetTimer.current = window.setTimeout(() => setCopied(null), 2000);
      },
      () => {},
    );
  };

  const emailCopied = copied === "email";
  const phoneCopied = copied === "phone";

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
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-accent-contrast hover:bg-accent/90 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send an email
                </a>
                <a
                  href={whatsappChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border-strong bg-surface text-fg hover:border-accent/60 focus-visible:outline-focus inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Chat on WhatsApp
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
                <button
                  type="button"
                  onClick={() => copy("email", site.email)}
                  aria-label={`Copy email address ${site.email}`}
                  className="border-border bg-surface-2 hover:border-accent/40 focus-visible:outline-focus flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors"
                >
                  <span className="border-border bg-surface text-accent grid h-10 w-10 shrink-0 place-items-center rounded-lg border">
                    {emailCopied ? (
                      <Check className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-muted font-mono text-[11px] tracking-wide uppercase">
                      {emailCopied ? "Copied!" : "Email"}
                    </span>
                    <span className="text-fg text-sm">{site.email}</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => copy("phone", site.phoneDisplay)}
                  aria-label={`Copy phone number ${site.phoneDisplay}`}
                  className="border-border bg-surface-2 hover:border-accent/40 focus-visible:outline-focus flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors"
                >
                  <span className="border-border bg-surface text-accent grid h-10 w-10 shrink-0 place-items-center rounded-lg border">
                    {phoneCopied ? (
                      <Check className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-muted font-mono text-[11px] tracking-wide uppercase">
                      {phoneCopied ? "Copied!" : "Phone"}
                    </span>
                    <span className="text-fg text-sm">{site.phoneDisplay}</span>
                  </span>
                </button>
              </li>
              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${site.location} in Google Maps`}
                  className="border-border bg-surface-2 hover:border-accent/40 focus-visible:outline-focus flex items-center gap-4 rounded-xl border p-4 transition-colors"
                >
                  <span className="border-border bg-surface text-accent grid h-10 w-10 shrink-0 place-items-center rounded-lg border">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-muted font-mono text-[11px] tracking-wide uppercase">
                      Location
                    </span>
                    <span className="text-fg text-sm">{site.location}</span>
                  </span>
                </a>
              </li>
            </ul>
            <p role="status" className="sr-only">
              {emailCopied || phoneCopied ? "Copied to clipboard" : ""}
            </p>
          </div>
        </div>
      </Section>
    </Container>
  );
}
