import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { brandsServedFirstYearWords, pillars, sectors } from "@/content/agency";
import { photos } from "@/content/images";
import { ButtonLink } from "@/components/ui/button-link";
import { RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";

const listFormatter = new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" });

/** Home › About us: who FCA is and the four reasons to work with them. */
export function Positioning({ index }: { index: number }) {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20">
      <div className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-36">
        <div className="lg:col-span-5">
          <SectionLabel index={index} label="About us" />
          <h2 id="about-title" className="type-heading type-section mt-6">
            <RevealWords text="More than just marketing." />
          </h2>
          <p data-animate="rise" className="type-lede mt-6 max-w-md" style={{ "--d": "150ms" } as CSSProperties}>
            We help brands grow, connect and win. In our first year we worked with {brandsServedFirstYearWords} brands
            across {listFormatter.format(sectors.map((s) => (s === "NGOs" ? s : s.toLowerCase())))}.
          </p>
          <div data-animate="mask" className="relative mt-10 hidden aspect-[4/3] overflow-hidden bg-surface-sunken lg:block">
            <Image
              src={photos.workingSession.src}
              alt={photos.workingSession.alt}
              fill
              quality={70}
              placeholder="blur"
              sizes="(min-width: 1440px) 520px, 38vw"
              className="object-cover object-[50%_60%]"
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-14">
          <dl data-animate="stagger" className="border-t border-line-strong">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="group grid gap-2 border-b border-line py-8 transition-colors duration-300 sm:grid-cols-[3rem_minmax(0,14rem)_1fr] sm:gap-6"
              >
                <span aria-hidden="true" className="hidden pt-1 text-sm font-semibold text-fg-muted tabular-nums sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="text-xl font-bold [font-stretch:112%] transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                  {pillar.title}
                </dt>
                <dd className="text-fg-muted">{pillar.body}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink
            href="/about"
            variant="secondary"
            className="mt-10"
            icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
          >
            More about us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
