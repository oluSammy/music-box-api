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

export interface Playlist {
  name: string;
  genre_id: string;
  tracks: string[];
  isPublic: boolean;
  likes: string[];
  owner_id: string;
}

export type ResponseData = Record<string, any> | Record<string, any>[];
