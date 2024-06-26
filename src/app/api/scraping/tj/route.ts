import { NextRequest, NextResponse } from "next/server";

import getDriver from "../getDriver";
import fetchHtml from "../fetchHtml";
import { parseTjItems } from "../parseItems";

import { TjSongRecord } from "@/app/types/type";

export async function GET(req: NextRequest) {
  const { browser, page } = await getDriver();
  const results: TjSongRecord[] = [];

  const searchText = req.nextUrl.searchParams.get("text") || "ㄱ";
  const size = req.nextUrl.searchParams.get("size") || "100000";

  const url = `https://www.tjmedia.com/tjsong/song_search_list.asp?strType=1&natType=&strText=${encodeURIComponent(
    searchText
  )}&strCond=0&strSize01=${size}`;

  const html = await fetchHtml(page, url);
  const items = parseTjItems(html);

  results.push(...items);

  await browser.close();

  return NextResponse.json({ results: results });
}
