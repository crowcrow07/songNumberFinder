import Header from "@/app/page/singerSearch/header";
import ResultsBox from "@/app/page/singerSearch/results_box";

import { useRecoilState } from "recoil";
import { searchKeywordType } from "@/app/recoil/atom/atom";

export default function SingerSearch() {
  const [searchType, setSearchType] = useRecoilState(searchKeywordType);
  return (
    <div className="form-container singer-search-container w-[50%] flex gap-8 flex-col items-center justify-center min-h-[660px] h-full absolute top-0">
      <button
        className={`${
          searchType === "title" && "hidden"
        } lg:hidden md:hidden border-white border-[1px] border-solid px-[32px] py-[8px] rounded-[20px] text-white`}
        onClick={() => setSearchType("title")}
      >
        {"제목검색 ->"}
      </button>
      <Header />

      <ResultsBox />
    </div>
  );
}
