import { expect, test } from "@playwright/test";

const validInquiry = {
  name: "Jordan Example",
  email: "jordan@example.org",
  organization: "Example Clinic",
  topic: "Consultation",
  message:
    "I would like to ask about a training session for our clinical and legal team.",
  website: "",
};

test("rejects malformed JSON", async ({ request }) => {
  const response = await request.post("/api/inquiry", {
    headers: { "Content-Type": "application/json" },
    data: Buffer.from("{"),
  });

  expect(response.status()).toBe(400);
  expect(await response.json()).toMatchObject({
    ok: false,
    code: "invalid_json",
  });
});

test("rejects invalid fields with a validation payload", async ({
  request,
}) => {
  const response = await request.post("/api/inquiry", {
    data: { name: "", email: "not-an-email", topic: "Unknown", message: "Short" },
  });

  expect(response.status()).toBe(422);
  const body = await response.json();
  expect(body).toMatchObject({ ok: false, code: "validation" });
  expect(Object.keys(body.errors).sort()).toEqual([
    "email",
    "message",
    "name",
    "topic",
  ]);
});

test("silently accepts honeypot submissions", async ({ request }) => {
  const response = await request.post("/api/inquiry", {
    data: { ...validInquiry, website: "https://spam.example" },
  });

  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ ok: true });
});

test("does not claim delivery when no destination is configured", async ({
  request,
}) => {
  test.skip(
    Boolean(process.env.INQUIRY_WEBHOOK_URL),
    "A delivery destination is configured in this environment.",
  );

  const response = await request.post("/api/inquiry", { data: validInquiry });
  expect(response.status()).toBe(503);
  expect(await response.json()).toMatchObject({
    ok: false,
    code: "not_configured",
  });
});
