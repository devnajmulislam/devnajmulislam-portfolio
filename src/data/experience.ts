export interface ExperienceEntry {
  role: string;
  company: string;
  companyNote?: string;
  type: string;
  location: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  technologies?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Content Writer",
    company: "Russkin Bright",
    companyNote: "Marketing Agency",
    type: "Full-time",
    location: "On-site · Sylhet, Bangladesh",
    period: "Feb 2026 — Present",
    current: true,
    responsibilities: [
      "Write blog posts, website copy and social-media captions for client brands.",
      "Research topics and keywords to produce clear, SEO-friendly articles.",
      "Edit and proofread content for grammar, tone and accuracy.",
      "Coordinate with designers and marketers to align content with campaigns and deadlines.",
    ],
  },
];
