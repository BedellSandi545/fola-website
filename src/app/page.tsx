import { Hero } from "@/components/sections/home/hero";
import { Marquee } from "@/components/sections/marquee";
import { Positioning } from "@/components/sections/home/positioning";
import { ServicesIndex } from "@/components/sections/home/services-index";
import { FieldWork } from "@/components/sections/home/field-work";
import { Approach } from "@/components/sections/approach";
import { Team } from "@/components/sections/home/team";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionRail, type RailSection } from "@/components/motion/section-rail";
import { contact, site } from "@/config/site";

/** Chapters of the home page, in the same order as the main navigation. */
const sections: readonly RailSection[] = [
  { id: "about", label: "About us" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "approach", label: "Process" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export default function HomePage() {
  // Organization facts are taken from the client's own documents. Social profiles
  // (sameAs) are limited to the ones the client supplied directly.
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/brand/fca-logo-navy.png`,
    email: contact.email,
    foundingDate: "2025-09",
    areaServed: contact.serviceArea,
    description: site.description,
    sameAs: contact.social.filter((s) => s.network === "tiktok").map((s) => s.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated JSON; "<" is escaped so it cannot close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <SectionRail sections={sections} />
      <Hero />
      <Marquee />
      <Positioning index={1} />
      <ServicesIndex index={2} />
      <FieldWork index={3} />
      <Approach index={4} />
      <Team index={5} />
      <ContactCta index={6} />
    </>
  );
}
