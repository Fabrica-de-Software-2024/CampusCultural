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
  SwaggerModule.setup('', app, document, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  });


  await app.listen(3000);
}
bootstrap();
