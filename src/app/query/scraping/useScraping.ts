import { TjSongListParams, getTjSongList } from "@/app/api/scraping/api";
import { useQuery } from "@tanstack/react-query";

export const useTjScrapingQuery = ({ text, size }: TjSongListParams) => {
  return useQuery({
    queryKey: [`tjScrapingQuery${text}${size}`],
    queryFn: () => getTjSongList({ text, size }),
  });
};
