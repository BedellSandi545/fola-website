import type { Metadata } from "next";
import { Brands } from "@/components/sections/brands";
import { ContactCta } from "@/components/sections/contact-cta";
import { CaptionedPhoto } from "@/components/ui/captioned-photo";
import { PageIntro } from "@/components/ui/page-intro";
import { photos } from "@/content/images";
import { fieldNotes } from "@/content/work";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Moments from Fola Creative Agency's work in the field: videography with TM Mall, client consultations, on-site discussions, event coordination and portrait photography.",
  alternates: { canonical: "/work" },
};

const crops: Record<string, string> = {
  "tm-mall": "50% 0%",
  consultation: "50% 40%",
  onsite: "50% 55%",
  "beach-event": "50% 60%",
};

export default function WorkPage() {
  return (
    <>
      <PageIntro
        title="Work"
        lede={
          <p>
            Moments from our work with businesses across Liberia: on set, on site and behind the scenes.
          </p>
        }
      />

      <section aria-label="Work in the field" className="wrap space-y-24 pb-24 lg:space-y-32 lg:pb-32">
        {fieldNotes.map((note, index) => {
          const flip = index % 2 === 1;
          return (
            <article key={note.id} className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
              <CaptionedPhoto
                className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}
                photo={note.photo}
                aspect={index === 0 ? "aspect-square" : index === 2 ? "aspect-[4/3]" : "aspect-[4/5]"}
                objectPosition={crops[note.id]}
                sizes="(min-width: 1024px) 56vw, 100vw"
              />
              <div className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                <p className="text-sm font-medium text-fg-muted">{note.discipline}</p>
                <h2 className="type-heading mt-3 text-[clamp(2rem,3.6vw,3rem)]">{note.title}</h2>
                <p className="mt-4 text-lg text-fg-muted">{note.body}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section aria-labelledby="photography-title" className="border-t border-line bg-surface">
        <div className="wrap py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 id="photography-title" className="type-heading text-[clamp(2rem,3.6vw,3rem)] lg:col-span-5">
              Portrait photography
            </h2>
            <p className="type-lede lg:col-span-6 lg:col-start-7">
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

      <Brands />
      <ContactCta />
    </>
  );
}
