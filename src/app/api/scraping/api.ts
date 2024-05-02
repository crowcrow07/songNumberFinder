export type TjSongListParams = {
  text: string;
  size: string;
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
