"use client";

import { useRef, type ReactNode } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK_QUERY } from "@/lib/motion";

/**
 * A gold rule that fills as the reader moves through a sequence (the approach
 * steps). It is tied to scroll position, never to time, and never pins or
 * hijacks scrolling. Without JavaScript or with reduced motion the rule is
 * shown fully drawn.
 */
export function ProgressLine({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK_QUERY, () => {
        gsap.fromTo(
          "[data-progress-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top 70%", end: "bottom 60%", scrub: 0.4 },
          },
        );
      });
      // Images above can change height after load; keep trigger positions accurate.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line" />
      <span
        aria-hidden="true"
        data-progress-fill
        className="absolute top-0 bottom-0 left-0 w-[3px] -translate-x-px origin-top bg-accent"
      />
      {children}
    </div>
  );
}
