import { ArrowDown, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroMotion } from "@/components/motion/hero-motion";
import { HeroVideo } from "@/components/sections/home/hero-video";

/**
 * Signature composition: poster headline beside FCA's first-year film.
 * From lg up the hero fills the first screen and the film column bleeds to the
 * right edge of the viewport at full height; the 9:16 film sits whole in a frame
 * on an ambient backdrop drawn from the film itself. Below lg the film follows
 * the copy, full-bleed.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <HeroMotion className="wrap grid gap-y-10 pt-10 pb-16 sm:pt-14 lg:min-h-[min(calc(100svh-4.5rem-1px),60rem)] lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="@container relative z-10 lg:col-span-7 lg:pr-12 xl:col-span-6 xl:pr-0">
          <h1 id="hero-title" className="type-display text-[min(17cqi,6rem)] sm:text-[min(12.4cqi,8rem)]">
            <span data-hero-line data-reveal className="block">
              Seen.
            </span>
            <span data-hero-line data-reveal className="block">
              Heard.
            </span>
            <span data-hero-line data-reveal className="block sm:whitespace-nowrap">
              In demand.
            </span>
          </h1>
          <p data-hero-fade data-reveal className="type-lede mt-8 max-w-[34rem] lg:mt-10">
            Fola Creative Agency is a Liberian marketing and creative agency. We help businesses grow, connect and win
            with strategy-led creativity, content and campaigns built to connect.
          </p>
          <div data-hero-fade data-reveal className="mt-8 flex flex-wrap gap-3 lg:mt-10">
            <ButtonLink
              href="/contact"
              icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
            >
              Start a project
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              See our work
            </ButtonLink>
          </div>
          <a
            href="#about"
            data-hero-fade
            data-reveal
            className="group mt-12 hidden min-h-11 items-center gap-3 text-sm font-semibold text-fg-muted transition-colors duration-200 hover:text-fg lg:inline-flex"
          >
            <span className="relative flex h-10 w-6 justify-center rounded-full border border-current">
              <ArrowDown aria-hidden="true" className="scroll-cue mt-2 size-3.5" />
            </span>
            Scroll to explore
          </a>
        </div>

        {/* On lg the film column leaves the grid and fills the right of the section, edge to edge.
            Below lg it runs full-bleed under the copy. */}
        <div
          data-hero-media
          data-reveal
          className="-mx-[var(--gutter)] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:w-[42%] xl:w-[45%]"
        >
          <HeroVideo className="h-full" />
        </div>
      </HeroMotion>
    </section>
  );
}
