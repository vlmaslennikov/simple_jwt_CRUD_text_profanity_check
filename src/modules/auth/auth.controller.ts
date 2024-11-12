import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { JwtConfigTypes } from 'src/shared/config/jwt.config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  jwtConstant: JwtConfigTypes

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConstant = this.configService.get<JwtConfigTypes>('jwt')
  }

  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: 'Create user and return user object',
  })
  @Post('/sign-up')
  @HttpCode(201)
  async signUp(
    @Body() userData: CreateUserDto,
  ) {
    return this.authService.register(userData,);
  }

  @ApiOkResponse({
    description: 'Returns accessTokens, refreshToken and user id',
  })
  @ApiBody({ type: SignInDto })
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  @HttpCode(201)
  async signIn(@Body() signIn: SignInDto) {
    return this.authService.login(signIn.email);
  }

  @ApiOkResponse({ description: 'Returns accessTokens, refreshToken and user id' })
  @Post('/refresh')
  @HttpCode(201)
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const verifiedUser = this.jwtService.verify(refreshToken, { secret: this.jwtConstant.secret });

    if (!verifiedUser) {
      throw new ForbiddenException();
    }

    return this.authService.login(verifiedUser.email);
  }

}
