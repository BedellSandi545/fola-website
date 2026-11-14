export type NavItem = { href: "/work" | "/services" | "/about" | "/contact"; label: string };

export const primaryNav: readonly NavItem[] = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
