import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { PrismaService } from '../../database/PrismaService'

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) { }

  async findOne(id_usuario: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id_usuario
      }
    })
    return usuario;
  }

  async edit(usuarioDTO: UsuarioDTO) {
    const update_usuario = await this.prisma.usuario.upsert({
      where: {
        id_usuario: usuarioDTO?.id_usuario
      },
      update: {
        imagem: usuarioDTO?.imagem
      },
      create: {
        id_usuario: usuarioDTO?.id_usuario,
        imagem: usuarioDTO?.imagem
      }
    });
    return update_usuario;
  }

  async remove(id_usuario: number) {
    const userExists = await this.prisma.usuario.delete({
      where: {
        id_usuario,
      },
    });
    return userExists
  }
}