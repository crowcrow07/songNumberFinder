import { NextRequest, NextResponse } from "next/server";
import getDriver from "../getDriver";
import fetchHtml from "../fetchHtml";
import { parseKyItems } from "../parseItems";

export async function GET(req: NextRequest) {
  const { browser, page } = await getDriver();
  const results: any = [];

  const searchText = req.nextUrl.searchParams.get("text") || "";

  const url = `https://kysing.kr/karaoke-book/?city=kr&s_cd=2&s_page=1&s_value=${encodeURIComponent(
    searchText
  )}`;

  const html = await fetchHtml(page, url);
  const items = parseKyItems(html);

  results.push(...items);

  await browser.close();

  return NextResponse.json({ results: results });
}
