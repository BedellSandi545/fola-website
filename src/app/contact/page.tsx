import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { contact } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Fola Creative Agency. Send a message, email or call us.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="wrap grid gap-16 pt-14 pb-24 lg:grid-cols-12 lg:gap-16 lg:pt-24 lg:pb-32">
      <div className="lg:col-span-7">
        <h1 className="type-display text-[clamp(2.75rem,7vw,6rem)]">Let&apos;s talk about your brand.</h1>
        <p className="type-lede mt-8 max-w-xl">
          Whether you&apos;re building a brand, reaching new customers or planning your next campaign, tell us what
          you&apos;re working on. Listening first is where our work begins.
        </p>
        <div className="mt-14">
          <ContactForm />
        </div>
      </div>

      <aside aria-labelledby="direct-title" className="lg:col-span-4 lg:col-start-9 lg:pt-4">
        <div className="lg:sticky lg:top-28">
          <span aria-hidden="true" className="block h-[3px] w-16 bg-accent" />
          <h2 id="direct-title" className="mt-6 text-2xl font-bold [font-stretch:112%]">
            Reach us directly
          </h2>
          <ul className="mt-6 space-y-5">
            <li className="flex gap-4">
              <Mail aria-hidden="true" className="mt-3 size-5 shrink-0 text-fg-muted" />
              <div>
                <p className="text-sm text-fg-muted">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex min-h-11 items-center font-semibold break-all underline-offset-4 hover:underline"
                >
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
                      <a
                        href={p.href}
                        className="inline-flex min-h-11 items-center font-semibold tabular-nums underline-offset-4 hover:underline"
                      >
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
            <ul className="mt-3 space-y-2 text-fg-muted">
              {contact.social.map((s) => (
                <li key={s.network}>
                  {s.url ? (
                    <a href={s.url} rel="noopener noreferrer" target="_blank" className="underline underline-offset-4">
                      {s.network}: {s.handle}
                    </a>
                  ) : (
                    <>
                      {s.network}: <span className="text-fg">{s.handle}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
