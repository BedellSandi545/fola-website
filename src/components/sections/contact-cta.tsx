import { ArrowRight, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { contact } from "@/config/site";

/** Closing call to action, using the brochure's own words. */
export function ContactCta() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line">
      <div className="wrap py-24 lg:py-36">
        <h2 id="cta-title" className="type-display max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)]">
          Let&apos;s build something great together.
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <p className="type-lede lg:col-span-6">
            Whether you&apos;re building a brand, reaching new customers or planning your next campaign, FCA is ready to
            work with you.
          </p>
          <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <ButtonLink
              href="/contact"
              icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
            >
              Let&apos;s talk about your brand
            </ButtonLink>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line-strong px-6 text-[0.95rem] font-semibold [font-stretch:112%] transition-colors duration-200 hover:bg-fg hover:text-bg"
            >
              <Mail aria-hidden="true" className="size-4" />
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
