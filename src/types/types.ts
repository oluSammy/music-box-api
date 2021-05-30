export interface IUser {
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image: string;
  provider: string;
  _id?: string;
}

export interface SessionUser {
  user: any;
}

export type ResponseData = Record<string, any> | Record<string, any>[];
