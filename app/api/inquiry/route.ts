import { NextResponse } from "next/server";
import { contactTopics, type ContactTopic } from "@/content/site";

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  topic?: unknown;
  message?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid_json", message: "Invalid request body." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (asString(payload.website)) {
    return NextResponse.json(
      { ok: true },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }

  const name = asString(payload.name);
  const email = asString(payload.email);
  const organization = asString(payload.organization);
  const topic = asString(payload.topic);
  const message = asString(payload.message);

  const errors: Record<string, string> = {};

  if (name.length < 2 || name.length > 120) {
    errors.name = "Please enter a name between 2 and 120 characters.";
  }

  if (!emailPattern.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address.";
  }

  if (!contactTopics.includes(topic as ContactTopic)) {
    errors.topic = "Please choose a valid inquiry category.";
  }

  if (message.length < 20 || message.length > 4000) {
    errors.message = "Please enter a message between 20 and 4,000 characters.";
  }

  if (organization.length > 160) {
    errors.organization = "Please keep the organization under 160 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        code: "validation",
        message: "Some fields need attention.",
        errors,
      },
      { status: 422, headers: { "Cache-Control": "no-store" } },
    );
  }

  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message:
          "No inquiry destination is configured for this build. Nothing was sent or stored.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  let destination: URL;
  try {
    destination = new URL(webhookUrl);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "configuration_error",
        message: "The inquiry destination is not configured correctly.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!["http:", "https:"].includes(destination.protocol)) {
    return NextResponse.json(
      {
        ok: false,
        code: "configuration_error",
        message: "The inquiry destination is not configured correctly.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (process.env.INQUIRY_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}`;
  }

  try {
    const delivery = await fetch(destination, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: "the-forensic-neuroscientist",
        submittedAt: new Date().toISOString(),
        name,
        email,
        organization,
        topic,
        message,
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!delivery.ok) {
      return NextResponse.json(
        {
          ok: false,
          code: "delivery_failed",
          message:
            "The inquiry service did not accept the message. Please try again later.",
        },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { ok: true },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "delivery_failed",
        message:
          "The inquiry service could not be reached. Please try again later.",
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
