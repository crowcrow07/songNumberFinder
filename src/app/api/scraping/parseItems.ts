import * as cheerio from "cheerio";

import { TjSongRecord, KySongRecord } from "@/app/types/type";

export function parseTjItems(html: string) {
  const $ = cheerio.load(html);
  const items: TjSongRecord[] = [];

  $("#BoardType1 > table > tbody > tr").each((index, element) => {
    if (index > 0) {
      const td = $(element).find("td");
      const item = {
        songNumber: $(td[0]).text().trim(),
        title: $(td[1]).text().trim(),
        artist: $(td[2]).text().trim(),
        lyricist: $(td[3]).text().trim(), // 작사
        composer: $(td[4]).text().trim(), // 작곡
      };
      items.push(item);
    }
  });

  return items;
}

export function parseKyItems(html: string) {
  const $ = cheerio.load(html);
  const items: KySongRecord[] = [];

  $("#index_search_frm > div > ul").each((index, element) => {
    if (index > 0) {
      const li = $(element).find("li");
      const item = {
        songNumber: $(li[1]).text().trim(),
        title: $(li[2]).text().trim(),
        artist: $(li[3]).text().trim(),
      };
      items.push(item);
    }
  });

  return items;
}
