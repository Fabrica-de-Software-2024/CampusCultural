import { Injectable } from '@nestjs/common';
import { LoginDTO, UsuarioDTO } from './usuario.dto';
import { PrismaService } from '../../database/PrismaService'
import { error } from 'console';


@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) { }

  async findOne(id_usuario: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id_usuario
      }
    })
    return {
      "id_usuario": usuario.id_usuario,
      "nome_usuario": usuario.nome_usuario,
      "curso_usuario": usuario.curso_usuario,
      "is_professor": usuario.is_professor
    };
  }

  async create(usuarioDTO: UsuarioDTO) {
    const userExists = await this.prisma.usuario.findFirst({
      where: {
        login_usuario: usuarioDTO.login_usuario,
      }
    });
    if (userExists) {
      throw new Error('Usuário já existe!');
    }
    else if (!userExists) {
      const novo_usuario = await this.prisma.usuario.create({
        data: {
          nome_usuario: usuarioDTO.nome_usuario,
          login_usuario: usuarioDTO.login_usuario,
          senha_usuario: usuarioDTO.senha_usuario,
          curso_usuario: usuarioDTO.curso_usuario,
          is_professor: usuarioDTO.is_professor,
        },
      });
      return novo_usuario;
    }
    else {
      throw new Error('Criação de usuario invalida');
    }
  }

  async Login(data: LoginDTO) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        login_usuario: data.login_usuario,
        senha_usuario: data.senha_usuario,
      },
    });
    return usuario;
  }

  async update(id_usuario: number, usuarioDTO: UsuarioDTO) {
    const userExists = await this.prisma.usuario.findUnique({
      where: {
        id_usuario,
      },
    });

    if (!userExists) {
      throw new error('Usuario não existe!');
    }
    const update_usuario = await this.prisma.usuario.update({
      data: {
        nome_usuario: usuarioDTO.nome_usuario,
        login_usuario: usuarioDTO.login_usuario,
        senha_usuario: usuarioDTO.senha_usuario,
        curso_usuario: usuarioDTO.curso_usuario,
        is_professor: usuarioDTO.is_professor,
      },
      where: {
        id_usuario,
      },
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