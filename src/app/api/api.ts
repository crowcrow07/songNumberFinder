export type TjSongListParams = {
  text: string;
  size: string;
};

export type TjSongType = {
  id: string;
  songNumber: string;
  title: string;
  artist: string;
  lyricist: string | null;
  composer: string | null;
};

export type SearchKeywordResult = {
  results: TjSongType[] | undefined;
};

export const getTjSongList = async ({ text, size }: TjSongListParams) => {
  try {
    const url = new URL("http://localhost:3000/api/scraping/tj");
    url.searchParams.append("text", text);
    url.searchParams.append("size", size);
    const response = await fetch(url);
    const songs = await response.json();

    return songs.results;
  } catch (e) {
    console.error("getTjSongList error : ", e);
  }
};

export const postTjSongListDb = async (songs: any) => {
  try {
    const url = "http://localhost:3000/api/db/tj";
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

export const getSearchKeywordSongListDb = async (searchKeyword: string) => {
  try {
    const url = `http://localhost:3000/api/db/${searchKeyword}`;
    const response = await fetch(url);
    const songs: SearchKeywordResult = await response.json();

    return songs.results;
  } catch (error) {}
};