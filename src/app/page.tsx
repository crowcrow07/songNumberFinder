"use client";

import Overlay from "./components/overlay";
import SingerSearch from "./page/singerSearch";
import TitleSearch from "./page/titleSearch";
import { useRecoilValue } from "recoil";
import { searchKeywordType } from "./recoil/atom/atom";

export default function Home() {
  const searchType = useRecoilValue(searchKeywordType);

  return (
    <main
      className={`container ${
        searchType === "singer" && "right-panel-active"
      } w-screen h-screen flex justify-center bg-[#ebebeb] max-screen:overflow-y-scroll relative`}
    >
      <TitleSearch />
      <SingerSearch />
      <Overlay />
    </main>
  );
}

// x 398
