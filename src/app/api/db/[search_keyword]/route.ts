import { NextResponse } from "next/server";
import { searchDbExecuteQuery } from "../executeQuery";

type Params = {
  search_keyword: string;
};

export async function GET(req: Request, context: { params: Params }) {
  try {
    const searchKeyword = decodeURIComponent(context.params.search_keyword);
    const query = `SELECT * FROM TJ t WHERE REGEXP_REPLACE(title, '\\s+', '') REGEXP REGEXP_REPLACE('${searchKeyword}', '\\s+', '');`;

    const results = await searchDbExecuteQuery(query);

    return NextResponse.json({ results: results }, { status: 200 });
  } catch (error) {
    console.error("검색 실패", error);
    return NextResponse.json({ error: "검색 실패" }, { status: 500 });
  }
}
