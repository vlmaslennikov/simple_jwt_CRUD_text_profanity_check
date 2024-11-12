import { registerAs } from '@nestjs/config';


export default registerAs('app', () => ({
  port: process.env.SERVER_PORT || 3001,
  baseUrl: process.env.BASE_URL || 'http://localhost:3001',
  env: process.env.NODE_ENV || 'develop',
  cors: process.env.CORS,
}));