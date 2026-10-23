import { expect, test, type ConsoleMessage } from "@playwright/test";

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
  { name: "desktop-wide", width: 1440, height: 900 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "mobile-narrow", width: 320, height: 700 },
];

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({ viewport });

    test("routes render without overflow or browser errors", async ({
      page,
    }) => {
      test.setTimeout(90_000);

      for (const route of routes) {
        const browserErrors: string[] = [];
        const handlePageError = (error: Error) => {
          browserErrors.push(error.message);
        };
        const handleConsole = (message: ConsoleMessage) => {
          if (message.type() === "error") browserErrors.push(message.text());
        };

        page.on("pageerror", handlePageError);
        page.on("console", handleConsole);

        const response = await page.goto(route, {
          waitUntil: "domcontentloaded",
        });

        expect(response?.status(), route).toBe(
          route === "/missing" ? 404 : 200,
        );
        await expect(page.locator("h1"), route).toHaveCount(1);
        await page.evaluate(() => document.fonts.ready);

        const metrics = await page.evaluate(() => {
          const root = document.documentElement;
          const viewportWidth = root.clientWidth;
          const offenders = Array.from(
            document.querySelectorAll<HTMLElement>("body *"),
          )
            .filter((element) => {
              const style = getComputedStyle(element);
              if (
                style.display === "none" ||
                style.visibility === "hidden" ||
                style.position === "fixed" ||
                element.closest(".honeypot, .visuallyHidden")
              ) {
                return false;
              }
              const rect = element.getBoundingClientRect();
              return (
                rect.width > 1 &&
                (rect.right > viewportWidth + 2 || rect.left < -2)
              );
            })
            .slice(0, 8)
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                selector: `${element.tagName.toLowerCase()}.${element.className}`,
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              };
            });

          return {
            viewportWidth,
            scrollWidth: root.scrollWidth,
            bodyScrollWidth: document.body.scrollWidth,
            offenders,
          };
        });

        expect(
          metrics.scrollWidth,
          `${route} document overflow at ${viewport.width}px`,
        ).toBeLessThanOrEqual(metrics.viewportWidth + 1);
        expect(
          metrics.bodyScrollWidth,
          `${route} body overflow at ${viewport.width}px`,
        ).toBeLessThanOrEqual(metrics.viewportWidth + 1);
        expect(
          metrics.offenders,
          `${route} elements outside the viewport at ${viewport.width}px`,
        ).toEqual([]);

        if (viewport.width > 1080) {
          await expect(page.locator(".sidebar"), route).toBeVisible();
          await expect(page.locator(".mobileHeader"), route).toBeHidden();
        } else {
          await expect(page.locator(".sidebar"), route).toBeHidden();
          await expect(page.locator(".mobileHeader"), route).toBeVisible();
        }

        page.off("pageerror", handlePageError);
        page.off("console", handleConsole);
        if (route !== "/missing") {
          expect(browserErrors, route).toEqual([]);
        }
      }
    });
  });
}

test("all local images decode", async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const route of routes.filter((route) => route !== "/missing")) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((resolve) => window.setTimeout(resolve, 50));
      }
    });

    await expect
      .poll(
        () =>
          page.evaluate(() =>
            Array.from(document.images)
              .filter((image) => !image.complete || image.naturalWidth === 0)
              .map((image) => image.currentSrc || image.src),
          ),
        { message: route, timeout: 10_000 },
      )
      .toEqual([]);
  }
});
