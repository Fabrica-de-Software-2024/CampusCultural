import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { PrismaService } from '../../database/PrismaService';
import { UsuarioCreateDTO } from './usuarioCreate.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) { }

  async findOne(id_usuario: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id_usuario,
      },
    });

    return usuario;
  }

  async create(data: UsuarioCreateDTO) {
    const usuario = await this.prisma.usuario.create({
      data: {
        id_usuario: data.id_usuario,
        nome_usuario: data.nome_usuario,
      },
    });

    return usuario;
  }

  async update(data: UsuarioDTO) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id_usuario: data.id_usuario,
      },
    });

    if (!user) return null;

    if (user.imagem !== 1) {
      const update_usuario = await this.prisma.imagem.update({
        where: {
          id_imagem: user.imagem,
        },
        data: {
          id_imagem: user.imagem,
          imagem: data?.imagemstr,
        },
      });

      if(!update_usuario){return user}

      else new NotFoundException('Usuário não encontrado');

      return user;
    }
    else {
      const update_imagem = await this.prisma.imagem.create({
        data: {
          imagem: data?.imagemstr,
        },
      });
      const update_usuario = await this.prisma.usuario.update({
        where: {
          id_usuario: user.id_usuario,
        },
        data: {
          imagem: update_imagem.id_imagem,
        },
      })
      return update_usuario;
    }


  }

  async remove(id_usuario: string) {
    const userExists = await this.prisma.usuario.delete({
      where: {
        id_usuario,
      },
    });
    return userExists;
  }
}
