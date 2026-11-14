import { createRateLimiter } from "@/lib/rate-limit";
import { validateContact, type ContactResponse } from "@/lib/validation/contact";
import { sendContactEmail } from "@/lib/email/send-contact";

/** 5 submissions per 10 minutes per IP (best effort; see src/lib/rate-limit.ts). */
const checkRateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

/** Humans need longer than this to fill in the form; faster submissions are treated as automated. */
const MIN_FILL_MS = 2500;

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const limit = checkRateLimit(clientIp(request));
  if (!limit.ok) {
    return json({ ok: false, error: "rate_limited", retryAfterSeconds: limit.retryAfterSeconds }, 429, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Body must be an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Bots get a quiet 200 and nothing is sent.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (elapsed < MIN_FILL_MS) {
    return json({ ok: false, error: "too_fast" }, 422);
  }

  const result = validateContact(body);
  if (!result.success) {
    return json({ ok: false, error: "invalid", fieldErrors: result.errors }, 422);
  }

  const delivery = await sendContactEmail(result.data);
  if (delivery.status === "not_configured") return json({ ok: false, error: "not_configured" }, 503);
  if (delivery.status === "failed") {
    console.error("[contact] delivery failed:", delivery.detail);
    return json({ ok: false, error: "delivery_failed" }, 502);
  }
  return json({ ok: true }, 200);
}
