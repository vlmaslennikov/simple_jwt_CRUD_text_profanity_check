import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDBModule } from 'src/providers/mongodb/mongodb.module';
import { PostModule } from './posts/post.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import mongodbConfig from 'src/shared/config/mongodb.config';
import appConfig from 'src/shared/config/app.config';
import jwtConfig from 'src/shared/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [
        appConfig,
        mongodbConfig,
        jwtConfig,
      ],
    }),
    MongoDBModule,
    AuthModule,
    PostModule,
    UserModule
  ],
})
export class AppModule { }
