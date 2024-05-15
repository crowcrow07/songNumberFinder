import { NextRequest, NextResponse } from "next/server";
import getDriver from "../../getDriver";
import fetchHtml from "../../fetchHtml";
import { parseKyNewItems } from "../../parseItems";

export async function GET(req: NextRequest) {
  const { browser, page } = await getDriver();
  const results: any = [];

  const currentPage = req.nextUrl.searchParams.get("page") || "1";

  const url = `https://kysing.kr/latest/?s_page=${currentPage}`;

  const html = await fetchHtml(page, url);
  const items = parseKyNewItems(html);

  results.push(...items);

  await browser.close();

  return NextResponse.json({ results: results });
}
