export interface SongRecord {
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

export type SearchKeywordResult = {
  results: TjSongDBType[] | undefined;
};
