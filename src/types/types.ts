export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  token?: string;
  last_login?: string;
  provider: string;
}

export interface Token {
  token: string;
  userId: string;
  createdAt: Date;
}

export type ResponseData = Record<string, unknown> | Record<string, unknown>[];
