export interface IUser {
  user: any;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  provider: string;
  token?: string;
  last_login?: string;
}
export interface REQUESTUSER {
  id?: string;
  token?: string;
}
export interface TPlaylist {
  name: string;
  genre_id: string;
  tracks?: string[];
  isPublic: boolean;
  likes?: string[];
  owner_id?: string;
}

export interface GENRE {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  type: string;
}

export interface Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  genre_id: string;
  artist: string;
  duration: number;
  nb_tracks: number;
  tracks: string[];
  contributors: string[];
  likes?: string[];
  listened?: string[];
  likeCount?: number;
  listeningCount?: number;
}
export type ResponseData = Record<string, any> | Record<string, any>[];
