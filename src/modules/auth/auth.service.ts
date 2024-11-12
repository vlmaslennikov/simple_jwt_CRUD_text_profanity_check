import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateTokensDto } from './dto/create-tokens.dto';
import { JwtConfigTypes } from 'src/shared/config/jwt.config';
import { UserDataDto } from './dto/user-data.dto';
import { ITokens } from './interfaces/token.interfaces';
import { IUser } from '../users/interfaces/user.response.interface';

@Injectable()
export class AuthService {
  jwtConstant: JwtConfigTypes
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConstant = this.configService.get<JwtConfigTypes>('jwt')
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return {
      user: _.omit(user, 'password'),
    };
  }

  async login(email: string) {
    const user: IUser = await this.usersService.findOneByQuery({ email });
    const payload: UserDataDto = { id: user._id.toString(), email: user.email };
    const { accessToken, refreshToken } = await this.createTokens({
      payload,
      createAccess: true,
      createRefresh: true,
    });

    return {
      id: user._id,
      accessToken,
      refreshToken,
    };
  }

  async createTokens({
    payload,
    createAccess,
    createRefresh,
  }: CreateTokensDto): Promise<ITokens> {
    const tokens: ITokens = {};

    if (createAccess) {
      tokens.accessToken = this.jwtService.sign(payload, {
        expiresIn: this.jwtConstant.jwtExpAccessToken,
        secret: this.jwtConstant.secret
      });
    }
    if (createRefresh) {
      tokens.refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.jwtConstant.jwtExpRefreshToken,
        secret: this.jwtConstant.secret
      });
    }
    return tokens;
  }

  async validateUser(email: string, password: string): Promise<UserDataDto> {
    const user = await this.usersService.findOneByQuery({ email });

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }
    const passwordCompared: boolean = await bcrypt.compare(password, user.password);

    if (!passwordCompared) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    return {
      id: user._id.toString(),
      email: user.email
    };
  }
}
