import { pillars, sectors } from "@/content/agency";
import { brandsServedFirstYearWords } from "@/content/clients";

const listFormatter = new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" });

export function Positioning() {
  return (
    <section aria-labelledby="positioning-title" className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
      <div className="lg:col-span-5">
        <h2 id="positioning-title" className="type-heading text-[clamp(2.25rem,4.4vw,3.75rem)]">
          More than just marketing.
        </h2>
        <p className="type-lede mt-6 max-w-md">
          We help brands grow, connect and win. In our first year we worked with {brandsServedFirstYearWords} brands across{" "}
          {listFormatter.format(sectors.map((s) => (s === "NGOs" ? s : s.toLowerCase())))}.
        </p>
      </div>

      <dl className="border-t border-line-strong lg:col-span-7">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
            <dt className="text-xl font-bold [font-stretch:112%]">{pillar.title}</dt>
            <dd className="text-fg-muted">{pillar.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
