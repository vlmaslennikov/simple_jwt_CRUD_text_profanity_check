import {
  BadRequestException,
  Body, Controller, Delete, Get, HttpCode, Param, Patch, Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import UserData from 'src/shared/decorators/user.decorator';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeleteResult } from 'mongoose';
import { IPosts } from './interfaces/post.response.interface';
import { UserDataDto } from '../auth/dto/user-data.dto';

@ApiTags('Post')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @ApiOkResponse({
    description: 'Create post and return post object',
  })
  @ApiBody({ type: CreatePostDto })
  @Post('/')
  createPost(
    @Body() body: CreatePostDto,
    @UserData() { id: userId }: UserDataDto
  ): Promise<IPosts> {
    if (body.userId != userId) {
      throw new BadRequestException('User can create posts only with himself "userId"')
    }
    return this.postService.createPost(body)
  }

  @ApiOkResponse({
    description: 'Returns all users posts',
  })
  @Get('/owner-posts/all')
  async getAllUserPosts(
    @UserData() { id: userId }: UserDataDto
  ): Promise<IPosts[]> {
    return this.postService.findPostsByUserId(userId)
  }

  @ApiOkResponse({
    description: 'Returns post by id',
  })
  @Get('/:postId')
  getPostById(
    @Param('postId') postId: string,
    @UserData() { id: userId }: UserDataDto
  ): Promise<IPosts> {
    return this.postService.findById(postId, userId)
  }

  @ApiOkResponse({
    description: 'Update post by id',
  })
  @Patch('/:postId')
  @HttpCode(200)
  updatePostById(
    @Param('postId') postId: string,
    @Body() body: UpdatePostDto,
    @UserData() { id: userId }: UserDataDto
  ): Promise<IPosts> {
    return this.postService.updateById(postId, userId, body)
  }

  @ApiOkResponse({
    description: 'Delete post by id',
  })
  @Delete('/:postId')
  @HttpCode(204)
  deletePostById(
    @Param('postId') postId: string,
    @UserData() { id: userId }: UserDataDto
  ): Promise<DeleteResult> {
    return this.postService.deleteById(postId, userId)
  }

}
