import { NextResponse } from "next/server";
import { searchDbExecuteQuery } from "../../executeQuery";

type Params = {
  search_keyword: string;
};

export async function GET(req: Request, context: { params: Params }) {
  try {
    const searchKeyword = decodeURIComponent(
      context.params.search_keyword
    ).replace(/\s+/g, "");

    const query = `
    WITH CleanedArtist AS (
      SELECT t.id, REPLACE(t.artist, ' ', '') AS cleaned_artist, t.songNumber, t.title, 'TJ' AS source
      FROM TJ t
      UNION ALL
      SELECT k.id, REPLACE(k.artist, ' ', '') AS cleaned_artist, k.songNumber, k.title, 'KY' AS source
      FROM KY k
  ),
  NumberedResults AS (
      SELECT *,
             ROW_NUMBER() OVER (PARTITION BY source ORDER BY id) AS rownum
      FROM CleanedArtist
      WHERE cleaned_artist LIKE '%${searchKeyword}%'
  )
  SELECT id, title, songNumber, cleaned_artist AS artist, source
  FROM NumberedResults
  ORDER BY rownum, source
  LIMIT 300;
  `;

    const results = await searchDbExecuteQuery(query);

    return NextResponse.json({ results: results }, { status: 200 });
  } catch (error) {
    console.error("검색 실패", error);
    return NextResponse.json({ error: "검색 실패" }, { status: 500 });
  }
}
