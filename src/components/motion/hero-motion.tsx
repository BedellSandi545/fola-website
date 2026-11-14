"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK_QUERY, duration, ease } from "@/lib/motion";

/**
 * The site's one orchestrated entrance: photograph opens, headline lines rise,
 * then supporting copy and actions arrive.
 *
 * Elements opt in with data attributes. With reduced motion nothing animates
 * and content renders in its final state. useGSAP reverts everything on unmount.
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK_QUERY, () => {
        gsap
          .timeline({ defaults: { ease: ease.enter } })
          .fromTo(
            "[data-hero-media]",
            { autoAlpha: 0, clipPath: "inset(12% 0% 12% 0%)" },
            { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1 },
          )
          .fromTo(
            "[data-hero-line]",
            { autoAlpha: 0, yPercent: 35 },
            { autoAlpha: 1, yPercent: 0, duration: duration.reveal, stagger: 0.1 },
            0.1,
          )
          .fromTo(
            "[data-hero-fade]",
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: duration.reveal, stagger: 0.08 },
            0.7,
          );
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
