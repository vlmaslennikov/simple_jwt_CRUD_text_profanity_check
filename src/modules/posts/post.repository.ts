import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Types } from 'mongoose';
import { CollectionNameEnum } from 'src/providers/mongodb/enums/collection-name.enum';
import { PostDocument, Post } from './schema/post';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(CollectionNameEnum.POSTS)
    private readonly postModel: Model<PostDocument>,
  ) { }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postModel.create(createPostDto);
  }

  async findById(id: string, userId: string): Promise<Post> {
    return this.postModel.findOne(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      }).lean().exec();
  }

  async findPostsByUserId(userId: string): Promise<Post[]> {
    return this.postModel.find({
      userId: new Types.ObjectId(userId),
    })
      .sort({ createdAt: 1 }).lean().exec();
  }

  async updateById(id: string, userId: string, dto: UpdatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId)
      },
      dto,
      { new: true }
    ).lean().exec();
  }

  async deleteById(id: string, userId: string,): Promise<DeleteResult> {
    return this.postModel.deleteOne({ _id: id, userId: new Types.ObjectId(userId) });
  }
}
