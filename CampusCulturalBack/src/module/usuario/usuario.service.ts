import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { PrismaService } from '../../database/PrismaService';
import { UsuarioCreateDTO } from './usuarioCreate.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

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

    const update_usuario = await this.prisma.imagem.update({
      where: {
        id_imagem: user.imagem,
      },
      data: {
        id_imagem: user.imagem,
        imagem: data?.imagemstr,
      },
    });

    return update_usuario;
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
