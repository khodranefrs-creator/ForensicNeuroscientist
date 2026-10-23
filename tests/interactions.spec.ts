import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile drawer traps focus, closes on Escape, and restores focus", async ({
    page,
  }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open navigation menu" });

    await toggle.click();

    const dialog = page.getByRole("dialog", { name: "Navigation" });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "Close navigation menu" }),
    ).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Shift+Tab");
    await expect(
      dialog.getByRole("link", { name: "Watch on YouTube" }),
    ).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(toggle).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });
});

test("desktop navigation marks the current page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about");

  const currentLink = page.locator('.sidebar [aria-current="page"]');
  await expect(currentLink).toHaveCount(1);
  await expect(currentLink).toContainText("About");
});

test.describe("video library", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("searches, clears, and opens a keyboard-dismissible player", async ({
    page,
  }) => {
    await page.goto("/videos");

    const count = page.locator(".libraryCount");
    await expect(count).toContainText("14 of 14");

    const search = page.getByRole("searchbox", { name: "Search video titles" });
    await search.fill("trauma");
    await expect(count).toContainText("1 of 14");
    await expect(page.locator(".videoCard")).toHaveCount(1);

    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(count).toContainText("14 of 14");

    await search.fill("no-such-video-title");
    await expect(page.getByRole("status")).toContainText("No results");
    await page.getByRole("button", { name: "Clear search" }).last().click();
    await expect(page.locator(".videoCard")).toHaveCount(14);

    const firstCard = page.locator(".videoCard").first();
    const firstTitle = (await firstCard.locator("h3").textContent())?.trim();
    const playButton = firstCard.locator(".videoThumb");

    await playButton.click();

    const player = page.getByRole("dialog", { name: firstTitle ?? "" });
    await expect(player).toBeVisible();
    await expect(
      player.getByRole("button", { name: "Close video player" }),
    ).toBeFocused();
    await expect(player.locator("iframe")).toHaveAttribute(
      "src",
      /youtube-nocookie\.com\/embed\//,
    );
    await expect(player.locator("iframe")).toHaveAttribute(
      "title",
      firstTitle ?? "",
    );

    await page.keyboard.press("Escape");
    await expect(player).toBeHidden();
    await expect(playButton).toBeFocused();
  });
});

test.describe("contact form", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("validates fields and focuses the first error", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send inquiry" }).click();

    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(
      page.getByText("Please enter a valid email address."),
    ).toBeVisible();
    await expect(
      page.getByText(/Please add at least 20 characters/),
    ).toBeVisible();
    await expect(page.getByLabel("Name")).toBeFocused();
  });

  test("shows the honest not-configured state", async ({ page }) => {
    await page.route("**/api/inquiry", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, code: "not_configured" }),
      });
    });

    await page.goto("/contact");
    await fillValidInquiry(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();

    await expect(page.getByText("Nothing was sent.")).toBeVisible();
    await expect(page.getByText(/has not been delivered or stored/)).toBeVisible();
  });

  test("shows success only after the endpoint accepts the inquiry", async ({
    page,
  }) => {
    let requestBody: Record<string, unknown> | null = null;

    await page.route("**/api/inquiry", async (route) => {
      requestBody = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/contact");
    await fillValidInquiry(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();

    await expect(page.getByText("Your inquiry has been sent.")).toBeVisible();
    expect(requestBody).toMatchObject({
      name: "Jordan Example",
      email: "jordan@example.org",
      organization: "Example Clinic",
      topic: "Consultation",
    });
  });

  test("prefills the category from a query string", async ({ page }) => {
    await page.goto("/contact?topic=research");
    await expect(page.getByLabel("Inquiry category")).toHaveValue(
      "Research & resources",
    );
  });
});

async function fillValidInquiry(page: import("@playwright/test").Page) {
  await page.getByLabel("Name").fill("Jordan Example");
  await page.getByLabel("Email").fill("jordan@example.org");
  await page.getByLabel("Organization").fill("Example Clinic");
  await page.getByLabel("Inquiry category").selectOption("Consultation");
  await page
    .getByLabel("Message")
    .fill(
      "I would like to ask about a training session for our clinical and legal team.",
    );
}
