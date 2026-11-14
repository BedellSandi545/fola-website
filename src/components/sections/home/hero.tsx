import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroMotion } from "@/components/motion/hero-motion";
import { photos } from "@/content/images";

/**
 * Signature composition: poster headline beside the beach event photograph.
 * From lg up the hero fills the first screen and the photograph bleeds to the
 * right edge of the viewport at full hero height, with its caption set on a scrim.
 * Below lg the photograph follows the copy as a framed 4:5 crop.
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
        </div>

        {/* On lg the figure leaves the grid and fills the right of the section, edge to edge. */}
        <figure className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[42%] xl:w-[45%]">
          <div
            data-hero-media
            data-reveal
            className="relative aspect-[4/5] overflow-hidden bg-surface-sunken sm:aspect-[4/3] lg:aspect-auto lg:h-full"
          >
            <Image
              src={photos.beachEvent.src}
              alt={photos.beachEvent.alt}
              fill
              preload
              quality={70}
              placeholder="blur"
              sizes="(min-width: 1280px) 45vw, (min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[60%_45%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            />
            <figcaption
              data-hero-fade
              data-reveal
              className="absolute inset-x-0 bottom-0 max-w-md p-5 text-sm leading-snug text-white sm:p-6 lg:p-8"
            >
              Event planning and coordination: behind the scenes of a summer beach event.
            </figcaption>
          </div>
        </figure>
      </HeroMotion>
    </section>
  );
}
