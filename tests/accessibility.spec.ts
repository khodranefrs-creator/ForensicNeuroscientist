import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/education",
  "/explore",
  "/videos",
  "/resources",
  "/consultation",
  "/contact",
  "/privacy",
  "/missing",
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({ viewport });

    test("pages have no automatically detectable accessibility violations", async ({
      page,
    }) => {
      test.setTimeout(120_000);

      for (const route of routes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);

        const results = await new AxeBuilder({ page }).exclude("iframe").analyze();

        expect(
          results.violations.map((violation) => ({
            id: violation.id,
            impact: violation.impact,
            nodes: violation.nodes.map((node) => node.target),
          })),
          route,
        ).toEqual([]);
      }
    });
  });
}

test("interactive overlays and form states are accessible", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  let results = await new AxeBuilder({ page }).exclude("iframe").analyze();
  expect(
    results.violations.map((violation) => violation.id),
    "open mobile navigation",
  ).toEqual([]);
  await page.keyboard.press("Escape");

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/videos");
  await page.locator(".videoThumb").first().click();
  results = await new AxeBuilder({ page }).exclude("iframe").analyze();
  expect(
    results.violations.map((violation) => violation.id),
    "open video player",
  ).toEqual([]);
  await page.keyboard.press("Escape");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  results = await new AxeBuilder({ page }).exclude("iframe").analyze();
  expect(
    results.violations.map((violation) => violation.id),
    "contact validation errors",
  ).toEqual([]);
});

