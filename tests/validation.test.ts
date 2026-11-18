import { describe, expect, it } from "vitest";
import { buildMailtoHref, buildWhatsAppText, validateContact } from "@/lib/validation/contact";

const valid = {
  name: "Ama Kollie",
  email: "ama@example.com",
  company: "Example Ltd",
  service: "branding",
  message: "We are opening a new restaurant and need a brand and launch campaign.",
};

describe("validateContact", () => {
  it("accepts a complete, valid enquiry and trims whitespace", () => {
    const result = validateContact({ ...valid, name: "  Ama Kollie  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Ama Kollie");
  });

  it("treats company and service as optional", () => {
    const result = validateContact({ name: valid.name, email: valid.email, message: valid.message });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.company).toBe("");
      expect(result.data.service).toBe("");
    }
  });

  it("reports one clear message per invalid field", () => {
    const result = validateContact({ name: "A", email: "not-an-email", message: "Too short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBe("Enter your name.");
      expect(result.errors.email).toBe("Enter an email address like name@example.com.");
      expect(result.errors.message).toMatch(/at least 20 characters/);
    }
  });

  it("asks for an email when it is missing", () => {
    const result = validateContact({ ...valid, email: "   " });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.email).toBe("Enter your email address.");
  });

  it("rejects service values that are not on the list", () => {
    const result = validateContact({ ...valid, service: "crypto-trading" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.service).toBe("Choose a service from the list.");
  });

  it("rejects messages over 5,000 characters", () => {
    const result = validateContact({ ...valid, message: "x".repeat(5001) });
    expect(result.success).toBe(false);
  });

  it("ignores unknown fields such as the honeypot", () => {
    const result = validateContact({ ...valid, website: "spam", elapsedMs: 9000 });
    expect(result.success).toBe(true);
  });
});

describe("buildMailtoHref", () => {
  it("encodes the subject and message for an email fallback", () => {
    const href = buildMailtoHref("hello@example.com", {
      name: "Ama & Co",
      message: "Line one\nLine two",
      company: "",
      service: "Branding",
    });
    expect(href.startsWith("mailto:hello@example.com?subject=")).toBe(true);
    const url = new URL(href);
    expect(url.searchParams.get("subject")).toBe("Website enquiry from Ama & Co");
    const body = url.searchParams.get("body") ?? "";
    expect(body).toContain("Line one\nLine two");
    expect(body).toContain("Interested in: Branding");
    expect(body).not.toContain("Business:");
  });
});

describe("validateContact: reply method", () => {
  const base = { name: "Ama Kollie", message: "We are opening a new restaurant and need a launch campaign." };

  it("defaults to email and requires an email address", () => {
    const result = validateContact(base);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBe("Enter your email address.");
      expect(result.errors.whatsapp).toBeUndefined();
    }
  });

  it("accepts WhatsApp without an email and normalises the number", () => {
    const result = validateContact({ ...base, contactMethod: "whatsapp", whatsapp: " +231 (880) 007-811 " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.contactMethod).toBe("whatsapp");
      expect(result.data.whatsapp).toBe("+231880007811");
      expect(result.data.email).toBe("");
    }
  });

  it("requires a WhatsApp number when WhatsApp is chosen", () => {
    const result = validateContact({ ...base, contactMethod: "whatsapp", email: "ama@example.com" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.whatsapp).toBe("Enter your WhatsApp number.");
      expect(result.errors.email).toBeUndefined();
    }
  });

  it("rejects numbers that are too short or contain letters", () => {
    for (const whatsapp of ["12345", "+231 88O 007 811"]) {
      const result = validateContact({ ...base, contactMethod: "whatsapp", whatsapp });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.errors.whatsapp).toMatch(/country code/);
    }
  });

  it("drops the WhatsApp number when email is chosen", () => {
    const result = validateContact({ ...base, contactMethod: "email", email: "ama@example.com", whatsapp: "+231880007811" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.whatsapp).toBe("");
  });

  it("rejects unknown reply methods", () => {
    const result = validateContact({ ...base, contactMethod: "fax", email: "ama@example.com" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.contactMethod).toBe("Choose how you'd like us to reply.");
  });
});

describe("buildWhatsAppText", () => {
  it("writes the enquiry as a WhatsApp message", () => {
    const text = buildWhatsAppText({ name: "Ama", message: "We need a logo.", service: "Branding" });
    expect(text.startsWith("Hello FCA, this is Ama.")).toBe(true);
    expect(text).toContain("We need a logo.");
    expect(text).toContain("Interested in: Branding");
    expect(text).not.toContain("Name:");
  });
});
