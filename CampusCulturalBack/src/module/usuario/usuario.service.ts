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
    const userExists = await this.prisma.usuario.findFirst({
      where: {
        id_usuario: usuarioDTO?.id_usuario,
      }
    });
    if (userExists) {
      const update_usuario = await this.prisma.usuario.update({
        data: {
          imagem: usuarioDTO.imagem
        },
        where: {
          id_usuario: usuarioDTO?.id_usuario,
        },
      });
      return update_usuario;
    }
    else if (!userExists) {
      const novo_usuario = await this.prisma.usuario.create({
        data: {
          id_usuario: usuarioDTO.id_usuario,
          imagem: usuarioDTO.imagem
        },
      });
      return novo_usuario;
    }
    else {
      throw new Error('Criação de usuario invalida');
    }
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