"use client";

import ResultCard from "../result_card";
import { useRecoilValue } from "recoil";
import { searchKeywordList, searchKeywordInput } from "@/app/recoil/atom/atom";

import { TjSongDBType } from "@/app/types/type";

export default function ResultsBox() {
  const searchKeywordArray: TjSongDBType[] | [] =
    useRecoilValue(searchKeywordList);
  const searchKeywordInputValue: string = useRecoilValue(searchKeywordInput);

  const isSearchKeywordInputValue = (value: string) => {
    switch (value) {
      case "":
        return "검색어를 입력해주세요.";
      default:
        return `${searchKeywordInputValue} 로 검색된 결과`;
    }
  };

  const isSearchKeywordArray = (array: TjSongDBType[] | []) => {
    switch (array) {
      case []:
        return <div className="text-center">검색된 결과가 없습니다.</div>;
      default:
        return searchKeywordArray.map((keyword) => {
          return <ResultCard key={keyword.id} data={keyword} />;
        });
    }
  };

  return (
    <div className="pt-[36px] xl:px-[56px] lg:px-[40px] md:px-[28px] sm:px-[24px] px-[16px] drop-shadow-xl flex flex-col items-center  rounded-[20px] h-[500px] xl:w-[500px] lg:w-[460px] md:w-[420px] sm:w-[400px] w-[320px] bg-white pb-4">
      <div className="text-[24px]">
        {isSearchKeywordInputValue(searchKeywordInputValue)}
      </div>
      <div className="overflow-y-scroll w-full p-2">
        <div className="gap-4 flex flex-col w-full">
          {isSearchKeywordArray(searchKeywordArray)}
        </div>
      </div>
    </div>
  );
}
