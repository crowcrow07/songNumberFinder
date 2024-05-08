"use client";

import { useState } from "react";

import { useSetRecoilState } from "recoil";
import { searchKeywordInput } from "@/app/recoil/atom/atom";

import Image from "next/image";
import search from "@/app/assets/images/svg/search.svg";

export default function SearchBar() {
  const [timer, setTimer] = useState(null);
  const [searchInputKeyword, setSearchInputKeyword] = useState("");

  const setSearchKeywordInputValue = useSetRecoilState(searchKeywordInput);

  const searchInputHandler = (e: any) => {
    const value = e.target.value;
    setSearchInputKeyword(value);

    if (timer) {
      clearTimeout(timer);
    }

    if (!value.trim()) return;

    const newTimer: any = setTimeout(() => {
      setSearchKeywordInputValue(value);
    }, 500);
    setTimer(newTimer);
  };

  return (
    <div className={`${Container}`}>
      <input
        className="flex-1 xl:text-[24px] lg:text-[20px] md:text-[16px] sm:text-[12px] bg-white text-black"
        type="text"
        placeholder="노래 제목 입력"
        onChange={searchInputHandler}
        value={searchInputKeyword}
      />
      <Image className="ml-2 cursor-pointer" src={search} alt="search" />
    </div>
  );
}

const Container =
  "bg-white drop-shadow-xl xl:w-[540px] lg:w-[500px] md:w-[460px] sm:w-[420px] w-[320px] h-[96px] rounded-[20px] flex justify-between px-[16px] py-4";
