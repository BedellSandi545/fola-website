import type { ReactNode } from "react";

/** Opening block for inner pages: poster title and a lede, left aligned on the grid. */
export function PageIntro({ title, lede, children }: { title: string; lede: ReactNode; children?: ReactNode }) {
  return (
    <section className="wrap grid gap-8 pt-14 pb-16 lg:grid-cols-12 lg:pt-24 lg:pb-24">
      <h1 className="type-display text-[clamp(2.9rem,8vw,7rem)] lg:col-span-10">{title}</h1>
      <div className="lg:col-span-6 lg:col-start-7">
        <span aria-hidden="true" className="mb-6 block h-[3px] w-16 bg-accent" />
        <div className="type-lede">{lede}</div>
        {children}
      </div>
    </section>
  );
}
