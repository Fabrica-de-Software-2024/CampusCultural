import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EventoInscricaoService } from './inscricao.service';
import { Evento_InscricaoDTO } from './inscricao.dto';

@Controller('inscricao')
export class EventoInscricaoController {
  constructor(private readonly eventoInscricaoService: EventoInscricaoService) { }

  @Get()
  findAll() {
    return this.eventoInscricaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventoInscricaoService.findOne(+id);
  }

  @Post()
  create(@Body() data: Evento_InscricaoDTO) {
    return this.eventoInscricaoService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: { 'notificacao': boolean }) {
    return this.eventoInscricaoService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventoInscricaoService.remove(+id);
  }
}

