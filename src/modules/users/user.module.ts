import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from './schema/user.schema';
import { CollectionNameEnum } from 'src/providers/mongodb/enums/collection-name.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: CollectionNameEnum.USERS,
      schema: UserSchema,
    }]),
  ],
  providers: [
    UserService,
    UserRepository
  ],
  exports: [UserService, UserRepository]
})
export class UserModule { }
