import fs from "node:fs";
import { defineConfig } from "@playwright/test";

const chromeCandidates = [
  process.env.CHROME_EXECUTABLE,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].filter((candidate): candidate is string => Boolean(candidate));

const systemBrowser = chromeCandidates.find((candidate) =>
  fs.existsSync(candidate),
);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: 45_000,
  expect: {
    timeout: 7_500,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    ...(systemBrowser
      ? { launchOptions: { executablePath: systemBrowser } }
      : {}),
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
