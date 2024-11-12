import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import InternalExceptionsFilter from './shared/filters/internal.exception.filter';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
    bodyParser: true,
  });
  const configService: ConfigService<any, boolean> = app.get(ConfigService);
  const appConfig = configService.get('app');

  app.enableCors({
    origin: appConfig.cors,
    credentials: true,
    maxAge: 3600,
  });
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new InternalExceptionsFilter());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('URL Shortener API')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      persistAuthorization: true,
    },
  });

  await app.listen(appConfig.port ?? 3000);
  Logger.verbose(`App running on port: ${appConfig.port}`);
}
bootstrap();
