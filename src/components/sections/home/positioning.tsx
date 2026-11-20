import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { sectors } from "@/content/agency";
import { photos } from "@/content/images";
import { Parallax } from "@/components/motion/parallax";
import { ButtonLink } from "@/components/ui/button-link";
import { RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";

const listFormatter = new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" });

/**
 * Home › About us: who FCA is, beside a team photograph. The four "why work with
 * FCA" pillars were removed at the client's request (2026-11-19).
 */
export function Positioning({ index }: { index: number }) {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20">
      <div className="wrap grid items-center gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-36">
        <div className="lg:col-span-5">
          <SectionLabel index={index} label="About us" />
          <h2 id="about-title" className="type-heading type-section mt-6">
            <RevealWords text="More than just marketing." />
          </h2>
          <p data-animate="rise" className="type-lede mt-6 max-w-md" style={{ "--d": "150ms" } as CSSProperties}>
            We help brands grow, connect and win. In our first year we worked with brands across {listFormatter.format(sectors.map((s) => (s === "NGOs" ? s : s.toLowerCase())))}.
          </p>
          <ButtonLink
            href="/about"
            variant="secondary"
            className="mt-10"
            icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
          >
            More about us
          </ButtonLink>
        </div>

        <div
          data-animate="mask"
          className="relative aspect-[4/3] overflow-hidden bg-surface-sunken lg:col-span-6 lg:col-start-7"
        >
          <Parallax amount={7}>
            <Image
              src={photos.workingSession.src}
              alt={photos.workingSession.alt}
              fill
              quality={70}
              placeholder="blur"
              sizes="(min-width: 1440px) 660px, (min-width: 1024px) 46vw, 100vw"
              className="object-cover object-[50%_60%]"
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
