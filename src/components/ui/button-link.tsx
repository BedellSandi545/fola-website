import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold [font-stretch:112%] transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.98]";

const variants: Record<Variant, string> = {
  /** The one gold control per view. */
  primary: "bg-accent text-on-accent hover:bg-fg hover:text-bg",
  secondary: "border border-line-strong text-fg hover:bg-fg hover:text-bg",
  /** For use on the always-navy brand band. */
  inverse: "border border-on-brand/60 text-on-brand hover:bg-on-brand hover:text-brand",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
};

export function ButtonLink({ variant = "primary", className, icon, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      {children}
      {icon}
    </Link>
  );
}
