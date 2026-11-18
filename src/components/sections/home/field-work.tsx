import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaptionedPhoto } from "@/components/ui/captioned-photo";
import { RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";
import { fieldNotes } from "@/content/work";

const [videography, consultation, onsite] = fieldNotes;

/** Home › Work: asymmetric, captioned documentary photographs on the navy band. Deliberately not a uniform grid. */
export function FieldWork({ index }: { index: number }) {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 bg-brand text-on-brand">
      <div className="wrap py-24 lg:py-36">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={index} label="Work" tone="on-brand" />
            <h2 id="work-title" className="type-heading type-section mt-6 max-w-2xl">
              <RevealWords text="Experience that speaks." />
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex min-h-11 items-center gap-2 font-semibold text-on-brand underline-offset-4 hover:underline"
          >
            See our work
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <p data-animate="rise" className="type-lede measure mt-6 text-on-brand-muted!">
          We&apos;ve partnered with businesses and teams to build visibility, create meaningful content and bring ideas
          to life. Here is some of that work, in the field.
        </p>

        <div className="mt-16 grid gap-y-16 md:grid-cols-12 md:gap-x-8">
          <CaptionedPhoto
            className="md:col-span-6 lg:col-span-5"
            photo={videography.photo}
            title={videography.title}
            caption={videography.body}
            tone="on-brand"
            parallax
            aspect="aspect-square"
            objectPosition="50% 0%"
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 48vw, 100vw"
          />
          <CaptionedPhoto
            className="md:col-span-6 md:mt-40 lg:col-span-5 lg:col-start-8"
            photo={consultation.photo}
            title={consultation.title}
            caption={consultation.body}
            tone="on-brand"
            parallax
            aspect="aspect-[3/4]"
            objectPosition="50% 40%"
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 48vw, 100vw"
          />
          <CaptionedPhoto
            className="md:col-span-10 lg:col-span-7 lg:col-start-1 lg:-mt-40"
            photo={onsite.photo}
            title={onsite.title}
            caption={onsite.body}
            tone="on-brand"
            parallax
            aspect="aspect-[16/10]"
            objectPosition="50% 55%"
            sizes="(min-width: 1024px) 56vw, (min-width: 768px) 80vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
