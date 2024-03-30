import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDTO } from './usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  create(@Body() usuarioDTO: UsuarioDTO) {
    return this.usuarioService.create(usuarioDTO);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Post()
  Login(@Body() login_usuario: string, senha_usuario) {
    return this.usuarioService.Login(login_usuario, senha_usuario);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() usuarioDTO: UsuarioDTO) {
    return this.usuarioService.update(+id, usuarioDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
