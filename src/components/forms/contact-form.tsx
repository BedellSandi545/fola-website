"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import { contact, whatsapp as fcaWhatsapp, whatsappHref } from "@/config/site";
import { services } from "@/content/services";
import { SocialIcon } from "@/components/brand/social-icon";
import {
  buildMailtoHref,
  buildWhatsAppText,
  validateContact,
  type ContactField,
  type ContactInput,
  type ContactMethod,
  type ContactResponse,
  type FieldErrors,
} from "@/lib/validation/contact";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent"; method: ContactMethod; to: string }
  | { kind: "invalid" }
  | { kind: "not_configured" }
  | { kind: "rate_limited"; minutes: number }
  | { kind: "failed" };

type Values = Required<ContactInput>;

const EMPTY: Values = {
  name: "",
  contactMethod: "email",
  email: "",
  whatsapp: "",
  company: "",
  service: "",
  message: "",
};
const FIELD_ORDER: ContactField[] = ["name", "contactMethod", "email", "whatsapp", "company", "service", "message"];
const LABELS: Record<ContactField, string> = {
  name: "Your name",
  contactMethod: "How should we reply?",
  email: "Email address",
  whatsapp: "WhatsApp number",
  company: "Business or organisation",
  service: "What do you need help with?",
  message: "Tell us about your project",
};

const METHODS: { value: ContactMethod; label: string; hint: string }[] = [
  { value: "email", label: "Email", hint: "We'll reply to your inbox" },
  { value: "whatsapp", label: "WhatsApp", hint: "We'll message you on WhatsApp" },
];

