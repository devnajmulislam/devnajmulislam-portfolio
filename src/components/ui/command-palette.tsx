"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Briefcase,
  Copy,
  FileText,
  FolderGit2,
  Mail,
  Music,
  PenLine,
  Search,
  Sparkles,
  SunMoon,
  User,
} from "lucide-react";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { SocialIcon } from "@/components/ui/brand-icons";
import { useTheme } from "@/components/theme/theme-provider";

export const PALETTE_EVENT = "portfolio:open-palette";
const PLAY_EVENT = "portfolio:play-beat";

const navIcons: Record<string, ReactNode> = {
  About: <User className="h-4 w-4" />,
  Skills: <Sparkles className="h-4 w-4" />,
  Experience: <Briefcase className="h-4 w-4" />,
  Projects: <FolderGit2 className="h-4 w-4" />,
  Writing: <PenLine className="h-4 w-4" />,
  Contact: <Mail className="h-4 w-4" />,
};

interface PaletteItem {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  icon: ReactNode;
  run: () => void;
}

function subscribeNoop() {
  return () => {};
}

export function CommandPalette() {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    setCopied(false);
  };

  const goToSection = (href: string) => {
    const [path, hash] = href.split("#");
    if ((path === "" || path === "/") && hash) {
      document
        .getElementById(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(href);
    }
  };

  const items: PaletteItem[] = (() => {
    const navigation: PaletteItem[] = navItems.map((item) => ({
      id: `nav-${item.label}`,
      label: `Go to ${item.label}`,
      hint: item.label,
      keywords: `section navigate ${item.label}`,
      icon: navIcons[item.label] ?? <Sparkles className="h-4 w-4" />,
      run: () => goToSection(item.href),
    }));

    const actions: PaletteItem[] = [
      {
        id: "projects-page",
        label: "Browse all projects",
        hint: "/projects",
        keywords: "work portfolio case study",
        icon: <FolderGit2 className="h-4 w-4" />,
        run: () => router.push("/projects"),
      },
      {
        id: "resume",
        label: "Download résumé",
        hint: "PDF",
        keywords: "cv hire resume pdf",
        icon: <FileText className="h-4 w-4" />,
        run: () => window.open(site.resumeUrl, "_blank", "noopener"),
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: site.email,
        keywords: "contact mail clipboard",
        icon: <Copy className="h-4 w-4" />,
        run: () => {
          navigator.clipboard?.writeText(site.email).catch(() => {});
          setCopied(true);
        },
      },
      {
        id: "email",
        label: "Email Najmul",
        hint: "opens mail app",
        keywords: "contact message hire",
        icon: <Mail className="h-4 w-4" />,
        run: () => {
          window.location.assign(`mailto:${site.email}`);
        },
      },
      {
        id: "beat",
        label: "Play the site beat",
        hint: "30s",
        keywords: "music sound audio vibe",
        icon: <Music className="h-4 w-4" />,
        run: () => window.dispatchEvent(new Event(PLAY_EVENT)),
      },
      {
        id: "theme",
        label: "Toggle light / dark theme",
        hint: "appearance",
        keywords: "theme dark light mode color",
        icon: <SunMoon className="h-4 w-4" />,
        run: () => toggleTheme(),
      },
    ];

    const socials: PaletteItem[] = site.socials.map((social) => ({
      id: `social-${social.label}`,
      label: `Open ${social.label}`,
      hint: "social",
      keywords: `social link ${social.label}`,
      icon: (
        <span className="grid h-4 w-4 place-items-center">
          <SocialIcon name={social.icon} className="h-4 w-4" />
        </span>
      ),
      run: () => window.open(social.href, "_blank", "noopener"),
    }));

    return [...navigation, ...actions, ...socials];
  })();

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? items.filter((item) =>
        `${item.label} ${item.hint} ${item.keywords}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : items;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        setQuery("");
        setCopied(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const onToggle = () => setOpen((value) => !value);
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener(PALETTE_EVENT, onToggle);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(PALETTE_EVENT, onToggle);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const runItem = (item: PaletteItem) => {
    item.run();
    if (item.id !== "copy-email") close();
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length ? (index + 1) % filtered.length : 0,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length ? (index - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[activeIndex];
      if (item) runItem(item);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close command palette"
        onClick={close}
        className={`bg-bg/70 absolute inset-0 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={`border-border bg-surface absolute top-[12vh] left-1/2 w-[min(38rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border shadow-2xl transition-all duration-150 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="border-border flex items-center gap-3 border-b px-4 py-3">
          <Search className="text-muted h-4 w-4 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Search sections, actions, socials…"
            className="text-fg placeholder:text-muted/70 w-full bg-transparent text-sm outline-none"
          />
          <kbd className="border-border bg-surface-2 text-muted hidden rounded border px-1.5 py-0.5 font-mono text-[10px] sm:inline-block">
            Esc
          </kbd>
        </div>

        <ul
          ref={listRef}
          className="max-h-[52vh] overflow-y-auto p-2"
          role="listbox"
        >
          {filtered.length === 0 ? (
            <li className="text-muted px-3 py-6 text-center text-sm">
              No matches for “{query}”
            </li>
          ) : (
            filtered.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runItem(item)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    index === activeIndex
                      ? "bg-accent/12 text-fg"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border ${
                      index === activeIndex
                        ? "border-accent/40 text-accent"
                        : "border-border text-muted"
                    }`}
                  >
                    {item.id === "copy-email" && copied ? (
                      <span className="text-accent text-xs">✓</span>
                    ) : (
                      item.icon
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  <span className="text-muted/70 max-w-[40%] shrink-0 truncate font-mono text-[11px]">
                    {item.id === "copy-email" && copied ? "copied" : item.hint}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="border-border text-muted flex items-center justify-between border-t px-4 py-2 font-mono text-[10px]">
          <span className="flex items-center gap-1.5">
            <kbd className="border-border bg-surface-2 rounded border px-1">↑</kbd>
            <kbd className="border-border bg-surface-2 rounded border px-1">↓</kbd>
            to navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="border-border bg-surface-2 rounded border px-1">↵</kbd>
            to select
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
