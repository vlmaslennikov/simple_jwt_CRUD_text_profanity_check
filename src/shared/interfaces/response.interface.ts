import { Types } from 'mongoose';

export interface IResponse {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}