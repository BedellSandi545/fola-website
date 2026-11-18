import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit within a window, then blocks with a retry time", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 60_000 });
    expect(check("ip", 0)).toEqual({ ok: true });
    expect(check("ip", 1_000)).toEqual({ ok: true });
    expect(check("ip", 2_000)).toEqual({ ok: false, retryAfterSeconds: 58 });
  });

  it("resets after the window ends", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1_000 });
    expect(check("ip", 0).ok).toBe(true);
    expect(check("ip", 500).ok).toBe(false);
    expect(check("ip", 1_000).ok).toBe(true);
  });

  it("tracks keys independently", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1_000 });
    expect(check("a", 0).ok).toBe(true);
    expect(check("b", 0).ok).toBe(true);
    expect(check("a", 10).ok).toBe(false);
  });

  it("caps tracked keys, evicting the oldest", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 60_000, maxKeys: 2 });
    expect(check("a", 0).ok).toBe(true);
    expect(check("b", 0).ok).toBe(true);
    expect(check("c", 0).ok).toBe(true); // evicts "a"
    expect(check("a", 0).ok).toBe(true);
    expect(check("c", 0).ok).toBe(false);
  });
});
