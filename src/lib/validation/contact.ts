import { z } from "zod";
import { serviceSlugs } from "@/content/services";

export const CONTACT_METHODS = ["email", "whatsapp"] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

const emailFormat = z.email();

/** Strips spaces, dashes, dots and brackets; keeps a leading "+". */
export function normalizePhone(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  return trimmed.startsWith("+") ? `+${digits}` : digits;
}

/** 7–15 digits (E.164 allows up to 15), optionally with a leading "+", and only phone punctuation. */
export function isValidPhone(value: string): boolean {
  if (!/^\+?[\d\s().-]+$/.test(value.trim())) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

const fields = {
  name: z
    .string()
    .trim()
    .min(2, { error: "Enter your name." })
    .max(100, { error: "Keep your name under 100 characters." }),
  contactMethod: z.enum(CONTACT_METHODS, { error: "Choose how you'd like us to reply." }).default("email"),
  email: z.string().trim().max(200, { error: "Keep your email under 200 characters." }).default(""),
  whatsapp: z.string().trim().max(30, { error: "Keep the number under 30 characters." }).default(""),
  company: z.string().trim().max(120, { error: "Keep the business name under 120 characters." }).default(""),
  service: z
    .string()
    .default("")
    .refine((v) => v === "" || serviceSlugs.includes(v), { error: "Choose a service from the list." }),
  message: z
    .string()
    .trim()
    .min(20, { error: "Tell us a little more. Your message needs at least 20 characters." })
    .max(5000, { error: "Keep your message under 5,000 characters." }),
};

/**
 * Shared by the contact form (client) and the API route (server). The visitor
 * chooses to be answered by email or on WhatsApp; only the chosen detail is
 * required, and the other is dropped from the output.
 */
export const contactSchema = z
  .object(fields)
  .superRefine((data, ctx) => {
    if (data.contactMethod === "email") {
      if (data.email === "") ctx.addIssue({ code: "custom", path: ["email"], message: "Enter your email address." });
      else if (!emailFormat.safeParse(data.email).success) {
        ctx.addIssue({ code: "custom", path: ["email"], message: "Enter an email address like name@example.com." });
      }
    } else if (data.whatsapp === "") {
      ctx.addIssue({ code: "custom", path: ["whatsapp"], message: "Enter your WhatsApp number." });
    } else if (!isValidPhone(data.whatsapp)) {
      ctx.addIssue({
        code: "custom",
        path: ["whatsapp"],
        message: "Enter a WhatsApp number with its country code, like +231 880 000 000.",
      });
    }
  })
  .transform((data) =>
    data.contactMethod === "email"
      ? { ...data, whatsapp: "" }
      : { ...data, email: "", whatsapp: normalizePhone(data.whatsapp) },
  );

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof typeof fields;
export type FieldErrors = Partial<Record<ContactField, string>>;

/** Returns the first error message for each invalid field. */
export function validateContact(
  input: unknown,
): { success: true; data: ContactData } | { success: false; errors: FieldErrors } {
  const result = contactSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && field in fields && !errors[field as ContactField]) {
      errors[field as ContactField] = issue.message;
    }
  }
  return { success: false, errors };
}

function enquiryLines(input: Partial<ContactInput>): string[] {
  const replyBy =
    input.contactMethod === "whatsapp"
      ? input.whatsapp
        ? `Reply on WhatsApp: ${input.whatsapp}`
        : "Reply on WhatsApp"
      : "";
  return [
    input.message ?? "",
    "",
    input.name ? `Name: ${input.name}` : "",
    input.company ? `Business: ${input.company}` : "",
    input.service ? `Interested in: ${input.service}` : "",
    replyBy,
  ].filter((line, i) => i < 2 || line !== "");
}

/** Builds a mailto: link containing the visitor's message, used when online sending is unavailable. */
export function buildMailtoHref(to: string, input: Partial<ContactInput>): string {
  const subject = `Website enquiry${input.name ? ` from ${input.name}` : ""}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiryLines(input).join("\n"))}`;
}

/** The visitor's enquiry as a WhatsApp message, for the wa.me fallback. */
export function buildWhatsAppText(input: Partial<ContactInput>): string {
  const greeting = `Hello FCA${input.name ? `, this is ${input.name}` : ""}.`;
  return [greeting, "", ...enquiryLines({ ...input, name: undefined, contactMethod: undefined })].join("\n").trim();
}

/** JSON body returned by POST /api/contact. */
export type ContactResponse =
  | { ok: true }
  | { ok: false; error: "invalid"; fieldErrors: FieldErrors }
  | { ok: false; error: "not_configured" | "rate_limited" | "delivery_failed" | "bad_request" | "too_fast"; retryAfterSeconds?: number };
