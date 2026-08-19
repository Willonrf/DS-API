import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import fastifyCompress from '@fastify/compress';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.register(fastifyCompress, {
    encodings: ['br', 'gzip', 'deflate'],
    threshold: 1024,
  });

  const config = new DocumentBuilder()
    .setTitle('Dark Souls API')
    .setDescription(
      'API com os dados de Chefões e Armas do universo Dark Souls',
    )
    .setVersion('1.0')
    .addTag('bosses', 'Rotas relacionadas aos Chefões')
    .addTag('weapons', 'Rotas relacionadas às Armas')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3030;

  await app.listen(port, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error('Erro ao iniciar a aplicação:', err);
});
