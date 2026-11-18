import type { Metadata } from "next";
import Image from "next/image";
import { ContactCta } from "@/components/sections/contact-cta";
import { Parallax } from "@/components/motion/parallax";
import { PageIntro } from "@/components/ui/page-intro";
import { RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";
import { brandsServedFirstYearWords, founded, founder, mission, roadmap, values, vision } from "@/content/agency";
import { photos } from "@/content/images";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Fola Creative Agency is a Liberian-owned marketing and consultancy company established in September 2025. Our vision, mission, values and plans.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="About FCA"
        lede={
          <p>
            Fola Creative Agency is a Liberian-owned marketing and consultancy company. We exist to help businesses become
            seen, heard and in demand through strategic marketing, creative storytelling and professional brand
            communication.
          </p>
        }
      />

      <section id="story" aria-labelledby="story-title" className="scroll-mt-20">
        <div className="wrap grid items-center gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div data-animate="mask" className="relative aspect-[3/2] overflow-hidden bg-surface-sunken lg:col-span-7">
            <Parallax amount={7}>
              <Image
                src={photos.teamGroup.src}
                alt={photos.teamGroup.alt}
                fill
                quality={70}
                placeholder="blur"
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>
          <div className="lg:col-span-5">
            <SectionLabel index={1} label="Our story" />
            <h2 id="story-title" className="type-heading mt-6 text-[clamp(2rem,3.4vw,3rem)]">
              <RevealWords text="Beyond the idea stage" />
            </h2>
            <div data-animate="stagger" className="mt-6 space-y-4 text-fg-muted">
              <p>
                FCA was established in {founded}. In our first year we served {brandsServedFirstYearWords} brands across
                hospitality, retail, NGOs, beauty, energy and technology, building a portfolio and a working understanding
                of what businesses in the Liberian market need.
              </p>
              <p>
                The agency is owned and managed by {founder.name}, working alongside a team and network of creative
                professionals. Our next chapter is about strengthening, scaling and expanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="purpose" aria-labelledby="purpose-title" className="scroll-mt-20 bg-brand text-on-brand">
        <div className="wrap py-24 lg:py-32">
          <SectionLabel index={2} label="Vision and mission" tone="on-brand" />
          <h2 id="purpose-title" className="sr-only">
            Vision and mission
          </h2>
          <div data-animate="stagger" className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="border-t border-on-brand/25 pt-8">
              <h3 className="text-lg font-semibold text-accent">Our vision</h3>
              <p className="mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-snug font-semibold [font-stretch:112%]">{vision}</p>
            </div>
            <div className="border-t border-on-brand/25 pt-8">
              <h3 className="text-lg font-semibold text-accent">Our mission</h3>
              <p className="mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-snug font-semibold [font-stretch:112%]">{mission}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="values" aria-labelledby="values-title" className="scroll-mt-20">
        <div className="wrap py-24 lg:py-32">
          <SectionLabel index={3} label="Values" />
          <h2 id="values-title" className="type-heading type-section mt-6">
            <RevealWords text="What we value" />
          </h2>
          <dl data-animate="stagger" className="mt-14 grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
            {values.map((value, i) => (
              <div key={value.title} className="group border-b border-line py-8">
                <span aria-hidden="true" className="text-sm font-semibold text-fg-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="mt-2 text-2xl font-bold [font-stretch:112%] transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                  {value.title}
                </dt>
                <dd className="mt-2 text-fg-muted">{value.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="roadmap" aria-labelledby="roadmap-title" className="scroll-mt-20 border-t border-line bg-surface">
        <div className="wrap py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <SectionLabel index={4} label="Roadmap" />
              <h2 id="roadmap-title" className="type-heading type-section mt-6">
                <RevealWords text="Where we're going" />
              </h2>
            </div>
            <p data-animate="rise" className="type-lede lg:col-span-5 lg:col-start-8">
              Our long-term ambition is to grow from a Liberian marketing agency into a recognised African brand.
            </p>
          </div>
          <ol data-animate="stagger" className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {roadmap.map((phase, i) => (
              <li key={phase.period} className="relative pt-8">
                {/* The current phase carries the gold rule; others are neutral. */}
                <span
                  aria-hidden="true"
                  className={i === 1 ? "absolute inset-x-0 top-0 h-[3px] bg-accent" : "absolute inset-x-0 top-0 h-px bg-line-strong"}
                />
                <p className="font-semibold text-fg-muted tabular-nums">{phase.period}</p>
                <h3 className="mt-2 text-2xl font-bold [font-stretch:112%]">
                  {phase.title}
                  {i === 1 ? <span className="ml-2 align-middle text-sm font-semibold text-accent-ink">Now</span> : null}
                </h3>
                <p className="mt-3 text-fg-muted">{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactCta index={5} />
    </>
  );
}
