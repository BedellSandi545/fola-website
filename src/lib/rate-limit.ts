export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

/**
 * Fixed-window, in-memory rate limiter.
 *
 * Best-effort only: state lives in the memory of a single server instance, so on
 * serverless platforms each instance keeps its own counters. That is enough to
 * blunt casual abuse of the contact form. For stronger guarantees, swap this for
 * a shared store (for example Upstash Redis) behind the same interface.
 */
export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 5000,
}: {
  limit: number;
  windowMs: number;
  /** Hard cap on tracked keys, so many distinct keys cannot exhaust memory. */
  maxKeys?: number;
}) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now: number = Date.now()): RateLimitResult {
    if (!hits.has(key) && hits.size >= maxKeys) {
      // Drop expired entries first, then the oldest ones (Map keeps insertion order).
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      for (const k of hits.keys()) {
        if (hits.size < maxKeys) break;
        hits.delete(k);
      }
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true };
    }
    if (entry.count >= limit) {
      return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
    }
    entry.count += 1;
    return { ok: true };
  };
}
