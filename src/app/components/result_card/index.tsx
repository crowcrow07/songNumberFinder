import Image from "next/image";
import tj from "@/app/assets/images/png/tj_logo.png";

import { TjSongDBType } from "@/app/types/type";

type ResultCardProps = {
  data: TjSongDBType;
};

export default function ResultCard({ data }: ResultCardProps) {
  const { songNumber, title, artist } = data;
  return (
    <div className="flex border-[1px]  drop-shadow-md w-full h-[120px] p-[13px] rounded-[20px]">
      <div className="flex justify-center items-center mr-[12px] min-w-[42px]">
        <Image src={tj} alt="logo" width={42} height={42} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]">
          {songNumber}
        </div>
        <div className="xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] text-nowrap text-ellipsis overflow-hidden xl:max-w-[280px] lg:max-w-[260px] md:max-w-[240px] sm:max-w-[220px] max-w-[180px]">
          {title}
        </div>
        <div className="xl:text-[14px] lg:text-[12px] text-[8px]">{artist}</div>
      </div>
    </div>
  );
}
