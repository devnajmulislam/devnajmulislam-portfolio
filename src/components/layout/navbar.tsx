"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { Container } from "@/components/layout/container";
import { Brand } from "@/components/ui/brand";
import { PALETTE_EVENT } from "@/components/ui/command-palette";
import { SocialLinks } from "@/components/ui/social-links";
import { ThemeSlider } from "@/components/theme/theme-slider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = navItems
      .map((item) => item.href.split("#")[1])
      .filter((id): id is string => Boolean(id));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => active === href.split("#")[1];

  return (
    <header className="border-border bg-bg/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Brand />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "true" : undefined}
                  className={`after:bg-accent focus-visible:outline-focus relative rounded-md px-3 py-2 text-sm transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${
                    isActive(item.href)
                      ? "text-accent after:scale-x-100"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
            aria-label="Open command palette"
            className="border-border bg-surface text-muted hover:text-fg hover:border-accent/50 focus-visible:outline-focus hidden h-9 items-center gap-2 rounded-lg border px-3 text-xs transition-colors sm:flex"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">Search</span>
            <kbd className="border-border bg-surface-2 hidden rounded border px-1.5 py-0.5 font-mono text-[10px] md:inline">
              ⌘K
            </kbd>
          </button>
          <ThemeSlider />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="border-border bg-surface text-muted hover:text-fg focus-visible:outline-focus grid h-9 w-9 place-items-center rounded-lg border transition-colors md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-border bg-bg border-t md:hidden"
      >
        <Container className="flex flex-col gap-4 py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`focus-visible:outline-focus block rounded-md px-3 py-3 text-base ${
                      isActive(item.href) ? "text-accent" : "text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-border flex items-center justify-between border-t pt-4">
            <span className="text-muted font-mono text-xs">@{site.handle}</span>
            <SocialLinks />
          </div>
        </Container>
      </div>
    </header>
  );
}
