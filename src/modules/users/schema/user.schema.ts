import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CollectionNameEnum } from 'src/providers/mongodb/enums/collection-name.enum';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: CollectionNameEnum.USERS,
})
export class User {
  @Prop({ type: String, required: true, })
  username: string;

  @Prop({
    type: String, unique: true, required: true, index: true,
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
}
export type UserDocument = User & Document;

const UserSchema = SchemaFactory.createForClass(User);

export default UserSchema;
