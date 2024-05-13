import { SearchKeywordResult } from "../types/type";

export type TjSongListParams = {
  text: string;
  size: string;
};

const getBaseUrl = () => {
  const environment = process.env.NODE_ENV;
  return environment === "development"
    ? "http://localhost:3000"
    : "http://ec2-13-124-90-172.ap-northeast-2.compute.amazonaws.com:3000";
};

export const getTjSongList = async ({ text, size }: TjSongListParams) => {
  try {
    const baseUrl = getBaseUrl();
    const url = new URL(`${baseUrl}/api/scraping/tj`);
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
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/scraping/tj/new-song`;
    const response = await fetch(url);
    const newSongs = await response.json();

    return newSongs.results;
  } catch (e) {
    console.error("getTjNewSongList error : ", e);
  }
};

export const getKySongList = async ({
  text,
  page,
}: {
  text: string;
  page: string;
}) => {
  try {
    const baseUrl = getBaseUrl();
    const url = new URL(`${baseUrl}/api/scraping/ky`);
    url.searchParams.append("text", text);
    url.searchParams.append("page", page);
    const response = await fetch(url);
    const songs = await response.json();

    return songs.results;
  } catch (e) {
    console.error("getKySongList error : ", e);
  }
};

export const getTitleSearchKeywordSongListDb = async (
  searchKeyword: string
) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/db/title/${searchKeyword}`;
    const response = await fetch(url);
    const songs: SearchKeywordResult = await response.json();

    return songs.results;
  } catch (error) {}
};

export const getSingerSearchKeywordSongListDb = async (
  searchKeyword: string
) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/db/singer/${searchKeyword}`;
    const response = await fetch(url);
    const songs: SearchKeywordResult = await response.json();

    return songs.results;
  } catch (error) {}
};

export const postTjSongListDb = async (songs: any) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/db/tj`;
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

export const postKySongListDb = async (songs: any) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/db/ky`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songs),
    };
    await fetch(url, options);
  } catch (e) {
    console.error("postKySongListDb error : ", e);
  }
};
