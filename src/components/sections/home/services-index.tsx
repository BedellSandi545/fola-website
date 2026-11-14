import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";

/** An index of service areas: large titles, plain summaries, one link each. */
export function ServicesIndex() {
  return (
    <section aria-labelledby="services-title" className="wrap py-24 lg:py-32">
      <div className="grid gap-6 lg:grid-cols-12">
        <h2 id="services-title" className="type-heading text-[clamp(2.25rem,4.4vw,3.75rem)] lg:col-span-6">
          What we do
        </h2>
        <p className="type-lede lg:col-span-5 lg:col-start-8">
          Strategy, branding, content, events and training: the pieces a growing business needs to be seen and heard.
        </p>
      </div>

      <ul className="mt-14 border-t border-line-strong">
        {services.map((service) => (
          <li key={service.slug} className="border-b border-line">
            <Link
              href={`/services#${service.slug}`}
              className="group grid gap-3 py-8 transition-colors duration-200 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-bold [font-stretch:112%] md:col-span-5">
                {service.title}
              </h3>
              <p className="text-fg-muted md:col-span-6">{service.summary}</p>
              <span className="hidden justify-self-end md:col-span-1 md:block">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-6 text-fg-muted transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
