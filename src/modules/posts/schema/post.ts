import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { CollectionNameEnum } from 'src/providers/mongodb/enums/collection-name.enum';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: CollectionNameEnum.POSTS,
})
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({
    type: String, required: true, index: true,
  })
  content: string;

  @Prop({ type: SchemaTypes.ObjectId, index: true, required: true, ref: 'users' })
  userId: Types.ObjectId;;
}

export type PostDocument = Post & Document;

const PostSchema = SchemaFactory.createForClass(Post);

export default PostSchema;
