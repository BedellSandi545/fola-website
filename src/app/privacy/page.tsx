import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { contact, site } from "@/config/site";

/**
 * DRAFT written from how the site actually works. It must be reviewed by FCA
 * (and ideally a legal adviser) before launch; it is kept out of search results
 * until then. See docs/CONTENT_AND_FUNCTIONALITY.md.
 */
export const metadata: Metadata = pageMetadata({
  title: "Privacy notice",
  description:
    `How ${site.name} handles information sent through this website.`,
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <article className="wrap pt-14 pb-24 lg:pt-24 lg:pb-32">
      <h1 className="type-display text-[clamp(2.75rem,7vw,5.5rem)]">Privacy notice</h1>
      <div className="measure mt-12 space-y-10 text-fg-muted [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-fg [&_h2]:[font-stretch:112%] [&_p]:mt-3">
        <section>
          <h2>Who we are</h2>
          <p>
            This website is run by {site.name} (FCA), a marketing and creative agency based in {contact.serviceArea}. You
            can contact us at{" "}
            <a className="text-fg underline underline-offset-4" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </p>
        </section>
        <section>
          <h2>What we collect</h2>
          <p>
            When you use our contact form we receive the details you enter: your name, email address, the business you
            represent and service you are interested in (if you choose to tell us), and your message. We also briefly
            process your IP address to limit repeated submissions.
          </p>
        </section>
        <section>
          <h2>How we use it</h2>
          <p>
            We use these details only to reply to your enquiry and discuss working together. We do not sell your
            information or add you to mailing lists.
          </p>
        </section>
        <section>
          <h2>Who handles it</h2>
          <p>
            Messages are delivered to our inbox by an email service provider acting on our behalf. If you email us
            directly, your message is handled by our email provider.
          </p>
        </section>
        <section>
          <h2>Cookies and storage</h2>
          <p>
            This website does not use advertising or analytics cookies. If you choose a light or dark theme, that
            preference is saved in your browser&apos;s local storage so the site remembers it. It never leaves your device.
          </p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p>
            You can ask us what information we hold about you, or ask us to delete it, by emailing{" "}
            <a className="text-fg underline underline-offset-4" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
