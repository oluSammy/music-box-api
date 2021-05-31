export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  token?: string;
  provider: string;
  last_login?: string;
}

export interface REQUESTUSER {
  id?: string;
  token?: string;
}

export type ResponseData = Record<string, any> | Record<string, any>[];

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
