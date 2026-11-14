import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="wrap py-24 lg:py-36">
      <p className="font-semibold text-fg-muted">Error 404</p>
      <h1 className="type-display mt-4 text-[clamp(2.75rem,8vw,7rem)]">Page not found.</h1>
      <span aria-hidden="true" className="mt-10 block h-[3px] w-24 bg-accent" />
      <p className="type-lede mt-8 max-w-xl">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these instead.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the homepage</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          See our work
        </ButtonLink>
      </div>
      <p className="mt-8 text-fg-muted">
        Looking for something specific?{" "}
        <Link href="/contact" className="font-medium text-fg underline underline-offset-4">
          Get in touch
        </Link>
        .
      </p>
    </section>
  );
}
