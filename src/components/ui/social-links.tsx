import { site } from "@/data/site";
import { SocialIcon } from "@/components/ui/brand-icons";

export function SocialLinks({
  className = "",
  itemClassName = "",
}: {
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={`flex items-center gap-1.5 ${className}`}>
      {site.socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${social.label}`}
            title={social.label}
            className={`border-border bg-surface text-muted hover:text-accent hover:border-accent/60 focus-visible:outline-focus grid h-9 w-9 place-items-center rounded-lg border transition-colors ${itemClassName}`}
          >
            <SocialIcon name={social.icon} className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
