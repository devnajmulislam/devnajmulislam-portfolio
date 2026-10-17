import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const viewport = { width: 1440, height: 900 };

const targets = [
  {
    url: "https://bazar-dor-rho-two.vercel.app/",
    out: "public/images/projects/bazardor.png",
  },
  {
    url: "https://devnajmulislam-fit-log.vercel.app/",
    out: "public/images/projects/fitlog.png",
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });

for (const target of targets) {
  await mkdir(dirname(target.out), { recursive: true });
  await page.goto(target.url, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: target.out });
  console.log(`Saved ${target.out}`);
}

await browser.close();
