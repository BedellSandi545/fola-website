/**
 * Motion tokens. GSAP timelines and CSS transitions both read from here so the
 * site keeps one rhythm. See docs/IMPLEMENTATION_PLAN.md › Motion system.
 */
export const duration = {
  feedback: 0.2,
  reveal: 0.6,
  draw: 1.2,
} as const;

export const ease = {
  enter: "power3.out",
  exit: "power2.in",
  draw: "expo.inOut",
} as const;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
export const MOTION_OK_QUERY = "(prefers-reduced-motion: no-preference)";
