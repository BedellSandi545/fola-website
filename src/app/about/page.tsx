import type { Metadata } from "next";
import Image from "next/image";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageIntro } from "@/components/ui/page-intro";
import { founded, founder, mission, roadmap, values, vision } from "@/content/agency";
import { brandsServedFirstYearWords } from "@/content/clients";
import { photos } from "@/content/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fola Creative Agency is a Liberian-owned marketing and consultancy company established in September 2025. Our vision, mission, values and plans.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="About FCA"
        lede={
          <p>
            Fola Creative Agency is a Liberian-owned marketing and consultancy company. We exist to help businesses become
            seen, heard and in demand through strategic marketing, creative storytelling and professional brand
            communication.
          </p>
        }
      />

      <section aria-labelledby="story-title" className="wrap grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16 lg:pb-32">
        <div className="relative aspect-[3/2] overflow-hidden bg-surface-sunken lg:col-span-7">
          <Image
            src={photos.teamGroup.src}
            alt={photos.teamGroup.alt}
            fill
            quality={70}
            placeholder="blur"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-5">
          <h2 id="story-title" className="type-heading text-[clamp(2rem,3.4vw,3rem)]">
            Beyond the idea stage
          </h2>
          <div className="mt-6 space-y-4 text-fg-muted">
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
      </section>

      <section aria-label="Vision and mission" className="bg-brand text-on-brand">
        <div className="wrap grid gap-16 py-24 lg:grid-cols-2 lg:gap-24 lg:py-32">
          <div>
            <h2 className="text-lg font-semibold text-on-brand-muted">Our vision</h2>
            <p className="mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-snug font-semibold [font-stretch:112%]">{vision}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-on-brand-muted">Our mission</h2>
            <p className="mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-snug font-semibold [font-stretch:112%]">{mission}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="wrap py-24 lg:py-32">
        <h2 id="values-title" className="type-heading text-[clamp(2.25rem,4.4vw,3.75rem)]">
          What we value
        </h2>
        <dl className="mt-14 grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="border-b border-line py-8">
              <dt className="text-2xl font-bold [font-stretch:112%]">{value.title}</dt>
              <dd className="mt-2 text-fg-muted">{value.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="roadmap-title" className="border-t border-line bg-surface">
        <div className="wrap py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 id="roadmap-title" className="type-heading text-[clamp(2.25rem,4.4vw,3.75rem)] lg:col-span-6">
              Where we&apos;re going
            </h2>
            <p className="type-lede lg:col-span-5 lg:col-start-8">
              Our long-term ambition is to grow from a Liberian marketing agency into a recognised African brand.
            </p>
          </div>
          <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {roadmap.map((phase, index) => (
              <li key={phase.period} className="relative pt-8">
                {/* The current phase carries the gold rule; others are neutral. */}
                <span
                  aria-hidden="true"
                  className={index === 1 ? "absolute inset-x-0 top-0 h-[3px] bg-accent" : "absolute inset-x-0 top-0 h-px bg-line-strong"}
                />
                <p className="font-semibold text-fg-muted tabular-nums">{phase.period}</p>
                <h3 className="mt-2 text-2xl font-bold [font-stretch:112%]">
                  {phase.title}
                  {index === 1 ? <span className="ml-2 align-middle text-sm font-semibold text-accent-ink">Now</span> : null}
                </h3>
                <p className="mt-3 text-fg-muted">{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
