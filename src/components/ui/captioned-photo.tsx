import Image from "next/image";
import type { Photo } from "@/content/images";
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
};

/** A documentary photograph with its brochure caption underneath. */
export function CaptionedPhoto({
  photo,
  title,
  caption,
  aspect,
  sizes,
  objectPosition = "50% 50%",
  className,
  headingLevel = "h3",
}: CaptionedPhotoProps) {
  const Title = headingLevel;
  return (
    <figure className={className}>
      <div className={cn("relative overflow-hidden bg-surface-sunken", aspect)}>
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
      </div>
      {title || caption ? (
        <figcaption className="mt-4 max-w-md">
          {title ? <Title className="font-bold [font-stretch:112%]">{title}</Title> : null}
          {caption ? <p className="mt-1 text-fg-muted">{caption}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
