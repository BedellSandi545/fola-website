import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { contact, site, whatsapp, whatsappHref } from "@/config/site";
import { Signature } from "@/components/brand/signature";
import { SocialLinks } from "@/components/brand/social-links";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const linkClass =
  "inline-flex min-h-11 items-center text-on-brand-muted underline-offset-4 transition-colors duration-200 hover:text-on-brand hover:underline";

const headingClass = "text-[0.8rem] font-semibold tracking-[0.18em] text-on-brand uppercase [font-stretch:112%]";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-brand text-on-brand">
      {/* The FCA signature opens the footer, drawn across the full width as it comes into view. */}
      <div className="relative pt-16 sm:pt-20">
        <Signature
          tone="on-brand"
          draw="scroll"
          fit="cover"
          sizes="100vw"
          className="h-[clamp(5.5rem,17vw,15rem)] w-full [&_img]:object-[50%_50%]"
        />
      </div>

      <div className="wrap pt-10 pb-4 sm:pt-14">
        <p data-animate="rise" className="type-display max-w-4xl text-[clamp(2.5rem,7.5vw,6.5rem)]">
          We create, <span className="text-accent">you grow.</span>
        </p>
      </div>

      <div className="wrap grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Image src="/brand/fca-logo-white.png" alt="Fola Creative Agency" width={585} height={481} className="h-24 w-auto" quality={80} />
          <p className="mt-6 max-w-sm text-on-brand-muted">
            A Liberian-owned marketing and creative agency helping businesses become seen, heard and in demand.
          </p>
          <a
            href={whatsappHref(whatsapp.greeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-accent px-6 text-[0.95rem] font-semibold text-on-accent [font-stretch:112%] transition-[background-color,color,transform] duration-200 hover:bg-on-brand hover:text-brand active:scale-[0.98]"
          >
            Chat on WhatsApp
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className={headingClass}>Explore</h2>
          <ul className="mt-4">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className={headingClass}>Contact</h2>
          <ul className="mt-4">
            <li>
              <a href={`mailto:${contact.email}`} className={`${linkClass} break-all`}>
                {contact.email}
              </a>
            </li>
            {contact.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className={`${linkClass} tabular-nums`}>
                  {p.display}
                </a>
              </li>
            ))}
            <li className="mt-2 text-sm text-on-brand-muted">Based in {contact.serviceArea}</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className={headingClass}>Follow us</h2>
          <SocialLinks tone="on-brand" className="mt-3" />
        </div>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-on-brand/15 py-6 text-sm text-on-brand-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CopyrightYear /> {site.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-6">
          <Link href="/privacy" className={linkClass}>
            Privacy notice
          </Link>
          <a href="#main" className={`${linkClass} group gap-2`}>
            Back to top
            <ArrowUp aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
