import { NextRequest, NextResponse } from "next/server";
import getDriver from "../getDriver";
import fetchHtml from "../fetchHtml";
import { parseKyItems } from "../parseItems";

export async function GET(req: NextRequest) {
  const { browser, page } = await getDriver();
  const results: any = [];

  const currentPage = req.nextUrl.searchParams.get("page") || "1";
  const searchText = req.nextUrl.searchParams.get("text") || "";

  const url = `https://kysing.kr/search/?category=2&keyword=${encodeURIComponent(
    searchText
  )}&s_page=${currentPage}`;

  const html = await fetchHtml(page, url);
  const items = parseKyItems(html);

  results.push(...items);

  await browser.close();

  return NextResponse.json({ results: results });
}
