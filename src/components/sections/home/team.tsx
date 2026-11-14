import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { photos } from "@/content/images";

export function Team() {
  return (
    <section aria-labelledby="team-title" className="wrap grid items-end gap-10 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
      <div className="relative aspect-[3/2] overflow-hidden bg-surface-sunken lg:col-span-8">
        <Image
          src={photos.teamGroup.src}
          alt={photos.teamGroup.alt}
          fill
          quality={70}
          placeholder="blur"
          sizes="(min-width: 1440px) 900px, (min-width: 1024px) 64vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="lg:col-span-4">
        <h2 id="team-title" className="type-heading text-[clamp(2rem,3.4vw,3rem)]">
          A team that gets involved.
        </h2>
        <p className="mt-5 text-fg-muted">
          From the first conversation to the final edit, we work alongside you. FCA brings together a team and network
          of creative professionals across strategy, design, photography, videography and copywriting.
        </p>
        <ButtonLink
          href="/about"
          variant="secondary"
          className="mt-8"
          icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
        >
          About FCA
        </ButtonLink>
      </div>
    </section>
  );
}
