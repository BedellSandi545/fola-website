import { brandsServedFirstYearWords, clients } from "@/content/clients";

/** Typographic list of brand relationships named in the brochure. No logos were supplied. */
export function Brands({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <section aria-labelledby="brands-title" className="bg-brand text-on-brand">
      <div className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <Heading id="brands-title" className="type-heading text-[clamp(2rem,3.6vw,3rem)]">
            Brands we&apos;ve worked with
          </Heading>
          <p className="mt-5 max-w-sm text-on-brand-muted">
            Businesses we have partnered with, from hotels and restaurants to retail, energy and grooming. These are {clients.length === 8 ? "eight" : clients.length} of
            the {brandsServedFirstYearWords} brands we served in our first year.
          </p>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {clients.map((name) => (
            <li
              key={name}
              className="border-b border-on-brand/20 py-5 text-[clamp(1.25rem,2vw,1.6rem)] leading-tight font-semibold [font-stretch:112%]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
