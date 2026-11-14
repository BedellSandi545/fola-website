import { z } from "zod";
import { serviceSlugs } from "@/content/services";

/** Shared by the contact form (client) and the API route (server). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Enter your name." })
    .max(100, { error: "Keep your name under 100 characters." }),
  email: z
    .string()
    .trim()
    .min(1, { error: "Enter your email address." })
    .max(200, { error: "Keep your email under 200 characters." })
    .pipe(z.email({ error: "Enter an email address like name@example.com." })),
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
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactData;
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
    if (typeof field === "string" && field in contactSchema.shape && !errors[field as ContactField]) {
      errors[field as ContactField] = issue.message;
    }
  }
  return { success: false, errors };
}

/** Builds a mailto: link containing the visitor's message, used when online sending is unavailable. */
export function buildMailtoHref(to: string, input: Partial<ContactInput>): string {
  const subject = `Website enquiry${input.name ? ` from ${input.name}` : ""}`;
  const lines = [
    input.message ?? "",
    "",
    input.name ? `Name: ${input.name}` : "",
    input.company ? `Business: ${input.company}` : "",
    input.service ? `Interested in: ${input.service}` : "",
  ].filter((line, i) => i < 2 || line !== "");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

/** JSON body returned by POST /api/contact. */
export type ContactResponse =
  | { ok: true }
  | { ok: false; error: "invalid"; fieldErrors: FieldErrors }
  | { ok: false; error: "not_configured" | "rate_limited" | "delivery_failed" | "bad_request" | "too_fast"; retryAfterSeconds?: number };