const inputClass =
  "mt-2 block w-full rounded-none border-0 border-b-2 border-line bg-transparent px-0 py-3 text-[1.0625rem] text-fg placeholder:text-fg-muted/70 transition-colors duration-200 focus:border-fg focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger";

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef<number | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Move focus to the outcome so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (status.kind === "invalid") summaryRef.current?.focus();
    if (status.kind === "sent" || status.kind === "not_configured" || status.kind === "failed" || status.kind === "rate_limited") {
      resultRef.current?.focus();
    }
  }, [status.kind]);

  const fieldId = (field: ContactField) => `${formId}-${field}`;
  const errorId = (field: ContactField) => `${formId}-${field}-error`;
  const serviceTitle = services.find((s) => s.slug === values.service)?.title ?? "";
  const mailto = buildMailtoHref(contact.email, { ...values, service: serviceTitle });
  const whatsappFallback = whatsappHref(buildWhatsAppText({ ...values, service: serviceTitle }));
  const byWhatsApp = values.contactMethod === "whatsapp";
  const replyField: ContactField = byWhatsApp ? "whatsapp" : "email";

  function update<F extends ContactField>(field: F, value: Values[F]) {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear a field's error as soon as it becomes valid; don't add new errors while typing.
    if (errors[field]) {
      const next = validateContact({ ...values, [field]: value });
      if (next.success || !next.errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  function chooseMethod(method: ContactMethod) {
    setValues((v) => ({ ...v, contactMethod: method }));
    // The other reply field is no longer asked for, so its error no longer applies.
    setErrors((e) => ({ ...e, contactMethod: undefined, email: undefined, whatsapp: undefined }));
  }

  function validateField(field: ContactField) {
    const result = validateContact(values);
    const message = result.success ? undefined : result.errors[field];
    // Only report on blur once the visitor has typed something; empty fields are checked on submit.
    if (values[field] === "" && !errors[field]) return;
    setErrors((e) => ({ ...e, [field]: message }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const honeypot = new FormData(event.currentTarget).get("website");
    const result = validateContact(values);
    if (!result.success) {
      setErrors(result.errors);
      setStatus({ kind: "invalid" });
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          website: typeof honeypot === "string" ? honeypot : "",
          elapsedMs: startedAt.current ? Date.now() - startedAt.current : 0,
        }),
      });
      const body = (await response.json().catch(() => null)) as ContactResponse | null;

      if (response.ok && body?.ok) {
        const { contactMethod, email, whatsapp } = result.data;
        setStatus({ kind: "sent", method: contactMethod, to: contactMethod === "whatsapp" ? whatsapp : email });
        setValues(EMPTY);
        return;
      }
      if (body && !body.ok) {
        if (body.error === "invalid") {
          setErrors(body.fieldErrors);
          setStatus({ kind: "invalid" });
          return;
        }
        if (body.error === "not_configured") return setStatus({ kind: "not_configured" });
        if (body.error === "rate_limited") {
          return setStatus({ kind: "rate_limited", minutes: Math.max(1, Math.ceil((body.retryAfterSeconds ?? 600) / 60)) });
        }
      }
      setStatus({ kind: "failed" });
    } catch {
      setStatus({ kind: "failed" });
    }
  }

  if (status.kind === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="border-t-2 border-success pt-8 outline-none">
        <CheckCircle2 aria-hidden="true" className="size-8 text-success" />
        <h2 className="mt-4 text-3xl font-bold [font-stretch:112%]">Message sent</h2>
        <p className="mt-3 max-w-md text-fg-muted">
          Thanks for getting in touch.{" "}
          {status.method === "whatsapp" ? "We'll message you on WhatsApp at " : "We'll reply to "}
          <strong className="text-fg">{status.to}</strong>.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 inline-flex min-h-11 cursor-pointer items-center font-semibold underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((f) => errors[f]);
  const submitting = status.kind === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${formId}-required`} className="space-y-8">
      {status.kind === "invalid" && errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-4 border-danger bg-surface py-4 pr-4 pl-5 outline-none"
        >
          <h2 className="font-bold">
            {errorList.length === 1 ? "Check one field before sending" : `Check ${errorList.length} fields before sending`}
          </h2>
          <ul className="mt-2 space-y-1">
            {errorList.map((field) => (
              <li key={field}>
                <a
                  href={`#${field === "contactMethod" ? `${fieldId(field)}-email` : fieldId(field)}`}
                  className="text-danger underline underline-offset-4"
                >
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p id={`${formId}-required`} className="text-sm text-fg-muted">
        Fields marked * are required.
      </p>

      <fieldset aria-describedby={errors.contactMethod ? errorId("contactMethod") : undefined}>
        <legend className="font-semibold">{LABELS.contactMethod} *</legend>
        <p className="mt-1 text-sm text-fg-muted">Choose email or WhatsApp. We only ask for the one you pick.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {METHODS.map((m) => {
            const checked = values.contactMethod === m.value;
            return (
              <label
                key={m.value}
                htmlFor={`${fieldId("contactMethod")}-${m.value}`}
                className={cn(
                  "group relative flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-3 transition-[border-color,background-color] duration-200",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-[var(--ring)]",
                  checked ? "border-fg bg-surface" : "border-line hover:border-fg-muted",
                )}
              >
                <input
                  id={`${fieldId("contactMethod")}-${m.value}`}
                  type="radio"
                  name="contactMethod"
                  value={m.value}
                  checked={checked}
                  onChange={() => chooseMethod(m.value)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                    checked ? "bg-accent text-on-accent" : "bg-surface-sunken text-fg",
                  )}
                >
                  {m.value === "email" ? <Mail className="size-[1.1rem]" /> : <SocialIcon network="whatsapp" className="size-[1.1rem]" />}
                </span>
                <span className="leading-tight">
                  <span className="block font-semibold">{m.label}</span>
                  <span className="block text-sm text-fg-muted">{m.hint}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "ml-auto flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200",
                    checked ? "border-fg" : "border-line",
                  )}
                >
                  <span className={cn("size-2.5 rounded-full bg-fg transition-transform duration-200", checked ? "scale-100" : "scale-0")} />
                </span>
              </label>
            );
          })}
        </div>
        {errors.contactMethod ? <ErrorText id={errorId("contactMethod")}>{errors.contactMethod}</ErrorText> : null}
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id={fieldId("name")} label={`${LABELS.name} *`} error={errors.name} errorId={errorId("name")}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => validateField("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={inputClass}
          />
        </Field>
        {/* Keyed so the swap between email and WhatsApp replays its entrance. */}
        <div key={replyField} className="form-swap">
          {byWhatsApp ? (
            <Field
              id={fieldId("whatsapp")}
              label={`${LABELS.whatsapp} *`}
              hint="Include your country code, e.g. +231."
              hintId={`${formId}-whatsapp-hint`}
              error={errors.whatsapp}
              errorId={errorId("whatsapp")}
            >
              <input
                id={fieldId("whatsapp")}
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="+231 880 000 000"
                value={values.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                onBlur={() => validateField("whatsapp")}
                aria-invalid={errors.whatsapp ? true : undefined}
                aria-describedby={cn(`${formId}-whatsapp-hint`, errors.whatsapp && errorId("whatsapp"))}
                className={inputClass}
              />
            </Field>
          ) : (
            <Field id={fieldId("email")} label={`${LABELS.email} *`} error={errors.email} errorId={errorId("email")}>
              <input
                id={fieldId("email")}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                onBlur={() => validateField("email")}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? errorId("email") : undefined}
                className={inputClass}
              />
            </Field>
          )}
        </div>
        <Field id={fieldId("company")} label={LABELS.company} error={errors.company} errorId={errorId("company")}>
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => validateField("company")}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? errorId("company") : undefined}
            className={inputClass}
          />
        </Field>
        <Field id={fieldId("service")} label={LABELS.service} error={errors.service} errorId={errorId("service")}>
          <select
            id={fieldId("service")}
            name="service"
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? errorId("service") : undefined}
            className={cn(inputClass, "cursor-pointer bg-bg")}
          >
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id={fieldId("message")}
        label={`${LABELS.message} *`}
        hint="What are you working on, and what would you like to achieve?"
        hintId={`${formId}-message-hint`}
        error={errors.message}
        errorId={errorId("message")}
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          required
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => validateField("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={cn(`${formId}-message-hint`, errors.message && errorId("message"))}
          className={cn(inputClass, "resize-y")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <StatusMessage status={status} mailto={mailto} whatsappFallback={whatsappFallback} resultRef={resultRef} />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className="group inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full bg-accent px-7 text-[0.95rem] font-semibold text-on-accent [font-stretch:112%] transition-[background-color,color,transform] duration-200 hover:bg-fg hover:text-bg active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : null}
          {submitting ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-fg-muted">
          Prefer to reach us directly?{" "}
          <a href={`mailto:${contact.email}`} className="font-medium text-fg underline underline-offset-4">
            Email
          </a>{" "}
          or{" "}
          <a
            href={whatsappHref(fcaWhatsapp.greeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-fg underline underline-offset-4"
          >
            WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </div>
      <p className="text-sm text-fg-muted">
        We use your details only to reply to your enquiry. See our{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          privacy notice
        </Link>
        .
      </p>
    </form>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  hint,
  hintId,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-fg-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
}

const fallbackButton =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 font-semibold transition-colors duration-200 hover:bg-fg hover:text-bg";

function StatusMessage({
  status,
  mailto,
  whatsappFallback,
  resultRef,
}: {
  status: Status;
  mailto: string;
  whatsappFallback: string;
  resultRef: RefObject<HTMLDivElement | null>;
}) {
  let title: string | null = null;
  let body: string | null = null;

  if (status.kind === "not_configured") {
    title = "Online sending isn't available yet";
    body =
      "Your message has not been sent. Send it by email or WhatsApp instead: the buttons below open your app with your message filled in.";
  } else if (status.kind === "rate_limited") {
    title = "Too many messages from this connection";
    body = `Your message has not been sent. Try again in about ${status.minutes} minute${status.minutes === 1 ? "" : "s"}, or send it by email or WhatsApp now.`;
  } else if (status.kind === "failed") {
    title = "Your message couldn't be sent";
    body =
      "Check your connection and try again, or send it by email or WhatsApp: the buttons below open your app with your message filled in.";
  }

  return (
    <div aria-live="polite">
      {title ? (
        <div ref={resultRef} tabIndex={-1} className="border-l-4 border-accent bg-surface py-5 pr-5 pl-5 outline-none">
          <p className="font-bold">{title}</p>
          <p className="mt-1 text-fg-muted">{body}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={mailto} className={fallbackButton}>
              <Mail aria-hidden="true" className="size-4" />
              Email your message
            </a>
            <a href={whatsappFallback} target="_blank" rel="noopener noreferrer" className={fallbackButton}>
              <SocialIcon network="whatsapp" className="size-4" />
              Send on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
