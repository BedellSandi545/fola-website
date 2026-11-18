"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type RailSection = { id: string; label: string };

/**
 * "On this page" index for long pages. Fixed to the left gutter on wide screens:
 * one tick per section, the current one drawn long in gold with its number.
 * Labels appear on hover and focus. Each tick is a real in-page link.
 */
export function SectionRail({ sections }: { sections: readonly RailSection[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    // A section is "current" when it crosses a line 40% down the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    targets.forEach((el) => io.observe(el));

    // Show the rail only once the reader has moved past the first section's start.
    const first = targets[0];
    const onScroll = () => {
      const top = first.getBoundingClientRect().top;
      const footer = document.querySelector("footer")?.getBoundingClientRect().top ?? Infinity;
      setVisible(top < window.innerHeight * 0.6 && footer > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Sections on this page"
      data-visible={visible ? "" : undefined}
      className="pointer-events-none fixed top-1/2 left-3 z-30 hidden -translate-y-1/2 opacity-0 transition-opacity duration-500 data-[visible]:pointer-events-auto data-[visible]:opacity-100 xl:block"
    >
      <ol className="flex flex-col">
        {sections.map((s, index) => {
          const current = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={current ? "location" : undefined}
                className="group relative flex h-9 items-center gap-2 pr-2"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-[2px] origin-left transition-[width,background-color] duration-500 ease-out-expo",
                    current ? "w-8 bg-accent" : "w-3.5 bg-fg-muted/50 group-hover:w-6 group-hover:bg-fg",
                  )}
                />
                <span
                  className={cn(
                    "rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold whitespace-nowrap shadow-sm transition-[opacity,transform] duration-300",
                    "pointer-events-none absolute left-11 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                  )}
                >
                  <span className="mr-1.5 text-fg-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
