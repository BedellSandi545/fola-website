import { contact, site, whatsapp } from "@/config/site";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * schema.org JSON-LD built only from facts in the client's documents or supplied
 * by the client. No address, ratings, prices or opening hours: none are verified.
 */

type JsonLdObject = { "@context"?: string; "@type": string; [key: string]: unknown };

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/fca-logo-navy.png"), width: 585, height: 481 },
    image: absoluteUrl("/opengraph-image.jpg"),
    email: contact.email,
    foundingDate: "2025-09",
    areaServed: { "@type": "Country", name: contact.serviceArea },
    description: site.description,
    slogan: site.tagline,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      // Client-confirmed WhatsApp/telephone number (2026-11-18).
      telephone: `+${whatsapp.number}`,
      email: contact.email,
      areaServed: "LR",
      availableLanguage: "English",
    },
    // Client-confirmed public profiles (WhatsApp is a chat link, not a profile).
    sameAs: contact.social.filter((s) => s.network !== "whatsapp").map((s) => s.url),
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export type Crumb = { name: string; path: `/${string}` };

/** Breadcrumb trail from the homepage to the given page. */
export function breadcrumbJsonLd(trail: readonly Crumb[]): JsonLdObject {
  const items: readonly Crumb[] = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** The service areas on /services, each linked to its section anchor. */
export function servicesJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Services from ${site.name}`,
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${absoluteUrl("/services")}#${service.slug}`,
        name: service.title,
        description: service.summary,
        serviceType: service.items.join(", "),
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: contact.serviceArea },
        url: `${absoluteUrl("/services")}#${service.slug}`,
      },
    })),
  };
}

/** Serialises JSON-LD for a <script> tag; "<" is escaped so it cannot close the tag. */
export function serializeJsonLd(data: JsonLdObject | readonly JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
