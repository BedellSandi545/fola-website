import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";

/** Home › Services: an index of service areas. Each row is one link; hovering sweeps a tint across it. */
export function ServicesIndex({ index }: { index: number }) {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="wrap py-24 lg:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionLabel index={index} label="Services" />
            <h2 id="services-title" className="type-heading type-section mt-6">
              <RevealWords text="What we do" />
            </h2>
          </div>
          <p data-animate="rise" className="type-lede lg:col-span-5 lg:col-start-8">
            Strategy, branding, content, events and training: the pieces a growing business needs to be seen and heard.
          </p>
        </div>

        <ul data-animate="stagger" className="mt-14 border-t border-line-strong">
          {services.map((service, i) => (
            <li key={service.slug} className="border-b border-line">
              <Link
                href={`/services#${service.slug}`}
                className="group relative isolate grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                {/* Hover tint grows from the left edge; the gold tick marks the row. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -inset-x-4 -z-10 origin-left scale-x-0 bg-surface-sunken transition-transform duration-500 ease-out-expo group-hover:scale-x-100 md:-inset-x-6"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -left-4 h-0 w-[3px] -translate-y-1/2 bg-accent transition-[height] duration-500 ease-out-expo group-hover:h-2/3 md:-left-6"
                />
                <span aria-hidden="true" className="text-sm font-semibold text-fg-muted tabular-nums md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(1.5rem,2.6vw,2.35rem)] leading-tight font-bold [font-stretch:112%] transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:col-span-5">
                  {service.title}
                </h3>
                <p className="text-fg-muted md:col-span-5">{service.summary}</p>
                <span className="hidden justify-self-end md:col-span-1 md:block">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-6 text-fg-muted transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45 group-hover:text-fg"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
