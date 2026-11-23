import { Hero } from "@/components/sections/home/hero";
import { Marquee } from "@/components/sections/marquee";
import { Positioning } from "@/components/sections/home/positioning";
import { ServicesIndex } from "@/components/sections/home/services-index";
import { FieldWork } from "@/components/sections/home/field-work";
import { Team } from "@/components/sections/home/team";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionRail, type RailSection } from "@/components/motion/section-rail";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";

/** Chapters of the home page, in the same order as the main navigation. */
const sections: readonly RailSection[] = [
  { id: "about", label: "About us" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <SectionRail sections={sections} />
      <Hero />
      <Marquee />
      <Positioning index={1} />
      <ServicesIndex index={2} />
      <FieldWork index={3} />
      <Team index={4} />
      <ContactCta index={5} />
    </>
  );
}
