import { Types } from 'mongoose';
import { IResponse } from 'src/shared/interfaces/response.interface';

export interface IPosts extends IResponse {
  title: string;
  content: string;
  userId: Types.ObjectId;
}