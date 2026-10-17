export interface ProjectScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  name: string;
  nativeName?: string;
  tagline: string;
  summary: string;
  description: string;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  year: string;
  screenshot: ProjectScreenshot;
  highlights: string[];
  challenges: string[];
  improvements: string[];
  futurePlans: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "bazardor",
    name: "BazarDor",
    nativeName: "বাজার দর",
    tagline: "Check daily market prices before you head to the bazar.",
    summary:
      "A daily market-price checker that helps people plan their shopping budget before going to the market.",
    description:
      "BazarDor (বাজার দর, meaning “market price”) is a friendly web application that helps people check daily market prices so they can plan their shopping budget in advance. Users can browse products by category, open a product to see its full details and current price, and create an account to manage their profile.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Better Auth",
      "MongoDB",
    ],
    liveUrl: "https://bazar-dor-rho-two.vercel.app/",
    repoUrl: "https://github.com/devnajmulislam/bazar-dor",
    year: "2026",
    screenshot: {
      src: "/images/projects/bazardor.png",
      alt: "BazarDor home page showing a banner and product listings",
      width: 1440,
      height: 900,
    },
    highlights: [
      "Email/password sign-up and sign-in plus Google and GitHub OAuth through Better Auth.",
      "Category filtering with dedicated category routes.",
      "Product detail pages that show the current price for each item.",
      "A profile page where logged-in users can view their account information.",
      "Announcement marquee, banner and responsive navigation.",
    ],
    challenges: [
      "Connecting Better Auth to a MongoDB adapter and a custom auth client, including OAuth sign-in and session-aware UI.",
      "Building nested dynamic routes for categories and products with sensible not-found handling.",
      "Customising DaisyUI components so the interface felt intentional instead of looking like a default theme.",
      "Keeping large hero and marquee sections responsive across phones and desktops.",
    ],
    improvements: [
      "Replace static product data with a live price feed or an admin dashboard for updating prices.",
      "Add search, sorting and pagination to product and category listings.",
      "Persist price history so users can track how prices change over time.",
      "Add automated tests around the authentication flow and dynamic routes.",
    ],
    futurePlans: [
      "Introduce location-aware pricing for different markets and cities.",
      "Add per-user shopping lists and budget tracking.",
      "Improve accessibility and add Bengali/English language switching.",
    ],
    featured: true,
  },
  {
    slug: "fitlog",
    name: "Fit Log",
    tagline: "Plan today's workout and save exercises for later.",
    summary:
      "A gym workout manager to browse exercises, build today's plan and save workouts for later.",
    description:
      "Fit Log is a workout management app where users browse a library of gym exercises, open any exercise for full details, add exercises to today's plan, and save workouts for later. The plan page summarises total exercises, minutes and calories, and supports sorting and completion tracking.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Context API",
      "React Toastify",
    ],
    liveUrl: "https://devnajmulislam-fit-log.vercel.app/",
    repoUrl: "https://github.com/devnajmulislam/fit-log",
    year: "2026",
    screenshot: {
      src: "/images/projects/fitlog.png",
      alt: "Fit Log workout library showing exercise cards",
      width: 1440,
      height: 900,
    },
    highlights: [
      "Workout library rendered as a responsive card grid.",
      "Dynamic detail pages for every exercise, including muscle groups, equipment and step-by-step instructions.",
      "Today's Plan with totals for exercises, workout minutes and calories.",
      "Separate tabs for Today's Plan and saved workouts.",
      "Sort by duration, calories or rating, mark workouts as done, remove them, and get toast feedback.",
    ],
    challenges: [
      "Sharing workout state across multiple routes (library, details and my-plan) with the Context API instead of prop drilling.",
      "Looking up the correct exercise on a dynamic route and handling the not-found case gracefully.",
      "Combining tab switching, sorting and completion state on a single plan page without making the UI confusing.",
      "Keeping card grids and summary panels responsive.",
    ],
    improvements: [
      "Persist plans and saved workouts to localStorage or a database so they survive a page reload.",
      "Add user accounts so plans can sync across devices.",
      "Add filtering by muscle group, equipment and difficulty.",
      "Add automated tests for the context logic and dynamic routes.",
    ],
    futurePlans: [
      "Track workout history and show progress over time with simple charts.",
      "Add rest timers and session logging.",
      "Support custom user-created exercises.",
    ],
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
