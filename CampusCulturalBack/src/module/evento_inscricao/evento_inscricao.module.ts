import { Module } from '@nestjs/common';
import { EventoInscricaoService } from './evento_inscricao.service';
import { EventoInscricaoController } from './evento_inscricao.controller';

@Module({
  controllers: [EventoInscricaoController],
  providers: [EventoInscricaoService],
})
export class EventoInscricaoModule {}
