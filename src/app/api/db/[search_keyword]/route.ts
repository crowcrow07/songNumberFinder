import { NextResponse } from "next/server";
import { searchDbExecuteQuery } from "../executeQuery";

type Params = {
  search_keyword: string;
};

export async function GET(req: Request, context: { params: Params }) {
  try {
    const searchKeyword = decodeURIComponent(
      context.params.search_keyword
    ).replace(/\s+/g, "");
    const query = `
        SELECT DISTINCT * FROM TJ t
        WHERE REGEXP_REPLACE(title, '\\s+', '') REGEXP REGEXP_REPLACE('${searchKeyword}', '\\s+', '')
        ORDER BY
          CASE
            WHEN title = '${searchKeyword}' THEN 1 
            WHEN title LIKE '${searchKeyword}%' THEN 2 
            WHEN title LIKE '%${searchKeyword}%' THEN 3 
            ELSE 4
          END
          LIMIT 100
      `;

    const results = await searchDbExecuteQuery(query);

    return NextResponse.json({ results: results }, { status: 200 });
  } catch (error) {
    console.error("검색 실패", error);
    return NextResponse.json({ error: "검색 실패" }, { status: 500 });
  }
}
