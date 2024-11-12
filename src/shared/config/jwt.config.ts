import { registerAs } from '@nestjs/config';

export type JwtConfigTypes = {
  secret: string,
  jwtExpAccessToken: number,
  jwtExpRefreshToken: number,
}

export default registerAs('jwt', (): JwtConfigTypes => ({
  secret: process.env.JWT_SECRET,
  jwtExpAccessToken: 1000 * 60 * 15, // 15m
  jwtExpRefreshToken: 1000 * 60 * 60 * 3, // 3h
}));