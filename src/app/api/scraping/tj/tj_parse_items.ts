import * as cheerio from "cheerio";

export default function parseItems(html: string) {
  const $ = cheerio.load(html);
  const items: any = [];

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
