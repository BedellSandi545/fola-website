import Image from "next/image";
import Link from "next/link";
import { primaryNav } from "@/config/navigation";
import { contact, site } from "@/config/site";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const linkClass =
  "inline-flex min-h-11 items-center text-on-brand-muted underline-offset-4 transition-colors duration-200 hover:text-on-brand hover:underline";

export function SiteFooter() {
  return (
    <footer className="bg-brand text-on-brand">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Image src="/brand/fca-logo-white.png" alt="Fola Creative Agency" width={585} height={481} className="h-24 w-auto" quality={80} />
          <p className="mt-8 text-2xl font-bold [font-stretch:112%]">{site.tagline}</p>
          <p className="mt-3 max-w-sm text-on-brand-muted">
            A Liberian-owned marketing and creative agency helping businesses become seen, heard and in demand.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="text-sm font-semibold text-on-brand">Explore</h2>
          <ul className="mt-3">
            <li>
              <Link href="/" className={linkClass}>
                Home
              </Link>
            </li>
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
          <h2 className="text-sm font-semibold text-on-brand">Contact</h2>
          <ul className="mt-3">
            <li>
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </li>
            {contact.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className={linkClass}>
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm font-semibold text-on-brand">Social</h2>
          <ul className="mt-3 space-y-3 text-on-brand-muted">
            {contact.social.map((s) => (
              <li key={s.network}>
                {s.url ? (
                  <a href={s.url} className={linkClass} rel="noopener noreferrer" target="_blank">
                    {s.network}: {s.handle}
                  </a>
                ) : (
                  <p>
                    <span className="block text-on-brand">{s.network}</span>
                    {s.handle}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-on-brand/15 py-6 text-sm text-on-brand-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CopyrightYear /> {site.name}
        </p>
        <Link href="/privacy" className={linkClass}>
          Privacy notice
        </Link>
      </div>
    </footer>
  );
}
