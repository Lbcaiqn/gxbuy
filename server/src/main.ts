import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口版本
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 跨域
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  // 接口文档
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('接口文档')
    .setDescription('描述')
    .setVersion('1')
    .build();
  const docs = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, docs);

  // 端口
  await app.listen(3000);
}
bootstrap();
