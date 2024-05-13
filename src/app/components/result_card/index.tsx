import Image from "next/image";
import tj from "@/app/assets/images/png/tj_logo.png";
import ky from "@/app/assets/images/png/kj_logo.png";

import { SearchKeywordType } from "@/app/types/type";

type ResultCardProps = {
  data: SearchKeywordType;
};

export default function ResultCard({ data }: ResultCardProps) {
  const { songNumber, title, artist, source } = data;
  return (
    <div className="flex w-full h-[120px] p-[12px] border-b-2">
      <div className="flex justify-center items-center mr-[16px] min-w-[42px]">
        {source === "TJ" && (
          <Image src={tj} alt="logo" width={42} height={42} />
        )}
        {source === "KY" && (
          <Image src={ky} alt="logo" width={42} height={42} />
        )}
      </div>
      <div className="flex flex-col justify-between">
        <div className="xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px]">
          {songNumber}
        </div>
        <div className="xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] text-nowrap text-ellipsis overflow-hidden xl:max-w-[280px] lg:max-w-[260px] md:max-w-[240px] sm:max-w-[220px] max-w-[180px]">
          {title}
        </div>
        <div className="xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px]">
          {artist}
        </div>
      </div>
    </div>
  );
}
