import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './module/usuario/usuario.module';
import { EventoModule } from './module/evento/evento.module';
import { EventoInscricaoModule } from './module/evento_inscricao/evento_inscricao.module';

@Module({
  imports: [UsuarioModule, EventoModule, EventoInscricaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
