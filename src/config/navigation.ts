export type NavItem = { href: "/" | "/about" | "/services" | "/work" | "/contact"; label: string };

/** Client-requested order (2026-11-18): Home, About Us, Services, Work, Contact. */
export const primaryNav: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function isActivePath(pathname: string, href: NavItem["href"]) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
