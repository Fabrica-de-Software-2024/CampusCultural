import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoDTO } from './evento.dto';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  findAll(){
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number){
    return this.eventoService.findOne(+id);
  }

  @Post()
  create(@Body() data: EventoDTO){
    return this.eventoService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: EventoDTO) {
    return this.eventoService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number){
    return this.eventoService.remove(+id);
  }
}
