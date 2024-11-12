import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionNameEnum } from 'src/providers/mongodb/enums/collection-name.enum';
import PostSchema from './schema/post';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: CollectionNameEnum.POSTS,
      schema: PostSchema,
    }]),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository
  ],
})
export class PostModule { }
