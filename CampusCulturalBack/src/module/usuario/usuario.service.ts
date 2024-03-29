import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { PrismaService } from '../../database/PrismaSerice'


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

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, usuarioDTO: UsuarioDTO) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
