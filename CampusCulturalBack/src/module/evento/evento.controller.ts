import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoDTO } from './evento.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Eventos')
@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @ApiOperation({
    summary: "Exibe todos os Eventos.",
    description: "Exibe todos os Eventos."
  })
  @Get()
  findAll(){
    return this.eventoService.findAll();
  }

  @ApiOperation({
    summary: "Busca um evento pelo ID.",
    description: "Busca um evento pelo ID."
  })
  @Get(':id')
  findOne(@Param('id') id: number){
    return this.eventoService.findOne(+id);
  }

  @ApiOperation({
    summary: "Cria um novo Evento.",
    description: "Cria um novo Evento."
  })
  @Post()
  create(@Body() data: EventoDTO){
    return this.eventoService.create(data);
  }

  @ApiOperation({
    summary: "Edita um Evento pelo ID.",
    description: "Edita um Evento pelo ID."
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: EventoDTO) {
    return this.eventoService.update(+id, data);
  }

  @ApiOperation({
    summary: "Deleta um Evento pelo ID.",
    description: "Deleta um Evento pelo ID."
  })
  @Delete(':id')
  remove(@Param('id') id: number){
    return this.eventoService.remove(+id);
  }
}
