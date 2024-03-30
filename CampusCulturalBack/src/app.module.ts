import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './module/usuario/usuario.module';
import { EventoModule } from './module/evento/evento.module';

@Module({
  imports: [UsuarioModule, EventoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
