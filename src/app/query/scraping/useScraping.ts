import {
  TjSongListParams,
  getTjNewSongList,
  getTjSongList,
} from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";

export const useTjScrapingQuery = ({ text, size }: TjSongListParams) => {
  return useQuery({
    queryKey: [`tjScrapingQuery${text}${size}`],
    queryFn: () => getTjSongList({ text, size }),
  });
};

export const useTjNewSongScrapingQuery = () => {
  return useQuery({
    queryKey: ["tjNewSongScrapingQuery"],
    queryFn: () => getTjNewSongList(),
  });
};
