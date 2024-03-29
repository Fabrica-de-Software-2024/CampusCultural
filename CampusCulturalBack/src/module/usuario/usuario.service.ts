import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { PrismaService } from '../../database/PrismaSerice'
import { error } from 'console';


@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService){}
  async create(usuarioDTO: UsuarioDTO ) {
    const userExists = await this.prisma.usuario.findFirst({
      where: {
        login_usuario: usuarioDTO.login_usuario,
      }
     });
    if(userExists) {
      throw new Error('Usario ja existe');
    }
    else if(!userExists){
      const novo_usuario = await this.prisma.usuario.create({
        data: {
          nome_usuario: usuarioDTO.nome_usuario,
          login_usuario: usuarioDTO.login_usuario,
          senha_usuario: usuarioDTO.senha_usuario,
          curso_usuario: usuarioDTO.curso_usuario,
          is_professor:  usuarioDTO.is_professor,
        },
      });
      return novo_usuario;
    }
    else{
      throw new Error('Criação de usuario invalida');
    }
  }

  async findAll() {
    const usuario = await this.prisma.usuario.findMany();
    return usuario;
  }

  async Login(login_usuario: string , senha_usuario: string) {
    const usuario = await this.prisma.usuario.findMany({
      where: {
        login_usuario,
        senha_usuario,
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

    if(!userExists){
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
