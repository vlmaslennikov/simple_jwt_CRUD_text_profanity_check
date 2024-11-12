import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { DeleteResult } from 'mongoose';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { IPosts } from './interfaces/post.response.interface';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) { }
  async createPost(createPostDto: CreatePostDto): Promise<IPosts> {
    return this.postRepository.create(createPostDto);
  }

  async findById(id: string, userId: string): Promise<IPosts> {
    return this.postRepository.findById(id, userId);
  }

  async findPostsByUserId(userId: string): Promise<IPosts[]> {
    return this.postRepository.findPostsByUserId(userId);
  }

  async updateById(id: string, userId: string, updatePostDto: UpdatePostDto): Promise<IPosts> {
    return this.postRepository.updateById(id, userId, updatePostDto);
  }

  async deleteById(id: string, userId: string): Promise<DeleteResult> {
    return this.postRepository.deleteById(id, userId);
  }
}
