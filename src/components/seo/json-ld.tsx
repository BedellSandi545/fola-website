import { serializeJsonLd } from "@/lib/structured-data";

type Props = { data: Parameters<typeof serializeJsonLd>[0] };

/** Server-rendered structured data. Content is static and escaped by serializeJsonLd. */
export function JsonLd({ data }: Props) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
