import puppeteer, { Browser, Page } from "puppeteer";

export default async function getDriver(): Promise<{
  browser: Browser;
  page: Page;
}> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.setViewport({ width: 1280, height: 720 });
  return { browser, page };
}
