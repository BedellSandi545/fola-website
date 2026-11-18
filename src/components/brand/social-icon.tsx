import type { SocialNetwork } from "@/config/site";

/**
 * Network glyphs drawn in Lucide's stroke style (24px grid, 2px stroke, round caps),
 * so they sit alongside the Lucide interface icons. Lucide ships no brand marks.
 */
export function SocialIcon({ network, className }: { network: SocialNetwork; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {network === "whatsapp" ? (
        <>
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          <path
            transform="translate(7.6 7.6) scale(0.37)"
            strokeWidth={4.6}
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
          />
        </>
      ) : null}
      {network === "tiktok" ? <path d="M9 12a4 4 0 1 0 4 4V2c0 2.8 2.2 5 5 5" /> : null}
      {network === "instagram" ? (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </>
      ) : null}
      {network === "facebook" ? <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> : null}
    </svg>
  );
}
