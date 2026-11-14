/**
 * Site-wide facts. Everything here was transcribed from the client's brochure or
 * business plan. Items marked NEEDS CLIENT CONFIRMATION in
 * docs/CONTENT_AND_FUNCTIONALITY.md must be verified before launch.
 */
export const site = {
  name: "Fola Creative Agency",
  shortName: "FCA",
  /** Production URL. Set NEXT_PUBLIC_SITE_URL in the deployment environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Fola Creative Agency (FCA) is a Liberian-owned marketing and creative agency. We help businesses become seen, heard and in demand through strategy, branding, content production and campaigns.",
  tagline: "We create, you grow.",
  locale: "en_LR",
} as const;

export type PhoneNumber = { display: string; href: string };
export type SocialProfile = { network: string; handle: string; url: string | null };

export const contact = {
  email: "folacreative@gmail.com",
  /**
   * Printed in the brochure as 0880007811 and 0776167578. The +231 (Liberia)
   * prefix in the tel: links is inferred. NEEDS CLIENT CONFIRMATION.
   */
  phones: [
    { display: "0880 007 811", href: "tel:+231880007811" },
    { display: "0776 167 578", href: "tel:+231776167578" },
  ] as const satisfies readonly PhoneNumber[],
  /**
   * The brochure prints account names only, not profile URLs. They are shown as
   * plain text until verified URLs are supplied. NEEDS CLIENT CONFIRMATION.
   */
  social: [
    { network: "Facebook", handle: "Folasade Odiaji", url: null },
    { network: "Instagram", handle: "Fola Creative Agency", url: null },
  ] as readonly SocialProfile[],
  serviceArea: "Liberia",
} as const;
