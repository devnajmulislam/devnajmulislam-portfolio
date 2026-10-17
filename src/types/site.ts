export type SocialIcon = "github" | "linkedin" | "twitter" | "devto";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}
