import { ProgressLine } from "@/components/motion/progress-line";
import { RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";
import { approach } from "@/content/agency";

/**
 * The six-step approach from the business plan. Numbered because it is a real
 * sequence. The gold rule fills with scroll and each step's number lights up as
 * the reader reaches it.
 */
export function Approach({ id = "approach", index }: { id?: string; index?: number }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-line">
      <div className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-36">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            {index ? <SectionLabel index={index} label="Process" className="mb-6" /> : null}
            <h2 id={`${id}-title`} className="type-heading type-section">
              <RevealWords text="How we work" />
            </h2>
            <p data-animate="rise" className="type-lede mt-6 max-w-sm">
              We understand your business before we create anything. Rather than simply producing content, we make work
              that serves your wider goals.
            </p>
          </div>
        </div>

        <ProgressLine className="relative lg:col-span-6 lg:col-start-7">
          <ol className="space-y-14 pl-8 sm:pl-12">
            {approach.map((step, i) => (
              <li key={step.title} data-animate="rise" data-step className="grid gap-2 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span aria-hidden="true" data-step-number className="pt-1.5 font-semibold text-fg-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
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
