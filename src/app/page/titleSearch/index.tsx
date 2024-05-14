import Header from "@/app/page/titleSearch/header";
import ResultsBox from "@/app/page/titleSearch/results_box";
import { searchKeywordType } from "@/app/recoil/atom/atom";
import { useRecoilState } from "recoil";

export default function TitleSearch() {
  const [searchType, setSearchType] = useRecoilState(searchKeywordType);

  return (
    <div className="form-container title-search-container w-[50%] flex gap-8 flex-col items-center justify-center min-h-[660px] h-full absolute top-0">
      <button
        className={`${
          searchType === "singer" && "hidden"
        } lg:hidden md:hidden border-white border-[1px] border-solid px-[32px] py-[8px] rounded-[20px] text-white`}
        onClick={() => setSearchType("singer")}
      >
        {"가수검색 ->"}
      </button>
      <Header />

      <ResultsBox />
    </div>
  );
}
