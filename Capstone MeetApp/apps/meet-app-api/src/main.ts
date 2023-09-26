/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({ origin: "*" });
  const config = new DocumentBuilder()
    .setTitle('Meet App API')
    .setDescription('API documentation for Meet App')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({type: 'apiKey', name: 'x-api-key', in: 'header'}, 'Api-Key')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
