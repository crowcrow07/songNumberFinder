import { NextRequest, NextResponse } from "next/server";

import getDriver from "../../getDriver";
import fetchHtml from "../../fetchHtml";
import { parseTjItems } from "../../parseItems";

import { TjSongRecord } from "@/app/types/type";

export async function GET(req: NextRequest) {
  const { browser, page } = await getDriver();
  const results: TjSongRecord[] = [];

  const url = "https://www.tjmedia.com/tjsong/song_monthNew.asp";

  const html = await fetchHtml(page, url);
  const items = parseTjItems(html);

  results.push(...items);

  await browser.close();

  return NextResponse.json({ results: results });
}
