export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  provider: string;
  token?: string;
  last_login?: string;
  _id?: string;
}
export interface REQUESTUSER {
  id?: string;
  token?: string;
}
export interface TPlaylist {
  name: string;
  genre_id: string;
  tracks: string[];
  isPublic: boolean;
  likes?: string[];
  owner_id: string;
}

export type ResponseData = Record<string, any> | Record<string, any>[];
