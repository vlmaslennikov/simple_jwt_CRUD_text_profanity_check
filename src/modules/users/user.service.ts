import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.response.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const password: string = await this.hashPassword(createUserDto.password);
    return this.userRepository.create({ ...createUserDto, password });
  }

  async findUserById(id: string): Promise<IUser> {
    return this.userRepository.findOneById(id);
  }

  async findOneByQuery(query: QueryUserDto): Promise<IUser> {
    return this.userRepository.findOneByQuery(query);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }
}
