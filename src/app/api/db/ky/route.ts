import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { insertDbExecuteQuery } from "../executeQuery";

import { KySongRecord } from "@/app/types/type";

export async function POST(req: Request, res: NextApiResponse) {
  const session = await req.json();
  try {
    if (!Array.isArray(session)) {
      console.log("데이터가 배열이 아닙니다:", session);
      return res.status(400).json({ error: "Invalid data format" });
    }
    const songs: KySongRecord[] = session;
    const queryCheck = "SELECT * FROM KY WHERE songNumber = ?";
    const queryInsert =
      "INSERT INTO KY (songNumber, title, artist) VALUES (?, ?, ?)";

    let insertions = [];

    for (let song of songs) {
      const existingSong: any = await insertDbExecuteQuery(queryCheck, [
        song.songNumber,
      ]);
      if (existingSong.length === 0) {
        const values = [song.songNumber, song.title, song.artist];
        const insertion = insertDbExecuteQuery(queryInsert, values)
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
