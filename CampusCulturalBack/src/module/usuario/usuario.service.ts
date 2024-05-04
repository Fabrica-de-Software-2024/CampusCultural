import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { PrismaService } from '../../database/PrismaService'

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) { }

  async findOne(id_usuario: string) {
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
      const update_usuario = await this.prisma.imagem.update({
        where: {
          id_imagem: userExists.imagem,
        },
        data: {
          id_imagem: userExists.imagem,
          imagem: data?.imagemstr,
        }
      });
      return update_usuario;
    } else {
      const imagem = await this.prisma.imagem.create({
        data: {
          imagem: data?.imagemstr,
        }
      })
      const usuario = await this.prisma.usuario.create({
        data: {
          id_usuario: data?.id_usuario,
          imagem: imagem?.id_imagem
        }
      });
      return usuario;
    }
  }

  async remove(id_usuario: string) {
    const userExists = await this.prisma.usuario.delete({
      where: {
        id_usuario,
      },
    });
    return userExists
  }
}