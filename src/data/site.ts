import type { SocialLink } from "@/types/site";

export interface SiteConfig {
  name: string;
  nickname: string;
  handle: string;
  designation: string;
  tagline: string;
  taglines: string[];
  location: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string | null;
  resumeUrl: string;
  description: string;
  socials: SocialLink[];
}

export const site: SiteConfig = {
  name: "Najmul Islam",
  nickname: "Nahid",
  handle: "devnajmulislam",
  designation: "Full-Stack (MERN) Web Developer",
  tagline: "Content Writer",
  taglines: [
    "Full-Stack (MERN) Web Developer",
    "React & Next.js Enthusiast",
    "Content Writer",
    "Movie & Travel Lover",
  ],
  location: "Sylhet, Bangladesh",
  email: "itzmenajmul@gmail.com",
  phone: "+8801778992196",
  phoneDisplay: "+880 1778-992196",
  whatsapp: "+8801778992196",
  resumeUrl: "/resume/najmul-islam-resume.pdf",
  description:
    "Najmul Islam (Nahid) is an aspiring full-stack developer learning the MERN stack through Programming Hero, building practical web apps and writing clear technical content.",
  socials: [
    { label: "GitHub", href: "https://github.com/devnajmulislam", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/devnajmulislam/",
      icon: "linkedin",
    },
    { label: "X (Twitter)", href: "https://x.com/devnajmulislam", icon: "twitter" },
    { label: "DEV.to", href: "https://dev.to/devnajmulislam", icon: "devto" },
  ],
};
