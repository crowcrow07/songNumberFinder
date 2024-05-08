"use client";

import { useRef, useEffect } from "react";

import ResultCard from "../result_card";
import { useRecoilValue } from "recoil";
import { searchKeywordInput } from "@/app/recoil/atom/atom";

import { useSongListSearchQuery } from "@/app/query/db/useDb";

import { TjSongDBType, SearchQuery } from "@/app/types/type";

export default function ResultsBox() {
  const searchKeyword: string = useRecoilValue(searchKeywordInput);

  const { data, isFetched, isLoading }: SearchQuery =
    useSongListSearchQuery(searchKeyword);

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
      <div className="text-[24px]">
        {isSearchKeywordInputValue(searchKeyword)}
      </div>
      <div ref={scrollRef} className="overflow-y-scroll w-full p-2">
        <div className="gap-4 flex flex-col w-full">
          {isLoading && <div className="text-center">로딩중입니다.</div>}
          {isFetched && (!data || data.length === 0) && (
            <div className="text-center">노래가 없습니다.</div>
          )}
          {isFetched &&
            data!.map((keyword: TjSongDBType) => {
              return <ResultCard key={keyword.id} data={keyword} />;
            })}
        </div>
      </div>
    </div>
  );
}

const Container =
  "pt-[36px] xl:px-[56px] lg:px-[40px] md:px-[28px] sm:px-[24px] px-[16px] drop-shadow-xl flex flex-col items-center  rounded-[20px] xl:w-[540px] lg:w-[500px] md:w-[460px] sm:w-[420px] w-[320px] bg-white pb-4";
