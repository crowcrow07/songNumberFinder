import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { createPool } from "mysql2/promise";
import "dotenv/config";

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
});

async function getDriver() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.setViewport({ width: 1280, height: 720 });
  return { browser, page };
}

async function fetchHtml(page, url) {
  await page.goto(url);
  await page.reload();
  await page.evaluate(async () => {
    await new Promise((resolve) => {
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

function parseKyNewItems(html) {
  const $ = cheerio.load(html);
  const items = [];

  $("#search_chart_frm > div > ul").each((index, element) => {
    if (index > 0) {
      const li = $(element).find("li");
      const item = {
        songNumber: $(li[1]).text().trim(),
        title: $(li[2]).find("span").eq(0).text().trim(),
        artist: $(li[2]).find("span").eq(1).text().trim(),
      };
      items.push(item);
    }
  });

  return items;
}

function parseTjNewItems(html) {
  const $ = cheerio.load(html);
  const items = [];

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

async function kyScraping(currentPage = 1) {
  const { browser, page } = await getDriver();
  const results = [];

  const url = `https://kysing.kr/latest/?s_page=${currentPage}`;

  const html = await fetchHtml(page, url);
  const items = parseKyNewItems(html);

  results.push(...items);

  await browser.close();

  return results;
}

async function tjScraping() {
  const { browser, page } = await getDriver();
  const results = [];

  const url = "https://www.tjmedia.com/tjsong/song_monthNew.asp";

  const html = await fetchHtml(page, url);
  const items = parseTjNewItems(html);

  results.push(...items);

  await browser.close();

  return results;
}

async function insertDbExecuteQuery(query, arrParams) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(query, arrParams);
    return rows;
  } catch (err) {
    console.error("Error insertDbExecuteQuery", err);
    throw err;
  } finally {
    conn.release();
  }
}

async function postKyDb() {
  try {
    const queryCheck = "SELECT * FROM KY WHERE songNumber = ?";
    const queryInsert =
      "INSERT INTO KY (songNumber, title, artist) VALUES (?, ?, ?)";

    for (let currentPage = 1; currentPage <= 29; currentPage++) {
      const songs = await kyScraping(currentPage);
      let insertions = [];

      for (let song of songs) {
        const existingSong = await insertDbExecuteQuery(queryCheck, [
          song.songNumber,
        ]);
        if (existingSong.length === 0) {
          const values = [song.songNumber, song.title, song.artist];
          const insertion = insertDbExecuteQuery(queryInsert, values)
            .then(() => ({ success: true, title: song.title }))
            .catch((err) => {
              console.error(`Insertion failed for ${song.title}:`, err);
              return { success: false, title: song.title };
            });
          insertions.push(insertion);
        } else {
          console.log(`Duplicate found, skipping: ${song.title}`);
          insertions.push(
            Promise.resolve({
              success: false,
              title: song.title,
              reason: "Duplicate",
            })
          );
        }
      }

      const results = await Promise.all(insertions);
      console.log(`Page ${currentPage} processed successfully:`, results);
    }
  } catch (e) {
    console.error("Error during data processing:", e);
  }
}

async function postTjDb() {
  try {
    const songs = await tjScraping();
    const queryCheck = "SELECT * FROM TJ WHERE songNumber = ?";
    const queryInsert =
      "INSERT INTO TJ (songNumber, title, artist, lyricist, composer) VALUES (?, ?, ?, ?, ?)";

    let insertions = [];

    for (let song of songs) {
      const existingSong = await insertDbExecuteQuery(queryCheck, [
        song.songNumber,
      ]);
      if (existingSong.length === 0) {
        const values = [
          song.songNumber,
          song.title,
          song.artist,
          song.lyricist,
          song.composer,
        ];
        const insertion = insertDbExecuteQuery(queryInsert, values)
          .then(() => ({ success: true, title: song.title }))
          .catch((err) => {
            console.error(`Insertion failed for ${song.title}:`, err);
            return { success: false, title: song.title };
          });
        insertions.push(insertion);
      } else {
        console.log(`Duplicate found, skipping: ${song.title}`);
        insertions.push(
          Promise.resolve({
            success: false,
            title: song.title,
            reason: "Duplicate",
          })
        );
      }
    }

    const results = await Promise.all(insertions);
    console.log("TJ Data processed successfully:", results);
  } catch (e) {
    console.error("Error during TJ data processing:", e);
  }
}

// 실행할 작업들
async function main() {
  await postKyDb();
  await postTjDb();
}

main().catch((e) => console.error("Error in main function:", e));
