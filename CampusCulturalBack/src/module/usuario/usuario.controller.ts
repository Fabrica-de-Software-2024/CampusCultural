import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDTO } from './usuario.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @ApiOperation({
    summary: "Busca Usuario pelo ID.",
    description: "Busca Usuario pelo ID."
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @ApiOperation({
    summary: "Registra um usuário",
    description: "Registra um usuário"
  })
  @Post('/register')
  create(@Body() usuarioDTO: UsuarioDTO) {
    return this.usuarioService.create(usuarioDTO);
  }

  @ApiOperation({
    summary: "Efetua o Login de um usuário com Email e Senha.",
    description: "Efetua o Login um usuário com Email e Senha."
  })
  @Post('/login')
  Login(@Body() data: { login_usuario: string, senha_usuario }) {
    return this.usuarioService.Login(data);
  }

  @ApiOperation({
    summary: "Edita informações de um usuário pelo ID.",
    description: "Edita informações de um usuário pelo ID."
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() usuarioDTO: UsuarioDTO) {
    return this.usuarioService.update(+id, usuarioDTO);
  }

  @ApiOperation({
    summary: "Deleta um usuário pelo ID.",
    description: "Deleta um usuário pelo ID."
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
