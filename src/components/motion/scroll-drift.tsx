"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK_QUERY } from "@/lib/motion";

/**
 * Moves a wide row sideways as the page scrolls past it (scrub). Motion is
 * driven by the reader's own scrolling, so it never moves on its own and
 * needs no pause control. Static under reduced motion.
 */
export function ScrollDrift({
  children,
  from = 0,
  to = -30,
  className,
}: {
  children: ReactNode;
  /** xPercent at the start and end of the scroll range. */
  from?: number;
  to?: number;
  className?: string;
}) {
  const row = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK_QUERY, () => {
        gsap.fromTo(
          row.current,
          { xPercent: from },
          {
            xPercent: to,
            ease: "none",
            scrollTrigger: { trigger: row.current?.parentElement, start: "top bottom", end: "bottom top", scrub: 0.5 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: row },
  );

  return (
    <div ref={row} className={className}>
      {children}
    </div>
  );
}
