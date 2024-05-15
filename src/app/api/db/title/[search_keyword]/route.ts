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
      SELECT t.id, 
             REGEXP_REPLACE(t.title, '[^a-zA-Z0-9가-힣]', '') AS cleaned_title, 
             t.title AS original_title, 
             t.songNumber, 
             t.artist, 
             'TJ' AS source
      FROM TJ t
      UNION ALL
      SELECT k.id, 
             REGEXP_REPLACE(k.title, '[^a-zA-Z0-9가-힣]', '') AS cleaned_title, 
             k.title AS original_title, 
             k.songNumber, 
             k.artist, 
             'KY' AS source
      FROM KY k
  ),
  FilteredResults AS (
      SELECT *,
             CASE
                 WHEN original_title LIKE '%${searchKeyword}%' THEN INSTR(original_title, '${searchKeyword}')
                 ELSE 1000 + INSTR(cleaned_title, REGEXP_REPLACE('${searchKeyword}', '[^a-zA-Z0-9가-힣]', ''))
             END AS ranking
      FROM CleanedTitles
      WHERE INSTR(cleaned_title, REGEXP_REPLACE('${searchKeyword}', '[^a-zA-Z0-9가-힣]', '')) > 0 
         OR original_title LIKE '%${searchKeyword}%'
  ),
  RankedResults AS (
      SELECT *,
             ROW_NUMBER() OVER (PARTITION BY source ORDER BY ranking, id) AS source_rank
      FROM FilteredResults
  ),
  TJResults AS (
      SELECT id, original_title, songNumber, artist, source, source_rank 
      FROM RankedResults
      WHERE source = 'TJ'
  ),
  KYResults AS (
      SELECT id, original_title, songNumber, artist, source, source_rank 
      FROM RankedResults
      WHERE source = 'KY'
  )
  SELECT id, original_title AS title, songNumber, artist, source
  FROM (
      SELECT id, original_title, songNumber, artist, source, source_rank
      FROM TJResults
      UNION ALL
      SELECT id, original_title, songNumber, artist, source, source_rank
      FROM KYResults
  ) AS CombinedResults
  ORDER BY source_rank, source
  LIMIT 100;  
  `;

    const results = await searchDbExecuteQuery(query);

    return NextResponse.json({ results: results }, { status: 200 });
  } catch (error) {
    console.error("검색 실패", error);
    return NextResponse.json({ error: "검색 실패" }, { status: 500 });
  }
}
