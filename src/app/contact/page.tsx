import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { HeroMotion } from "@/components/motion/hero-motion";
import { SocialIcon } from "@/components/brand/social-icon";
import { SocialLinks } from "@/components/brand/social-links";
import { contact, whatsapp, whatsappHref } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project with Fola Creative Agency. Send a message, email, call or chat with us on WhatsApp.",
  path: "/contact",
});

const directLink = "inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline";

export default function ContactPage() {
  const title = "Let's talk about your brand.";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <HeroMotion className="wrap grid gap-16 pt-14 pb-24 lg:grid-cols-12 lg:gap-16 lg:pt-24 lg:pb-32">
        <div className="lg:col-span-7">
          <p
            data-hero-fade
            data-reveal
            className="flex items-center gap-3 text-[0.8rem] font-semibold tracking-[0.18em] text-fg-muted uppercase [font-stretch:112%]"
          >
            <span aria-hidden="true" className="block h-px w-10 bg-accent" />
            Contact
          </p>
          <h1 className="type-display mt-8 text-[clamp(2.75rem,7vw,6rem)]">
            {title.split(" ").map((word, i, all) => (
              <span key={`${word}-${i}`}>
                <span className="word">
                  <span data-hero-line data-reveal>
                    {word}
                  </span>
                </span>
                {i < all.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p data-hero-fade data-reveal className="type-lede mt-8 max-w-xl">
            Whether you&apos;re building a brand, reaching new customers or planning your next campaign, tell us what
            you&apos;re working on. Listening first is where our work begins.
          </p>
          <div className="mt-14">
            <ContactForm />
          </div>
        </div>

        <aside aria-labelledby="direct-title" className="lg:col-span-4 lg:col-start-9 lg:pt-4">
          <div data-hero-fade data-reveal className="lg:sticky lg:top-28">
            <span aria-hidden="true" className="block h-[3px] w-16 bg-accent" />
            <h2 id="direct-title" className="mt-6 text-2xl font-bold [font-stretch:112%]">
              Reach us directly
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4">
                <SocialIcon network="whatsapp" className="mt-3 size-5 shrink-0 text-fg-muted" />
                <div>
                  <p className="text-sm text-fg-muted">WhatsApp</p>
                  <a
                    href={whatsappHref(whatsapp.greeting)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${directLink} tabular-nums`}
                  >
                    {whatsapp.display}
                    <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail aria-hidden="true" className="mt-3 size-5 shrink-0 text-fg-muted" />
                <div>
                  <p className="text-sm text-fg-muted">Email</p>
                  <a href={`mailto:${contact.email}`} className={`${directLink} break-all`}>
                    {contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone aria-hidden="true" className="mt-3 size-5 shrink-0 text-fg-muted" />
                <div>
                  <p className="text-sm text-fg-muted">Phone</p>
                  <ul>
                    {contact.phones.map((p) => (
                      <li key={p.href}>
                        <a href={p.href} className={`${directLink} tabular-nums`}>
                          {p.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-fg-muted" />
                <div>
                  <p className="text-sm text-fg-muted">Based in</p>
                  <p className="font-semibold">{contact.serviceArea}</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 border-t border-line pt-6">
              <h3 className="font-semibold">Find us on social media</h3>
              <SocialLinks className="mt-3" />
            </div>
          </div>
        </aside>
      </HeroMotion>
    </>
  );
}
