import { cn } from "@/lib/cn";

/**
 * Section marker: "01 — About us". Numbers the chapters of a page so readers
 * always know which section they are in. The gold rule draws in on reveal.
 */
export function SectionLabel({
  index,
  label,
  tone = "default",
  className,
}: {
  index: number;
  label: string;
  tone?: "default" | "on-brand";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.8rem] font-semibold tracking-[0.18em] uppercase [font-stretch:112%]",
        tone === "on-brand" ? "text-on-brand-muted" : "text-fg-muted",
        className,
      )}
    >
      <span className={cn("tabular-nums", tone === "on-brand" ? "text-accent" : "text-accent-ink")}>
        {String(index).padStart(2, "0")}
      </span>
      <span aria-hidden="true" data-animate="line" className="block h-px w-10 bg-current" />
      <span>{label}</span>
    </p>
  );
}
