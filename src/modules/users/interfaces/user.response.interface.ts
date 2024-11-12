import { IResponse } from 'src/shared/interfaces/response.interface';

export interface IUser extends IResponse {
  username: string;
  email: string;
  password?: string;
}