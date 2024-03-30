import { Module } from '@nestjs/common';
import { EventoInscricaoService } from './inscricao.service';
import { EventoInscricaoController } from './inscricao.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [EventoInscricaoController],
  providers: [EventoInscricaoService, PrismaService],
})
export class EventoInscricaoModule { }
