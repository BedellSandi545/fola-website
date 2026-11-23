import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { ContactCta } from "@/components/sections/contact-cta";
import { CaptionedPhoto } from "@/components/ui/captioned-photo";
import { PageIntro } from "@/components/ui/page-intro";
import { RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";
import { photos } from "@/content/images";
import { fieldNotes } from "@/content/work";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Moments from Fola Creative Agency's work in the field: videography, client consultations, on-site discussions, event coordination and portrait photography.",
  path: "/work",
});

const crops: Record<string, string> = {
  videography: "50% 0%",
  consultation: "50% 40%",
  onsite: "50% 55%",
  "beach-event": "50% 60%",
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Work", path: "/work" }])} />
      <PageIntro
        eyebrow="Work"
        title="Work"
        lede={<p>Moments from our work with businesses across Liberia: on set, on site and behind the scenes.</p>}
      />

      <section id="field" aria-labelledby="field-title" className="scroll-mt-20">
        <div className="wrap pt-20 lg:pt-28">
          <SectionLabel index={1} label="In the field" />
          <h2 id="field-title" className="sr-only">
            Work in the field
          </h2>
        </div>
        <div className="wrap space-y-24 pt-12 pb-24 lg:space-y-36 lg:pb-36">
          {fieldNotes.map((note, index) => {
            const flip = index % 2 === 1;
            return (
              <article key={note.id} className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
                <CaptionedPhoto
                  className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}
                  photo={note.photo}
                  parallax
                  aspect={index === 0 ? "aspect-square" : index === 2 ? "aspect-[4/3]" : "aspect-[4/5]"}
                  objectPosition={crops[note.id]}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                />
                <div className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                  <p data-animate="rise" className="flex items-center gap-3 text-sm font-medium text-fg-muted">
                    <span className="font-semibold text-accent-ink tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                    {note.discipline}
                  </p>
                  <h3 className="type-heading mt-4 text-[clamp(2rem,3.6vw,3rem)]">
                    <RevealWords text={note.title} />
                  </h3>
                  <p data-animate="rise" className="mt-4 text-lg text-fg-muted">
                    {note.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="photography" aria-labelledby="photography-title" className="scroll-mt-20 bg-brand text-on-brand">
        <div className="wrap py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <SectionLabel index={2} label="Photography" tone="on-brand" />
              <h2 id="photography-title" className="type-heading type-section mt-6">
                <RevealWords text="Portrait photography" />
              </h2>
            </div>
            <p data-animate="rise" className="type-lede text-on-brand-muted! lg:col-span-6 lg:col-start-7">
              Studio portraits from an FCA photo session, from the camera&apos;s screen to the final frames.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-12">
            <CaptionedPhoto
              className="col-span-2 lg:col-span-6 lg:[&>div]:h-full"
              photo={photos.portraitDuo}
              aspect="aspect-[4/5] lg:aspect-auto"
              objectPosition="50% 30%"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="col-span-2 grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-6">
              <CaptionedPhoto
                photo={photos.portraitRed}
                aspect="aspect-[3/4]"
                objectPosition="50% 25%"
                sizes="(min-width: 1024px) 23vw, 50vw"
              />
              <CaptionedPhoto
                photo={photos.portraitNavy}
                aspect="aspect-[3/4]"
                objectPosition="50% 25%"
                sizes="(min-width: 1024px) 23vw, 50vw"
              />
              <CaptionedPhoto
                className="col-span-2"
                photo={photos.cameraBts}
                aspect="aspect-[16/9]"
                objectPosition="50% 55%"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactCta index={3} />
    </>
  );
}
