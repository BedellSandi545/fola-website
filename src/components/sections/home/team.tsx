import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Parallax } from "@/components/motion/parallax";
import { RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";
import { photos } from "@/content/images";

/** Home › Team: the group photograph and how FCA works alongside clients. */
export function Team({ index }: { index: number }) {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="wrap grid items-end gap-10 py-24 lg:grid-cols-12 lg:gap-16 lg:py-36">
        <div data-animate="mask" className="relative aspect-[3/2] overflow-hidden bg-surface-sunken lg:col-span-8">
          <Parallax amount={7}>
            <Image
              src={photos.teamGroup.src}
              alt={photos.teamGroup.alt}
              fill
              quality={70}
              placeholder="blur"
              sizes="(min-width: 1440px) 900px, (min-width: 1024px) 64vw, 100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
        <div className="lg:col-span-4">
          <SectionLabel index={index} label="Team" />
          <h2 id="team-title" className="type-heading mt-6 text-[clamp(2rem,3.4vw,3rem)]">
            <RevealWords text="A team that gets involved." />
          </h2>
          <p data-animate="rise" className="mt-5 text-fg-muted">
            From the first conversation to the final edit, we work alongside you. FCA brings together a team and network
            of creative professionals across strategy, design, photography, videography and copywriting.
          </p>
          <ButtonLink
            href="/about"
            variant="secondary"
            className="mt-8"
            icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
          >
            About us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
