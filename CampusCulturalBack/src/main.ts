import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação API - Campus Cultural')
    .setDescription(
      `Documentação dos Endpoints da API do projeto "Campus Cultural".`,
    )
    .setVersion('1.0')
    .addTag('Usuários')
    .addTag('Eventos')
    .addTag('Inscrições')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
