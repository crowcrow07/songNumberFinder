import Image from "next/image";
import search from "@/app/assets/images/svg/search.svg";

export default function SearchBar() {
  return (
    <div className="bg-white drop-shadow-xl xl:w-[540px] lg:w-[500px] md:w-[460px] sm:w-[420px] w-[320px] h-[96px] rounded-[20px] flex justify-between px-[16px] py-4">
      <input
        className="flex-1 xl:text-[24px] lg:text-[20px] md:text-[16px] sm:text-[12px]"
        type="text"
        placeholder="노래 제목 입력"
      />
      <Image className="ml-2 cursor-pointer" src={search} alt="search" />
    </div>
  );
}
