"use client";

import { useState } from "react";

import Image from "next/image";
import search from "@/app/assets/images/svg/search.svg";

import { useSongListSearchQuery } from "@/app/query/db/useDb";
import { useSetRecoilState } from "recoil";
import { searchKeywordList, searchKeywordInput } from "@/app/recoil/atom/atom";

export default function SearchBar() {
  const setSearchKeywordList = useSetRecoilState(searchKeywordList);
  const setSearchKeywordInputValue = useSetRecoilState(searchKeywordInput);
  const [searchInputKeyword, setSearchInputKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { data, isFetched }: any = useSongListSearchQuery(searchKeyword);

  if (isFetched) {
    setSearchKeywordList(data);
  }

  const searchInputHandler = (e: any) => {
    setSearchInputKeyword(e.target.value);
  };

  const searchButtonHandler = (e: any) => {
    if (!searchInputKeyword.trim()) {
      alert("검색어를 입력해주세요!");
      setSearchInputKeyword("");
      return;
    }
    setSearchInputKeyword("");
    setSearchKeyword(searchInputKeyword);
    setSearchKeywordInputValue(searchInputKeyword);
  };

  return (
    <div className="bg-white drop-shadow-xl xl:w-[540px] lg:w-[500px] md:w-[460px] sm:w-[420px] w-[320px] h-[96px] rounded-[20px] flex justify-between px-[16px] py-4">
      <input
        className="flex-1 xl:text-[24px] lg:text-[20px] md:text-[16px] sm:text-[12px]"
        type="text"
        placeholder="노래 제목 입력"
        onChange={searchInputHandler}
        value={searchInputKeyword}
      />
      <Image
        onClick={searchButtonHandler}
        className="ml-2 cursor-pointer"
        src={search}
        alt="search"
      />
    </div>
  );
}
