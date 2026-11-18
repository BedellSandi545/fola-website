import { ArrowUpRight } from "lucide-react";
import { contact } from "@/config/site";
import { SocialIcon } from "@/components/brand/social-icon";
import { cn } from "@/lib/cn";

type SocialLinksProps = {
  /** "list" shows network and handle; "icons" is a compact row of round buttons. */
  variant?: "list" | "icons";
  /** "on-brand" for the navy footer. */
  tone?: "default" | "on-brand";
  className?: string;
};

/** Every social profile, each a real link that opens in a new tab. */
export function SocialLinks({ variant = "list", tone = "default", className }: SocialLinksProps) {
  const onBrand = tone === "on-brand";

  if (variant === "icons") {
    return (
      <ul className={cn("flex flex-wrap gap-2", className)}>
        {contact.social.map((s) => (
          <li key={s.network}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label}: ${s.handle} (opens in a new tab)`}
              title={s.label}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5",
                onBrand
                  ? "border-on-brand/30 text-on-brand hover:border-accent hover:bg-accent hover:text-on-accent"
                  : "border-line text-fg hover:border-fg hover:bg-fg hover:text-bg",
              )}
            >
              <SocialIcon network={s.network} className="size-[1.15rem]" />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("space-y-1", className)}>
      {contact.social.map((s) => (
        <li key={s.network}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex min-h-12 items-center gap-3 py-1 transition-colors duration-200",
              onBrand ? "text-on-brand-muted hover:text-on-brand" : "text-fg-muted hover:text-fg",
            )}
          >
            <span
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                onBrand
                  ? "border-on-brand/25 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
                  : "border-line group-hover:border-fg group-hover:bg-fg group-hover:text-bg",
              )}
            >
              <SocialIcon network={s.network} className="size-[1.05rem]" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className={cn("block text-sm font-semibold", onBrand ? "text-on-brand" : "text-fg")}>{s.label}</span>
              <span className="block truncate text-sm">{s.handle}</span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="ml-auto size-4 shrink-0 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
