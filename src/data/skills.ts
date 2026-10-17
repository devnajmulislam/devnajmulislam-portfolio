export type SkillIcon = "frontend" | "backend" | "database" | "tools";

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: SkillIcon;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that stay readable and responsive on any screen.",
    icon: "frontend",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Server logic, APIs and authentication for real apps.",
    icon: "backend",
    items: ["Node.js", "Express.js", "Better Auth", "Firebase"],
  },
  {
    id: "database",
    title: "Database",
    description: "Storing and querying application data.",
    icon: "database",
    items: ["MongoDB"],
  },
  {
    id: "tools",
    title: "Tools",
    description: "The everyday toolkit for building and shipping.",
    icon: "tools",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Netlify", "Postman"],
  },
];
