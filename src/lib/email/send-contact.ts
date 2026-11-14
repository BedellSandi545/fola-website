import "server-only";
import { services } from "@/content/services";
import type { ContactData } from "@/lib/validation/contact";

export type DeliveryResult =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "failed"; detail: string };

type EmailConfig = { apiKey: string; to: string; from: string };

/** Reads provider settings from server-only environment variables. */
export function getEmailConfig(env: Record<string, string | undefined> = process.env): EmailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  if (!apiKey || !to) return null;
  return { apiKey, to, from: env.CONTACT_FROM_EMAIL?.trim() || "FCA Website <onboarding@resend.dev>" };
}

function formatText(data: ContactData): string {
  const service = services.find((s) => s.slug === data.service)?.title;
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Business: ${data.company}` : null,
    service ? `Interested in: ${service}` : null,
    "",
    data.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

/**
 * Provider boundary. Sends via Resend's HTTP API (no SDK needed).
 * To use another provider, replace the body of this function and keep the
 * DeliveryResult contract: return "sent" only after the provider confirms.
 */
export async function sendContactEmail(
  data: ContactData,
  config: EmailConfig | null = getEmailConfig(),
  fetchImpl: typeof fetch = fetch,
): Promise<DeliveryResult> {
  if (!config) return { status: "not_configured" };

  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: data.email,
        subject: `Website enquiry from ${data.name}`,
        text: formatText(data),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { status: "failed", detail: `Provider responded ${res.status}` };
    return { status: "sent" };
  } catch (error) {
    return { status: "failed", detail: error instanceof Error ? error.message : "Unknown error" };
  }
}
