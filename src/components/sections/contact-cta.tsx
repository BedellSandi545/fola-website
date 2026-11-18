import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { RevealWords } from "@/components/ui/reveal-words";
import { SectionLabel } from "@/components/ui/section-label";
import { SocialIcon } from "@/components/brand/social-icon";
import { contact, whatsapp, whatsappHref } from "@/config/site";

const outlineButton =
  "group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line-strong px-6 text-[0.95rem] font-semibold [font-stretch:112%] transition-[background-color,color,transform] duration-200 hover:bg-fg hover:text-bg active:scale-[0.98]";

/** Closing call to action, using the brochure's own words, with every direct route to FCA. */
export function ContactCta({ index }: { index?: number }) {
  return (
    <section id="contact" aria-labelledby="cta-title" className="scroll-mt-20 border-t border-line">
      <div className="wrap py-24 lg:py-40">
        {index ? <SectionLabel index={index} label="Contact" className="mb-8" /> : null}
        <h2 id="cta-title" className="type-display max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)]">
          <RevealWords text="Let's build something great together." />
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <p data-animate="rise" className="type-lede lg:col-span-5">
            Whether you&apos;re building a brand, reaching new customers or planning your next campaign, FCA is ready to
            work with you. Send a message, email us or chat on WhatsApp.
          </p>
          <div data-animate="stagger" className="flex flex-wrap items-start gap-3 lg:col-span-6 lg:col-start-7 lg:justify-end">
            <ButtonLink
              href="/contact"
              icon={<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
            >
              Let&apos;s talk about your brand
            </ButtonLink>
            <a href={whatsappHref(whatsapp.greeting)} target="_blank" rel="noopener noreferrer" className={outlineButton}>
              <SocialIcon network="whatsapp" className="size-4" />
              WhatsApp
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={`mailto:${contact.email}`} className={outlineButton}>
              <Mail aria-hidden="true" className="size-4" />
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
