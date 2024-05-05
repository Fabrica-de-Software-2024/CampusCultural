import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EventoInscricaoService } from './inscricao.service';
import { Evento_InscricaoDTO } from './inscricao.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Inscrições')
@Controller('inscricao')
export class EventoInscricaoController {
  constructor(private readonly eventoInscricaoService: EventoInscricaoService) { }

  @ApiOperation({
    summary: "Exibe todas as Inscrições",
    description: "Exibe todas as Inscrições"
  })
  @Get()
  findAll() {
    return this.eventoInscricaoService.findAll();
  }

  @ApiOperation({
    summary: "Busca a inscrição pelo ID.",
    description: "Busca a inscrição pelo ID."
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventoInscricaoService.findOne(+id);
  }

  @ApiOperation({
    summary: "Filtra as inscrições pelo ID do Evento.",
    description: "Filtra as inscrições pelo ID do Evento."
  })
  @Get('/evento/:id')
  findEvento(@Param('id') id: number) {
    return this.eventoInscricaoService.findEvento(+id);
  }

  @ApiOperation({
    summary: "Filtra as inscrições pelo ID do Usuário.",
    description: "Filtra as inscrições pelo ID do Usuário."
  })
  @Get('/usuario/:id')
  findUsuario(@Param('id') id: string) {
    return this.eventoInscricaoService.findUsuario(id);
  }

  @ApiOperation({
    summary: "Filtra as inscrições pelo ID do Usuário e do Evento.",
    description: "Filtra as inscrições pelo ID do Usuário e do Evento."
  })
  @Get('/usuario/:id_usuario/:id_evento')
  findUsuarioEvento(@Param('id_usuario') id_usuario: string, @Param('id_evento') id_evento: number) {
    return this.eventoInscricaoService.findUsuarioEvento(id_usuario, id_evento);
  }

  @ApiOperation({
    summary: "Cria uma nova Inscrição.",
    description: "Cria uma nova Inscrição."
  })
  @Post()
  create(@Body() data: Evento_InscricaoDTO) {
    return this.eventoInscricaoService.create(data);
  }

  @ApiOperation({
    summary: "Edita a escolha do usuário de notificação pelo ID.",
    description: "Edita a escolha do usuário de notificação pelo ID."
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: { 'notificacao': boolean }) {
    return this.eventoInscricaoService.update(+id, data);
  }

  @ApiOperation({
    summary: "Deleta a inscrição pelo ID.",
    description: "Deleta a inscrição pelo ID."
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventoInscricaoService.remove(+id);
  }
}

