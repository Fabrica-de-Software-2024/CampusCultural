import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './module/usuario/usuario.module';
import { EventoModule } from './module/evento/evento.module';
import { EventoInscricaoModule } from './module/inscricao/inscricao.module';
import { ImagemModule } from './module/imagem/imagem.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UsuarioModule,
    EventoModule,
    ImagemModule,
    EventoInscricaoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
