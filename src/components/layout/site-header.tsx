"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { primaryNav } from "@/config/navigation";
import { contact } from "@/config/site";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/cn";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current || !buttonRef.current) return;
      // Keep focus inside the menu button + panel while the menu is open.
      const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3"
          aria-label="Fola Creative Agency, home"
          onClick={() => setOpen(false)}
        >
          <Image src="/brand/fca-monogram.png" alt="" width={287} height={301} className="h-10 w-auto dark:hidden" quality={80} preload />
          <Image
            src="/brand/fca-monogram-white.png"
            alt=""
            width={287}
            height={301}
            className="hidden h-10 w-auto dark:block"
            quality={80}
          />
          <span className="text-[0.95rem] leading-tight font-semibold whitespace-nowrap [font-stretch:112%]">
            Fola Creative Agency
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-4 font-medium transition-colors duration-200",
                      "after:absolute after:inset-x-4 after:bottom-2 after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-300",
                      active ? "text-fg after:scale-x-100" : "text-fg-muted after:scale-x-0 hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-full bg-accent px-5 text-[0.9rem] font-semibold text-on-accent [font-stretch:112%] transition-colors duration-200 hover:bg-fg hover:text-bg lg:inline-flex"
          >
            Start a project
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-bg lg:hidden"
      >
        <div className="wrap flex min-h-full flex-col justify-between gap-12 py-10">
          <nav aria-label="Primary">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="type-display block py-2 text-[clamp(2.5rem,12vw,4rem)] aria-[current=page]:text-accent-ink"
                >
                  Home
                </Link>
              </li>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="type-display block py-2 text-[clamp(2.5rem,12vw,4rem)] aria-[current=page]:text-accent-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-6 border-t border-line pt-8">
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
            <ul className="space-y-1 text-fg-muted">
              <li>
                <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              {contact.phones.map((p) => (
                <li key={p.href}>
                  <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href={p.href}>
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
