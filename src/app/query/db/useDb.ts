import {
  getTitleSearchKeywordSongListDb,
  postTjSongListDb,
  postKySongListDb,
  getSingerSearchKeywordSongListDb,
} from "@/app/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTjSongDbCreateQuery = () => {
  return useMutation({
    mutationFn: (songs) => postTjSongListDb(songs),
    onSuccess: () => {
      console.log("useTjSongListCreate Success");
    },
  });
};

export const useKySongDbCreateQuery = () => {
  return useMutation({
    mutationFn: (songs) => postKySongListDb(songs),
    onSuccess: () => {
      console.log("useKySongListCreate Success");
    },
  });
};

export const useTitleSongListSearchQuery = (searchKeyword: string) => {
  return useQuery({
    queryKey: [`songTitleListSearch${searchKeyword}`],
    queryFn: () => getTitleSearchKeywordSongListDb(searchKeyword),
    enabled: !!searchKeyword,
  });
};

export const useSingerSongListSearchQuery = (searchKeyword: string) => {
  return useQuery({
    queryKey: [`songSingerListSearch${searchKeyword}`],
    queryFn: () => getSingerSearchKeywordSongListDb(searchKeyword),
    enabled: !!searchKeyword,
  });
};
