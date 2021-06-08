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
  _id: string;
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

export interface IArtist {
  id: number;
  name: string;
  share: string;
  likedBy: string[];
  likedCount: number;
  listeningCount: number;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: string;
}

export type ResponseData = Record<string, any> | Record<string, any>[];
