"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK_QUERY } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Slow drift for a photograph inside its frame, tied to scroll position (scrub),
 * never to time. The layer is oversized by `amount` on each side so edges never
 * show. Place inside a `relative overflow-hidden` frame. Static under reduced motion.
 */
export function Parallax({ children, amount = 8, className }: { children: ReactNode; amount?: number; className?: string }) {
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK_QUERY, () => {
        gsap.fromTo(
          layer.current,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: layer.current?.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: layer },
  );

  return (
    <div
      ref={layer}
      className={cn("absolute inset-x-0 will-change-transform", className)}
      style={{ top: `-${amount}%`, bottom: `-${amount}%` }}
    >
      {children}
    </div>
  );
}
