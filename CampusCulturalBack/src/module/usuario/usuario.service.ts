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

  async update(data: UsuarioDTO) {
    console.log(data)
    const userExists = await this.prisma.usuario.findUnique({
      where: {
        id_usuario: data.id_usuario,
      }
    });
    if (userExists) {
      const update_usuario = await this.prisma.usuario.update({
        where: {
          id_usuario: data?.id_usuario,
        },
        data: {
          id_usuario: data?.id_usuario,
          imagem: data?.imagem,
        }
      });
      return update_usuario;
    } else {
      const usuario = await this.prisma.usuario.create({
        data: {
          id_usuario: data?.id_usuario,
          imagem: data?.imagem,
        }
      });
      return usuario;
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