import { getSearchKeywordSongListDb, postTjSongListDb } from "@/app/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTjSongDbCreateQuery = () => {
  return useMutation({
    mutationFn: (songs) => postTjSongListDb(songs),
    onSuccess: () => {
      console.log("useTjSongListCreate Success");
    },
  });
};

export const useSongListSearchQuery = (searchKeyword: string) => {
  return useQuery({
    queryKey: [`songListSearch${searchKeyword}`],
    queryFn: () => getSearchKeywordSongListDb(searchKeyword),
    enabled: !!searchKeyword,
  });
};
