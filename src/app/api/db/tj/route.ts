import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../config";
import { NextResponse } from "next/server";

interface SongRecord {
  songNumber: string;
  title: string;
  artist: string;
  lyricist: string;
  composer: string;
}

pool.getConnection((err, conn) => {
  if (err) console.log("Error connecting to db...");
  else console.log("Connected to db...!");
  conn.release();
});

const executeQuery = (query: string, arrParams: any) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrParams, (err, data) => {
        if (err) {
          console.log("Error in executing the query");
          reject(err);
        }
        console.log("------db.jsx------");
        //console.log(data)
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export function GET() {}

export async function POST(req: Request, res: NextApiResponse) {
  const session = await req.json();
  try {
    if (!Array.isArray(session)) {
      console.log("데이터가 배열이 아닙니다:", session);
      return res.status(400).json({ error: "Invalid data format" });
    }
    const songs: SongRecord[] = session;
    const queryCheck = "SELECT * FROM TJ WHERE songNumber = ?";
    const queryInsert =
      "INSERT INTO TJ (songNumber, title, artist, lyricist, composer) VALUES (?, ?, ?, ?, ?)";

    let insertions = [];

    for (let song of songs) {
      const existingSong: any = await executeQuery(queryCheck, [
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
        const insertion = executeQuery(queryInsert, values)
          .then(() => {
            return { success: true, title: song.title };
          })
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
    return NextResponse.json({ message: "Data processed successfully" });
  } catch (e) {
    console.error("Error during data processing:", e);
    return NextResponse.json(
      { error: "Error processing data" },
      { status: 500 }
    );
  }
}
