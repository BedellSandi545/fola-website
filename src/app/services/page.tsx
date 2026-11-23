import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, servicesJsonLd } from "@/lib/structured-data";
import { ContactCta } from "@/components/sections/contact-cta";
import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { PageIntro } from "@/components/ui/page-intro";
import { RevealWords } from "@/components/ui/reveal-words";
import { photos } from "@/content/images";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Marketing and digital marketing, branding, content production, events and promotions, training and business consultancy from Fola Creative Agency.",
  path: "/services",
});

type Interlude = {
  photo: (typeof photos)[keyof typeof photos];
  caption: string;
  /** Which side the photograph sits on (desktop); interludes alternate down the page. The caption takes the other side. */
  side: "left" | "right";
  /** Photograph width in the 12-column grid. */
  span: "lg:col-span-7" | "lg:col-span-5";
  aspect: string;
  objectPosition: string;
  sizes: string;
};

/** Photographs placed inside a service area, below its list, keyed by service. */
const interludes: Partial<Record<string, Interlude>> = {
  branding: {
    photo: photos.workingSession,
    caption: "Planning session with the team.",
    side: "left",
    span: "lg:col-span-7",
    aspect: "aspect-[16/10]",
    objectPosition: "50% 60%",
    sizes: "(min-width: 1024px) 56vw, 100vw",
  },
  content: {
    photo: photos.cameraBts,
    caption: "Behind the camera on a portrait shoot.",
    side: "right",
    span: "lg:col-span-5",
    aspect: "aspect-[4/5]",
    objectPosition: "50% 50%",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
  // Brochure caption. Added at the client's request (2026-11-20).
  events: {
    photo: photos.beachEvent,
    caption: "Event planning and coordination: behind the scenes of a summer beach event.",
    side: "left",
    span: "lg:col-span-5",
    aspect: "aspect-[4/5]",
    objectPosition: "60% 50%",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Services", path: "/services" }]), servicesJsonLd()]} />
      <PageIntro
        eyebrow="Services"
        title="Services"
        lede={
          <p>
            We help businesses communicate their value, improve their visibility and pursue sustainable growth. Choose a
            single service or bring us in across strategy, creative and production.
          </p>
        }
      />

      <nav aria-label="Service areas" className="wrap py-10">
        <ul data-animate="stagger" className="flex flex-wrap gap-2">
          {services.map((s, i) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-[border-color,background-color,color] duration-200 hover:border-fg hover:bg-fg hover:text-bg"
              >
                <span aria-hidden="true" className="tabular-nums opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-line-strong">
        {services.map((service, i) => {
          const interlude = interludes[service.slug];
          return (
            <div key={service.slug} className={cn(i % 2 === 1 && "bg-surface")}>
              <section
                id={service.slug}
                aria-labelledby={`${service.slug}-title`}
                className="wrap grid scroll-mt-24 gap-8 border-b border-line py-20 lg:grid-cols-12 lg:gap-16 lg:py-28"
              >
                <div className="lg:col-span-5">
                  <p aria-hidden="true" className="text-[clamp(3rem,6vw,5rem)] leading-none font-extrabold text-accent-ink tabular-nums [font-stretch:125%]">
                    <span data-animate="rise" className="block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </p>
                  <h2 id={`${service.slug}-title`} className="type-heading mt-6 text-[clamp(2rem,3.6vw,3rem)]">
                    <RevealWords text={service.title} />
                  </h2>
                  <p data-animate="rise" className="mt-4 max-w-md text-fg-muted">
                    {service.summary}
                  </p>
                </div>
                <ul data-animate="stagger" className="grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center gap-3 border-b border-line py-4 text-lg transition-colors duration-200"
                    >
                      <span
                        aria-hidden="true"
                        className="block h-px w-3 bg-accent transition-[width] duration-300 ease-out-expo group-hover:w-6"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              {interlude ? (
                <figure className="wrap grid items-end gap-8 border-b border-line py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
                  <div
                    data-animate="mask"
                    className={cn(
                      "group relative overflow-hidden bg-surface-sunken",
                      interlude.aspect,
                      interlude.span,
                      interlude.side === "right" && "lg:order-2 lg:col-start-8",
                    )}
                  >
                    <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
                      <Parallax amount={7}>
                        <Image
                          src={interlude.photo.src}
                          alt={interlude.photo.alt}
                          fill
                          quality={70}
                          placeholder="blur"
                          sizes={interlude.sizes}
                          className="object-cover"
                          style={{ objectPosition: interlude.objectPosition }}
                        />
                      </Parallax>
                    </div>
                  </div>
                  {/* The caption answers the photograph from the other side of the grid. */}
                  <figcaption
                    data-animate="rise"
                    className={cn(
                      "lg:col-span-5 lg:pb-4",
                      interlude.side === "right" ? "lg:order-1 lg:col-start-1" : "lg:col-start-8",
                    )}
                  >
                    <span aria-hidden="true" className="mb-5 block h-[3px] w-12 bg-accent" />
                    <p className="text-[clamp(1.35rem,2.2vw,2rem)] leading-snug font-bold [font-stretch:112%]">
                      {interlude.caption}
                    </p>
                  </figcaption>
                </figure>
              ) : null}
            </div>
          );
        })}
      </div>

      <ContactCta />
    </>
  );
}
