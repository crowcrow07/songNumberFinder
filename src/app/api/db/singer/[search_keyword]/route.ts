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
  ExactMatches AS (
      SELECT ca.id, ca.cleaned_artist, ca.songNumber, ca.title, ca.source,
             ROW_NUMBER() OVER (PARTITION BY ca.source ORDER BY ca.id) AS rownum
      FROM CleanedArtist ca
      WHERE ca.cleaned_artist = '${searchKeyword}'
  ),
  PartialMatches AS (
      SELECT ca.id, ca.cleaned_artist, ca.songNumber, ca.title, ca.source,
             ROW_NUMBER() OVER (PARTITION BY ca.source ORDER BY ca.id) AS rownum
      FROM CleanedArtist ca
      WHERE ca.cleaned_artist LIKE '%${searchKeyword}%' AND ca.cleaned_artist != '${searchKeyword}'
  ),
  CombinedResults AS (
      SELECT * FROM ExactMatches
      UNION ALL
      SELECT * FROM PartialMatches
  )
  SELECT id, title, songNumber, cleaned_artist AS artist, source
  FROM CombinedResults
  ORDER BY (CASE WHEN cleaned_artist = '${searchKeyword}' THEN 0 ELSE 1 END), rownum, source
  LIMIT 500;  
  `;

    const results = await searchDbExecuteQuery(query);

    return NextResponse.json({ results: results }, { status: 200 });
  } catch (error) {
    console.error("검색 실패", error);
    return NextResponse.json({ error: "검색 실패" }, { status: 500 });
  }
}
