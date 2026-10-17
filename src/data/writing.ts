export interface Article {
  title: string;
  description: string;
  href: string;
  source: string;
  date: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    title: "Why I Choose the MERN Stack",
    description:
      "A beginner-friendly explanation of what a stack really is, and why the MERN stack became my toolkit of choice — with a simple house-building analogy for how each layer fits together.",
    href: "https://dev.to/devnajmulislam/why-i-choose-the-mern-stack-2ehp",
    source: "DEV Community",
    date: "Jul 27, 2026",
    tags: ["MERN", "JavaScript", "Beginners"],
  },
];
