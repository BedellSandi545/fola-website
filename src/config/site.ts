/**
 * Site-wide facts. Everything here was transcribed from the client's brochure or
 * business plan, or supplied directly by the client. Items marked NEEDS CLIENT
 * CONFIRMATION in docs/CONTENT_AND_FUNCTIONALITY.md must be verified before launch.
 */
/** The domain the client configured for production (2026-11-23). */
export const PRODUCTION_URL = "https://folacreativeagency.com";

/** Normalises an origin: falls back to production, drops trailing slashes and any path. */
export function resolveSiteUrl(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) return PRODUCTION_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return PRODUCTION_URL;
  }
}

export const site = {
  name: "Fola Creative Agency",
  shortName: "FCA",
  /**
   * Canonical origin (apex domain, https, no trailing slash). Used for canonical
   * URLs, the sitemap, robots, Open Graph and structured data. NEXT_PUBLIC_SITE_URL
   * can override it (for example on a staging host); production needs nothing set.
   */
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  description:
    "Fola Creative Agency (FCA) is a Liberian-owned marketing and creative agency. We help businesses become seen, heard and in demand through strategy, branding, content production and campaigns.",
  tagline: "We create, you grow.",
  locale: "en_LR",
} as const;

export type PhoneNumber = { display: string; href: string };
export type SocialNetwork = "whatsapp" | "tiktok" | "instagram" | "facebook";
export type SocialProfile = { network: SocialNetwork; label: string; handle: string; url: string };

/** WhatsApp number supplied by the client on 2026-11-18, international format without "+". */
const WHATSAPP_NUMBER = "231880007811";

/** Builds a wa.me link, optionally with a pre-filled message. */
export function whatsappHref(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsapp = {
  number: WHATSAPP_NUMBER,
  display: "+231 880 007 811",
  greeting: "Hello FCA, I'd like to talk about a project.",
} as const;

export const contact = {
  email: "folacreative@gmail.com",
  /**
   * Printed in the brochure as 0880007811 and 0776167578. The client confirmed
   * +231 880 007 811 as the WhatsApp number on 2026-11-18. The +231 prefix on the
   * second number is inferred. NEEDS CLIENT CONFIRMATION.
   */
  phones: [
    { display: "0880 007 811", href: "tel:+231880007811" },
    { display: "0776 167 578", href: "tel:+231776167578" },
  ] as const satisfies readonly PhoneNumber[],
  /**
   * WhatsApp and TikTok (@folacreativeagency) were supplied by the client on
   * 2026-11-18; the Instagram and Facebook profile URLs on 2026-11-23. All four
   * are confirmed. (The brochure printed the Facebook account as "Folasade Odiaji".)
   */
  social: [
    { network: "whatsapp", label: "WhatsApp", handle: whatsapp.display, url: whatsappHref(whatsapp.greeting) },
    { network: "tiktok", label: "TikTok", handle: "@folacreativeagency", url: "https://www.tiktok.com/@folacreativeagency" },
    {
      network: "instagram",
      label: "Instagram",
      handle: "@folacreativeagency",
      url: "https://www.instagram.com/folacreativeagency/",
    },
    {
      network: "facebook",
      label: "Facebook",
      handle: "@folacreativeagency",
      url: "https://www.facebook.com/folacreativeagency/",
    },
  ] as const satisfies readonly SocialProfile[],
  serviceArea: "Liberia",
} as const;
