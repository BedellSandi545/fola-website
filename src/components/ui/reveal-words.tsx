import type { CSSProperties } from "react";

/**
 * Splits a heading's text into masked words that rise into place on reveal
 * (see globals.css › words). Rendered on the server, so the text is real,
 * selectable and read normally by assistive technology. Without motion the
 * words simply sit in place.
 */
export function RevealWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span data-animate="words" className="block" style={{ "--d": `${delay}ms` } as CSSProperties}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="word" style={{ "--wi": i } as CSSProperties}>
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
