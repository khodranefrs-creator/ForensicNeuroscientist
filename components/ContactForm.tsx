"use client";

import { useState, type FormEvent } from "react";
import { contactTopics, type ContactTopic } from "@/content/site";
import { cx } from "@/lib/format";
import { Alert, Check } from "./Icons";

type ContactFormProps = {
  defaultTopic?: ContactTopic;
  deliveryConfigured: boolean;
};

type FormValues = {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
  website: string;
};

type FieldErrors = Partial<Record<"name" | "email" | "topic" | "message", string>>;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "not-configured" }
  | { kind: "error"; message: string };

const initialValues: FormValues = {
  name: "",
  email: "",
  organization: "",
  topic: "General inquiry",
  message: "",
  website: "",
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!contactTopics.includes(values.topic as ContactTopic)) {
    errors.topic = "Please choose an inquiry category.";
  }

  const messageLength = values.message.trim().length;
  if (messageLength < 20) {
    errors.message = "Please add at least 20 characters so we can understand the inquiry.";
  } else if (messageLength > 4000) {
    errors.message = "Please keep the message under 4,000 characters.";
  }

  return errors;
}

export function ContactForm({
  defaultTopic = "General inquiry",
  deliveryConfigured,
}: ContactFormProps) {
  const [values, setValues] = useState<FormValues>({
    ...initialValues,
    topic: defaultTopic,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const submitting = status.kind === "submitting";

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field as keyof FieldErrors];
        return next;
      });
    }
    if (status.kind !== "idle" && status.kind !== "submitting") {
      setStatus({ kind: "idle" });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; code?: string; message?: string }
        | null;

      if (response.ok && payload?.ok) {
        setStatus({ kind: "success" });
        setValues({ ...initialValues, topic: defaultTopic });
        return;
      }

      if (payload?.code === "not_configured") {
        setStatus({ kind: "not-configured" });
        return;
      }

      setStatus({
        kind: "error",
        message:
          payload?.message ??
          "The inquiry could not be delivered. Please try again in a moment.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "The form could not reach the server. Check your connection and try again.",
      });
    }
  }

  return (
    <form
      className="contactForm"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="formIntro">
        <p className="kicker">Inquiry form</p>
        <p>
          Share enough context to make the question clear. Fields marked with an
          asterisk are required.
        </p>
      </div>

      {status.kind === "success" ? (
        <div className="formStatus formStatusSuccess" role="status">
          <Check />
          <div>
            <strong>Your inquiry has been sent.</strong>
            <p>
              The delivery endpoint accepted the message. No further action is
              needed here.
            </p>
          </div>
        </div>
      ) : null}

      {status.kind === "not-configured" ? (
        <div className="formStatus formStatusNotice" role="alert">
          <Alert />
          <div>
            <strong>Nothing was sent.</strong>
            <p>
              This build validates the form but has no inquiry destination
              configured. Your message has not been delivered or stored.
            </p>
          </div>
        </div>
      ) : null}

      {status.kind === "error" ? (
        <div className="formStatus formStatusError" role="alert">
          <Alert />
          <div>
            <strong>The message was not delivered.</strong>
            <p>{status.message}</p>
          </div>
        </div>
      ) : null}

      <div className="formGrid">
        <div className="formField">
          <label htmlFor="contact-name">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            disabled={submitting}
          />
          {errors.name ? (
            <p className="fieldError" id="contact-name-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="formField">
          <label htmlFor="contact-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            disabled={submitting}
          />
          {errors.email ? (
            <p className="fieldError" id="contact-email-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="formField">
          <label htmlFor="contact-organization">Organization</label>
          <input
            id="contact-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            value={values.organization}
            onChange={(event) =>
              updateField("organization", event.target.value)
            }
            disabled={submitting}
          />
        </div>

        <div className="formField">
          <label htmlFor="contact-topic">
            Inquiry category <span aria-hidden="true">*</span>
          </label>
          <select
            id="contact-topic"
            name="topic"
            value={values.topic}
            onChange={(event) => updateField("topic", event.target.value)}
            aria-invalid={errors.topic ? true : undefined}
            aria-describedby={errors.topic ? "contact-topic-error" : undefined}
            disabled={submitting}
          >
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errors.topic ? (
            <p className="fieldError" id="contact-topic-error">
              {errors.topic}
            </p>
          ) : null}
        </div>
      </div>

      <div className="formField">
        <label htmlFor="contact-message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={cx(
            "contact-message-hint",
            errors.message ? "contact-message-error" : undefined,
          )}
          disabled={submitting}
        />
        <div className="fieldFoot">
          <p id="contact-message-hint">
            Please do not include sensitive personal or clinical information.
          </p>
          <p>{values.message.length} / 4000</p>
        </div>
        {errors.message ? (
          <p className="fieldError" id="contact-message-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <div className="formSubmitRow">
        <button
          type="submit"
          className="btn btnPrimary"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Send inquiry"}
        </button>
        <p className="formPrivacy">
          By submitting, you agree that your details may be used to respond to
          this inquiry. See the <a href="/privacy">privacy note</a>.
        </p>
      </div>

      {!deliveryConfigured ? (
        <p className="formDemoNote">
          <Alert />
          Demo state: delivery is not configured in this build. Submitting
          validates the form but does not send or store the message.
        </p>
      ) : null}

      <p className="formSafety">
        This form is not monitored for emergencies. It is not a source of
        medical or legal advice.
      </p>
    </form>
  );
}
