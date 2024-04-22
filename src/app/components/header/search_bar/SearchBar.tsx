import Image from "next/image";
import search from "@/app/assets/images/svg/search.svg";

export default function SearchBar() {
  return (
    <div className="bg-white w-[540px] h-[96px] rounded-[20px] flex justify-between px-[16px] py-4">
      <input
        className="flex-1 text-[24px]"
        type="text"
        placeholder="노래 제목 입력"
      />
      <Image className="ml-2 cursor-pointer" src={search} alt="search" />
    </div>
  );
}
