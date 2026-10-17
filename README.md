# Najmul Islam — Developer Portfolio

A Linux/terminal-inspired developer portfolio for **Najmul Islam (Nahid)**, built with Next.js, TypeScript and Tailwind CSS. It presents an honest picture of an aspiring full-stack (MERN) developer: real projects, real experience and a deliberate dark/light theme with a custom drag-to-switch control.

## Tech stack

- **Next.js** (App Router) + **React**
- **TypeScript**
- **Tailwind CSS v4** with CSS-variable design tokens
- **lucide-react** icons and hand-built brand icons
- **Playwright** (dev-only) for capturing real project screenshots

No backend or database is required — all content lives in typed data files.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                  | What it does                                             |
| ----------------------- | -------------------------------------------------------- |
| `npm run dev`           | Start the development server                             |
| `npm run build`         | Create a production build                                |
| `npm run start`         | Run the production build                                 |
| `npm run lint`          | Run ESLint                                               |
| `npm run typecheck`     | Run TypeScript with `--noEmit`                           |
| `npm run screenshots`   | Re-capture real project screenshots from the live sites  |

## Project structure

```
src/
├─ app/                    # Routes (App Router)
│  ├─ page.tsx             # Home (hero + all sections)
│  ├─ projects/page.tsx    # Projects listing
│  ├─ projects/[slug]/     # Per-project detail pages
│  ├─ not-found.tsx        # Custom 404
│  ├─ opengraph-image.tsx  # Generated Open Graph image
│  ├─ robots.ts, sitemap.ts
│  ├─ icon.svg             # Monogram favicon
│  └─ globals.css          # Design tokens + base styles
├─ components/
│  ├─ layout/              # Container, Navbar, Footer
│  ├─ sections/            # Hero, About, Skills, Learning, Experience, Projects, Writing, Contact
│  ├─ projects/            # ProjectCard
│  ├─ theme/               # ThemeProvider + custom ThemeSlider
│  └─ ui/                  # Section, ResumeButton, SocialLinks, Brand, brand icons
├─ data/                   # All editable content (typed)
└─ types/                  # Shared types
```

## Editing content

Everything you would normally want to change lives in `src/data/`:

- `site.ts` — name, designation, email, phone, social links, resume path
- `about.ts` — intro, story paragraphs, quick facts, interests
- `skills.ts` — skill categories and items
- `education.ts` — training/learning entries
- `experience.ts` — jobs and responsibilities
- `projects.ts` — project cards and detail-page content
- `writing.ts` — articles
- `nav.ts` — navigation items

The resume button reads `site.resumeUrl`. When the string is set it renders a real `download` link; when it is empty it renders a clickable "coming soon" fallback that keeps working.

## The theme slider

The navbar control is a compact **vertical slider**, not a static moon/sun toggle:

- Drag the thumb **down for light**, **up for dark**.
- Also works with click/tap and keyboard (`Space`/`Enter` to toggle, `↑`/`↓` to pick a theme).
- It exposes `role="switch"` and `aria-checked` for screen readers.
- The choice persists in `localStorage` and a small inline script sets the theme before first paint to avoid any flash.
- It uses pointer capture with `touch-action: none` scoped to the control, so page scrolling stays intact, and it honours `prefers-reduced-motion`.

## Motion & animation

The site uses small, purposeful animations instead of heavy effects:

- **Rotating tagline** — the role line under the name types and deletes letter by letter with a blinking cursor (see `RotatingText`). It falls back to static text under `prefers-reduced-motion`.
- **Scroll reveals** — sections fade and rise into view as you scroll (`Reveal`, built on `IntersectionObserver`).
- **Scroll progress bar** — a thin gradient bar at the top tracks reading position.
- **Micro-interactions** — animated nav underlines, lifting project/skill/writing cards, a waving hand by the name, and a slow aurora glow behind the hero.

All of it is disabled or simplified when a visitor prefers reduced motion, and content is always visible without JavaScript.

## Screenshots

Real screenshots are captured from the live deployed apps:

```bash
npm run screenshots
```

This writes `public/images/projects/*.png` at 1440×900. To point at different projects, edit `scripts/capture-screenshots.mjs`.

## Deployment

1. Push the repository to GitHub.
2. Import it into Vercel (or any Next.js host).
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL so metadata, the sitemap and Open Graph use the correct domain.

## License

Personal project. Content and images belong to Najmul Islam.
