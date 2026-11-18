import { ScrollDrift } from "@/components/motion/scroll-drift";
import { services } from "@/content/services";
import { site } from "@/config/site";

/**
 * A band of what FCA does, between the hero and the first section. It drifts
 * sideways with the reader's scrolling (never on its own). The list is read once
 * by assistive technology; the repeat that fills the band is hidden.
 */
export function Marquee() {
  const items = [site.tagline, ...services.map((s) => s.title)];
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 whitespace-nowrap sm:px-10">{item}</span>
          <span aria-hidden="true" className="size-2 shrink-0 rotate-45 bg-accent" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="What we do, at a glance" className="overflow-hidden bg-brand py-5 text-on-brand sm:py-6">
      <ScrollDrift from={-4} to={-34} className="type-display flex w-max text-[clamp(1.25rem,2.6vw,2.25rem)]">
        {row(false)}
        {row(true)}
        {row(true)}
      </ScrollDrift>
    </section>
  );
}
