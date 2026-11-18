import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

let ipCounter = 0;

function request(body: unknown, ip = `10.0.0.${++ipCounter}`) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const enquiry = {
  name: "Ama Kollie",
  email: "ama@example.com",
  company: "",
  service: "",
  message: "We would like help planning a product launch event.",
  website: "",
  elapsedMs: 12_000,
};

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("CONTACT_TO_EMAIL", "");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("returns 503 not_configured when no email provider is set up (never a fake success)", async () => {
    const res = await POST(request(enquiry));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "not_configured" });
  });

  it("returns field errors for invalid input", async () => {
    const res = await POST(request({ ...enquiry, email: "nope" }));
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.error).toBe("invalid");
    expect(body.fieldErrors.email).toBeDefined();
  });

  it("rejects malformed JSON", async () => {
    const res = await POST(request("{not json"));
    expect(res.status).toBe(400);
  });

  it("quietly accepts but does not send when the honeypot is filled", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "inbox@example.com");
    const res = await POST(request({ ...enquiry, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects submissions completed faster than a person could type", async () => {
    const res = await POST(request({ ...enquiry, elapsedMs: 300 }));
    expect(res.status).toBe(422);
    expect((await res.json()).error).toBe("too_fast");
  });

  it("returns success only after the provider confirms delivery", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "inbox@example.com");

    const res = await POST(request(enquiry));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer test-key");
    const payload = JSON.parse(init.body as string);
    expect(payload.to).toEqual(["inbox@example.com"]);
    expect(payload.reply_to).toBe("ama@example.com");
    expect(payload.text).toContain("We would like help planning a product launch event.");
  });

  it("sends WhatsApp enquiries without a reply-to address and includes the number", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "inbox@example.com");

    const res = await POST(request({ ...enquiry, email: "", contactMethod: "whatsapp", whatsapp: "+231 880 007 811" }));
    expect(res.status).toBe(200);
    const payload = JSON.parse((fetchSpy.mock.calls[0] as [string, RequestInit])[1].body as string);
    expect(payload.reply_to).toBeUndefined();
    expect(payload.subject).toContain("reply on WhatsApp");
    expect(payload.text).toContain("Reply on WhatsApp: +231880007811 (https://wa.me/231880007811)");
  });

  it("returns 502 when the provider rejects the message", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 500 })));
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "inbox@example.com");
    const res = await POST(request(enquiry));
    expect(res.status).toBe(502);
    expect((await res.json()).error).toBe("delivery_failed");
  });

  it("returns 502 when the provider cannot be reached", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "inbox@example.com");
    const res = await POST(request(enquiry));
    expect(res.status).toBe(502);
  });

  it("rate-limits repeated submissions from one address", async () => {
    const ip = "192.168.50.50";
    for (let i = 0; i < 5; i++) await POST(request(enquiry, ip));
    const res = await POST(request(enquiry, ip));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toMatch(/^\d+$/);
  });
});
