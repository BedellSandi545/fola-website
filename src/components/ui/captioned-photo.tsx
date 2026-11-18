import Image from "next/image";
import type { Photo } from "@/content/images";
import { Parallax } from "@/components/motion/parallax";
import { cn } from "@/lib/cn";

type CaptionedPhotoProps = {
  photo: Photo;
  title?: string;
  caption?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". */
  aspect: string;
  sizes: string;
  objectPosition?: string;
  className?: string;
  headingLevel?: "h3" | "p";
  /** "on-brand" for captions set on the navy band. */
  tone?: "default" | "on-brand";
  /** Let the photograph drift slowly inside its frame while scrolling. */
  parallax?: boolean;
};

/**
 * A documentary photograph with its brochure caption underneath. The frame opens
 * from the bottom as it enters the viewport, and the photograph settles from a
 * slight zoom (globals.css › mask). Hovering eases the photograph in a little.
 */
export function CaptionedPhoto({
  photo,
  title,
  caption,
  aspect,
  sizes,
  objectPosition = "50% 50%",
  className,
  headingLevel = "h3",
  tone = "default",
  parallax = false,
}: CaptionedPhotoProps) {
  const Title = headingLevel;
  const image = (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      quality={70}
      placeholder="blur"
      className="object-cover"
      style={{ objectPosition }}
    />
  );

  return (
    <figure className={cn("group", className)}>
      <div data-animate="mask" className={cn("relative overflow-hidden bg-surface-sunken", aspect)}>
        <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
          {parallax ? <Parallax amount={7}>{image}</Parallax> : image}
        </div>
      </div>
      {title || caption ? (
        <figcaption data-animate="rise" className="mt-5 max-w-md">
          {title ? (
            <Title className={cn("text-lg font-bold [font-stretch:112%]", tone === "on-brand" && "text-on-brand")}>{title}</Title>
          ) : null}
          {caption ? <p className={cn("mt-1", tone === "on-brand" ? "text-on-brand-muted" : "text-fg-muted")}>{caption}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
