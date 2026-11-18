import Image from "next/image";
import signatureLight from "../../../public/brand/signature-light.png";
import signatureDark from "../../../public/brand/signature-dark.png";
import { cn } from "@/lib/cn";

type SignatureProps = {
  /**
   * "auto" follows the theme (navy ribbon on light, white ribbon on dark).
   * "on-brand" always uses the light-on-navy version, for the navy footer.
   */
  tone?: "auto" | "on-brand";
  /**
   * Draw the ribbon in from left to right. "load" plays once on first paint
   * (CSS keyframes); "scroll" plays when it enters the viewport (RevealObserver).
   * Both are skipped under reduced motion and without JavaScript.
   */
  draw?: "none" | "load" | "scroll";
  /** "height": the box sets the height, width follows. "cover": fills the box, cropping as needed. */
  fit?: "height" | "cover";
  sizes: string;
  className?: string;
  preload?: boolean;
};

/**
 * The FCA signature: the navy and gold ribbon supplied by the client
 * (public/brand/signature.jpeg). The PNGs are colour-to-alpha extractions of that
 * file so the ribbon sits on any background; the source JPEG is untouched.
 * Decorative: the brand name is always present as text nearby.
 */
export function Signature({ tone = "auto", draw = "none", fit = "height", sizes, className, preload }: SignatureProps) {
  const imgClass =
    fit === "cover" ? "absolute inset-0 size-full object-cover select-none" : "h-full w-auto max-w-none select-none";
  const common = { sizes, quality: 80, preload, draggable: false } as const;

  return (
    <span
      aria-hidden="true"
      data-signature={draw === "load" ? "load" : undefined}
      data-animate={draw === "scroll" ? "draw" : undefined}
      className={cn("relative block", className)}
    >
      {tone === "on-brand" ? (
        <Image src={signatureDark} alt="" {...common} className={imgClass} />
      ) : (
        <>
          <Image src={signatureLight} alt="" {...common} className={cn(imgClass, "dark:hidden")} />
          <Image src={signatureDark} alt="" {...common} className={cn(imgClass, "hidden dark:block")} />
        </>
      )}
    </span>
  );
}
