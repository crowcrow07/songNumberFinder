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
    WITH CleanedTitles AS (
      SELECT t.id, REPLACE(t.title, ' ', '') AS cleaned_title, t.songNumber, t.artist, 'TJ' AS source
      FROM TJ t
      UNION ALL
      SELECT k.id, REPLACE(k.title, ' ', '') AS cleaned_title, k.songNumber, k.artist, 'KY' AS source
      FROM KY k
  ),
  NumberedResults AS (
      SELECT *,
             ROW_NUMBER() OVER (PARTITION BY source ORDER BY id) AS rownum
      FROM CleanedTitles
      WHERE cleaned_title LIKE '%${searchKeyword}%'
  )
  SELECT id, cleaned_title AS title, songNumber, artist, source
  FROM NumberedResults
  ORDER BY rownum, source
  LIMIT 50;
  `;

    const results = await searchDbExecuteQuery(query);

    return NextResponse.json({ results: results }, { status: 200 });
  } catch (error) {
    console.error("검색 실패", error);
    return NextResponse.json({ error: "검색 실패" }, { status: 500 });
  }
}
