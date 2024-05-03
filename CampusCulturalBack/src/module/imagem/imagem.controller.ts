import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { ImagemService } from './imagem.service';
import { ImagemDTO } from './imagem.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Imagens')
@Controller('imagem')
export class ImagemController {
  constructor(private readonly imagemService: ImagemService) { }

  @ApiOperation({
    summary: "Busca imagem pelo ID.",
    description: "Busca imagem pelo ID."
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagemService.findOne(+id);
  }

  @ApiOperation({
    summary: "Edita uma imagem",
    description: "Edita uma imagem"
  })
  @Post()
  update(@Body() data: ImagemDTO){
    console.log(data)
    return this.imagemService.update(data);
  }

  @ApiOperation({
    summary: "Deleta uma imagem pelo ID.",
    description: "Deleta uma imagem pelo ID."
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagemService.remove(+id);
  }
}
