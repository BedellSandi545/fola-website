import { ProgressLine } from "@/components/motion/progress-line";
import { approach } from "@/content/agency";

/** The six-step approach from the business plan. Numbered because it is a real sequence. */
export function Approach({ id = "approach" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line bg-surface">
      <div className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id={`${id}-title`} className="type-heading text-[clamp(2.25rem,4.4vw,3.75rem)]">
              How we work
            </h2>
            <p className="type-lede mt-6 max-w-sm">
              We understand your business before we create anything. Rather than simply producing content, we make work
              that serves your wider goals.
            </p>
          </div>
        </div>

        <ProgressLine className="relative lg:col-span-6 lg:col-start-7">
          <ol className="space-y-14 pl-8 sm:pl-12">
            {approach.map((step, index) => (
              <li key={step.title} className="grid gap-2 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span aria-hidden="true" className="pt-1.5 font-semibold text-fg-muted tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold [font-stretch:112%]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-fg-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </ProgressLine>
      </div>
    </section>
  );
}
