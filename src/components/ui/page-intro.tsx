import type { ReactNode } from "react";
import { HeroMotion } from "@/components/motion/hero-motion";

/**
 * Opening block for inner pages: an eyebrow naming the page, a poster title whose
 * words rise into place on load, and a lede. Uses the hero's entrance timeline.
 */
export function PageIntro({
  title,
  eyebrow,
  lede,
  children,
}: {
  title: string;
  eyebrow: string;
  lede: ReactNode;
  children?: ReactNode;
}) {
  const words = title.split(/\s+/).filter(Boolean);
  return (
    <section className="relative overflow-hidden border-b border-line">
      <HeroMotion className="wrap grid gap-8 pt-14 pb-16 lg:grid-cols-12 lg:pt-24 lg:pb-24">
        <p
          data-hero-fade
          data-reveal
          className="flex items-center gap-3 text-[0.8rem] font-semibold tracking-[0.18em] text-fg-muted uppercase [font-stretch:112%] lg:col-span-12"
        >
          <span aria-hidden="true" className="block h-px w-10 bg-accent" />
          {eyebrow}
        </p>
        <h1 className="type-display text-[clamp(2.9rem,8vw,7rem)] lg:col-span-10">
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              <span className="word">
                <span data-hero-line data-reveal>
                  {word}
                </span>
              </span>
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
        <div data-hero-fade data-reveal className="lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="mb-6 block h-[3px] w-16 bg-accent" />
          <div className="type-lede">{lede}</div>
          {children}
        </div>
      </HeroMotion>
    </section>
  );
}
