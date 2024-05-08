import { SearchKeywordResult } from "../types/type";

export type TjSongListParams = {
  text: string;
  size: string;
};

export const getTjSongList = async ({ text, size }: TjSongListParams) => {
  try {
    const url = new URL(
      "http://ec2-13-124-90-172.ap-northeast-2.compute.amazonaws.com:3000/api/scraping/tj"
    );
    url.searchParams.append("text", text);
    url.searchParams.append("size", size);
    const response = await fetch(url);
    const songs = await response.json();

    return songs.results;
  } catch (e) {
    console.error("getTjSongList error : ", e);
  }
};

export const getTjNewSongList = async () => {
  try {
    const url =
      "http://ec2-13-124-90-172.ap-northeast-2.compute.amazonaws.com:3000/api/scraping/tj/new-song";
    const response = await fetch(url);
    const newSongs = await response.json();

    return newSongs.results;
  } catch (e) {
    console.error("getTjNewSongList error : ", e);
  }
};

export const getSearchKeywordSongListDb = async (searchKeyword: string) => {
  try {
    const url = `http://ec2-13-124-90-172.ap-northeast-2.compute.amazonaws.com:3000/api/db/${searchKeyword}`;
    const response = await fetch(url);
    const songs: SearchKeywordResult = await response.json();

    return songs.results;
  } catch (error) {}
};

export const postTjSongListDb = async (songs: any) => {
  try {
    const url =
      "http://ec2-13-124-90-172.ap-northeast-2.compute.amazonaws.com:3000/api/db/tj";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songs),
    };
    await fetch(url, options);
  } catch (e) {
    console.error("postTjSongListDb error : ", e);
  }
};
