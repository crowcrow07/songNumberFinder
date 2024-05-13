"use client";

import { useRef, useEffect } from "react";

import ResultCard from "../../../components/result_card";
import { useRecoilValue } from "recoil";
import { searchKeywordInput } from "@/app/recoil/atom/atom";

import { useTitleSongListSearchQuery } from "@/app/query/db/useDb";

import { SearchKeywordType, SearchQuery } from "@/app/types/type";

export default function ResultsBox() {
  const searchKeyword: string = useRecoilValue(searchKeywordInput);

  const { data, isFetched, isLoading }: SearchQuery =
    useTitleSongListSearchQuery(searchKeyword);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [data]);

  const isSearchKeywordInputValue = (value: string) => {
    switch (value) {
      case "":
        return "검색어를 입력해주세요.";
      default:
        return `${searchKeyword} 로 검색된 결과`;
    }
  };

  return (
    <div className={`${Container} h-[50%]`}>
      <div className="text-[16px] font-bold">
        {isSearchKeywordInputValue(searchKeyword)}
      </div>
      <div ref={scrollRef} className="overflow-y-scroll w-full">
        <div className="gap-2 flex flex-col w-full">
          {isLoading && <div className="text-center">로딩중입니다.</div>}
          {isFetched && (!data || data.length === 0) && (
            <div className="text-center">노래가 없습니다.</div>
          )}
          {isFetched &&
            data!.map((keyword: SearchKeywordType) => {
              return <ResultCard key={keyword.id} data={keyword} />;
            })}
        </div>
      </div>
    </div>
  );
}

const Container =
  "pt-[30px] xl:px-[36px] lg:px-[26px] md:px-[16px] sm:px-[6px] px-[6px] drop-shadow-xl flex flex-col items-center rounded-lg xl:w-[520px] lg:w-[480px] md:w-[440px] sm:w-[420px] w-[320px] bg-white pb-[16px]";
