import { Hero } from "@/components/sections/home/hero";
import { Positioning } from "@/components/sections/home/positioning";
import { FieldWork } from "@/components/sections/home/field-work";
import { Brands } from "@/components/sections/brands";
import { ServicesIndex } from "@/components/sections/home/services-index";
import { Approach } from "@/components/sections/approach";
import { Team } from "@/components/sections/home/team";
import { ContactCta } from "@/components/sections/contact-cta";
import { contact, site } from "@/config/site";

export default function HomePage() {
  // Organization facts are taken from the client's own documents. Social profiles
  // (sameAs) are omitted until verified URLs exist.
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated JSON; "<" is escaped so it cannot close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Positioning />
      <FieldWork />
      <Brands />
      <ServicesIndex />
      <Approach />
      <Team />
      <ContactCta />
    </>
  );
}
