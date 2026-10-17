import type { SVGProps } from "react";
import {
  siBetterauth,
  siCss,
  siExpress,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMongodb,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siPostman,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";

export interface TechIconData {
  title: string;
  hex: string;
  path: string;
}

const visualStudioCode: TechIconData = {
  title: "Visual Studio Code",
  hex: "007ACC",
  path: "M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.706.29l-9.46 8.63-4.12-3.128a1 1 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479l1.323 1.199a1 1 0 0 0 1.276.058l4.12-3.128 9.46 8.63a1.494 1.494 0 0 0 1.705.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448z",
};

export const techIconMap: Record<string, TechIconData> = {
  HTML5: siHtml5,
  CSS3: siCss,
  "JavaScript (ES6+)": siJavascript,
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  "Better Auth": siBetterauth,
  Firebase: siFirebase,
  MongoDB: siMongodb,
  Git: siGit,
  GitHub: siGithub,
  "VS Code": visualStudioCode,
  Vercel: siVercel,
  Netlify: siNetlify,
  Postman: siPostman,
};

export const techStack = Object.keys(techIconMap);

function luminance(hex: string): number {
  const value = hex.replace("#", "");
  const channel = (offset: number) => {
    const c = parseInt(value.slice(offset, offset + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

export function brandColor(label: string): string {
  const icon = techIconMap[label];
  if (!icon) return "var(--muted)";
  if (luminance(icon.hex) > 0.72) {
    return `color-mix(in srgb, var(--fg) 85%, #${icon.hex})`;
  }
  return `color-mix(in srgb, #${icon.hex} 55%, var(--fg))`;
}

export function brandHex(label: string): string | null {
  const icon = techIconMap[label];
  return icon ? `#${icon.hex}` : null;
}

export function brandTint(label: string, surfacePct: number): string | undefined {
  const hex = brandHex(label);
  if (!hex) return undefined;
  return `color-mix(in srgb, ${hex} ${surfacePct}%, var(--surface-2))`;
}

interface TechIconProps extends SVGProps<SVGSVGElement> {
  label: string;
}

export function TechIcon({ label, className, ...props }: TechIconProps) {
  const icon = techIconMap[label];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d={icon.path} />
    </svg>
  );
}
