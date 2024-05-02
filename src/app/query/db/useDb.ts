import { postTjSongListDb } from "@/app/api/scraping/api";
import { useMutation } from "@tanstack/react-query";

export const useTjSongDbCreateQuery = () => {
  return useMutation({
    mutationFn: (songs) => postTjSongListDb(songs),
    onSuccess: () => {
      console.log("useTjSongListCreate Success");
    },
  });
};
