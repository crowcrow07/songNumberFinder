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

export type SearchKeywordResult = {
  results: TjSongDBType[] | undefined;
};

export type SearchQuery = {
  data: TjSongDBType[] | undefined;
  isFetched: boolean;
  isLoading: boolean;
};
