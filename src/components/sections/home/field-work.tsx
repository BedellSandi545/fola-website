import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaptionedPhoto } from "@/components/ui/captioned-photo";
import { fieldNotes } from "@/content/work";

const [tmMall, consultation, onsite] = fieldNotes;

/** Asymmetric, captioned documentary photographs. Deliberately not a uniform grid. */
export function FieldWork() {
  return (
    <section aria-labelledby="field-title" className="border-t border-line bg-surface">
      <div className="wrap py-24 lg:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="field-title" className="type-heading max-w-2xl text-[clamp(2.25rem,4.4vw,3.75rem)]">
            Experience that speaks.
          </h2>
          <Link
            href="/work"
            className="group inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            See our work
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <p className="type-lede measure mt-6">
          We&apos;ve partnered with businesses and teams to build visibility, create meaningful content and bring ideas
          to life. Here is some of that work, in the field.
        </p>

        <div className="mt-16 grid gap-y-16 md:grid-cols-12 md:gap-x-8">
          <CaptionedPhoto
            className="md:col-span-6 lg:col-span-5"
            photo={tmMall.photo}
            title={tmMall.title}
            caption={tmMall.body}
            aspect="aspect-square"
            objectPosition="50% 0%"
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 48vw, 100vw"
          />
          <CaptionedPhoto
            className="md:col-span-6 md:mt-40 lg:col-span-5 lg:col-start-8"
            photo={consultation.photo}
            title={consultation.title}
            caption={consultation.body}
            aspect="aspect-[3/4]"
            objectPosition="50% 40%"
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 48vw, 100vw"
          />
          <CaptionedPhoto
            className="md:col-span-10 lg:col-span-7 lg:col-start-1 lg:-mt-40"
            photo={onsite.photo}
            title={onsite.title}
            caption={onsite.body}
            aspect="aspect-[16/10]"
            objectPosition="50% 55%"
            sizes="(min-width: 1024px) 56vw, (min-width: 768px) 80vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
