import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CollectionNameEnum } from 'src/providers/mongodb/enums/collection-name.enum';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(CollectionNameEnum.USERS)
    private readonly userModel: Model<UserDocument>,
  ) { }

  async create(shortLinkData: CreateUserDto): Promise<User> {
    return this.userModel.create(shortLinkData);
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: new Types.ObjectId(id) }).lean();
  }

  async findOneByQuery(query: QueryUserDto): Promise<User> {
    return this.userModel.findOne(query).lean();
  }
}
