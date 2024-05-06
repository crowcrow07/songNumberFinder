import { Page } from "puppeteer";

export default async function fetchHtml(
  page: Page,
  url: string
): Promise<string> {
  await page.goto(url);
  await page.reload();
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100000;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  return await page.content();
}
