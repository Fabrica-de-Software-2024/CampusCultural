import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDTO } from './usuario.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiOperation({
    summary: 'Busca Usuario pelo ID.',
    description: 'Busca Usuario pelo ID.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @ApiOperation({
    summary: 'Edita um usuário',
    description: 'Edita um usuário',
  })
  @Post()
  update(@Body() data: UsuarioDTO) {
    console.log(data);
    const usuario = this.usuarioService.update(data);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    else return usuario
  }

  @ApiOperation({
    summary: 'Deleta um usuário pelo ID.',
    description: 'Deleta um usuário pelo ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
