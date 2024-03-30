import { Module } from '@nestjs/common';
import { EventoInscricaoService } from './evento_inscricao.service';
import { EventoInscricaoController } from './evento_inscricao.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [EventoInscricaoController],
  providers: [EventoInscricaoService, PrismaService],
})
export class EventoInscricaoModule {}
