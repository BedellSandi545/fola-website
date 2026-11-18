/**
 * Site-wide facts. Everything here was transcribed from the client's brochure or
 * business plan, or supplied directly by the client. Items marked NEEDS CLIENT
 * CONFIRMATION in docs/CONTENT_AND_FUNCTIONALITY.md must be verified before launch.
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
   * 2026-11-18. The brochure prints Facebook and Instagram account names only:
   * the Instagram URL assumes the same handle as TikTok, and Facebook links to a
   * search for the printed name. NEEDS CLIENT CONFIRMATION (exact profile URLs).
   */
  social: [
    { network: "whatsapp", label: "WhatsApp", handle: whatsapp.display, url: whatsappHref(whatsapp.greeting) },
    { network: "tiktok", label: "TikTok", handle: "@folacreativeagency", url: "https://www.tiktok.com/@folacreativeagency" },
    {
      network: "instagram",
      label: "Instagram",
      handle: "Fola Creative Agency",
      url: "https://www.instagram.com/folacreativeagency/",
    },
    {
      network: "facebook",
      label: "Facebook",
      handle: "Folasade Odiaji",
      url: "https://www.facebook.com/search/top?q=Folasade%20Odiaji",
    },
  ] as const satisfies readonly SocialProfile[],
  serviceArea: "Liberia",
} as const;
