import type { Metadata } from "next";
import { Approach } from "@/components/sections/approach";
import { ContactCta } from "@/components/sections/contact-cta";
import { CaptionedPhoto } from "@/components/ui/captioned-photo";
import { PageIntro } from "@/components/ui/page-intro";
import { photos } from "@/content/images";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Marketing and digital marketing, branding, content production, events and promotions, training and business consultancy from Fola Creative Agency.",
  alternates: { canonical: "/services" },
};

/** Photographs placed between service areas, keyed by the service they follow. */
const interludes: Partial<Record<string, { photo: (typeof photos)[keyof typeof photos]; caption: string }>> = {
  branding: { photo: photos.workingSession, caption: "Planning session with the team." },
  content: { photo: photos.cameraBts, caption: "Behind the camera on a portrait shoot." },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Services"
        lede={
          <p>
            We help businesses communicate their value, improve their visibility and pursue sustainable growth. Choose a
            single service or bring us in across strategy, creative and production.
          </p>
        }
      />

      <nav aria-label="Service areas" className="wrap pb-12">
        <ul className="flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium transition-colors duration-200 hover:border-line-strong"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-line-strong">
        {services.map((service) => {
          const interlude = interludes[service.slug];
          return (
            <div key={service.slug}>
              <section
                id={service.slug}
                aria-labelledby={`${service.slug}-title`}
                className="wrap grid gap-8 border-b border-line py-16 lg:grid-cols-12 lg:gap-16 lg:py-20"
              >
                <div className="lg:col-span-5">
                  <h2 id={`${service.slug}-title`} className="type-heading text-[clamp(2rem,3.6vw,3rem)]">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-md text-fg-muted">{service.summary}</p>
                </div>
                <ul className="grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
                  {service.items.map((item) => (
                    <li key={item} className="border-b border-line py-3.5 text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              {interlude ? (
                <div className="wrap grid border-b border-line py-16 lg:grid-cols-12">
                  <CaptionedPhoto
                    className={service.slug === "branding" ? "lg:col-span-7" : "lg:col-span-5 lg:col-start-8"}
                    photo={interlude.photo}
                    caption={interlude.caption}
                    aspect={service.slug === "branding" ? "aspect-[16/10]" : "aspect-[4/5]"}
                    objectPosition={service.slug === "branding" ? "50% 60%" : "50% 50%"}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <Approach />
      <ContactCta />
    </>
  );
}
