export interface TjSongRecord {
  songNumber: string;
  title: string;
  artist: string;
  lyricist: string;
  composer: string;
}

export interface TjSongDBType {
  id: string;
  songNumber: string;
  title: string;
  artist: string;
  lyricist: string | null;
  composer: string | null;
}

export interface KySongRecord {
  songNumber: string;
  title: string;
  artist: string;
}

export interface KySongDBType {
  id: string;
  songNumber: string;
  title: string;
  artist: string;
}

export type SearchKeywordType = {
  id: string;
  songNumber: string;
  title: string;
  artist: string;
  source: "KY" | "TJ";
  rn: number;
};

export type SearchKeywordResult = {
  results: SearchKeywordType[] | undefined;
};

export type SearchQuery = {
  data: SearchKeywordType[] | undefined;
  isFetched: boolean;
  isLoading: boolean;
};
