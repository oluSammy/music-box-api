export type ResponseData = Record<string, any> | Record<string, any>[];

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
