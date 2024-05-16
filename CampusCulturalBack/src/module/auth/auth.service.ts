import {
  Injectable,
  HttpStatus,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '@prisma/client';

export type JwtPayload = {
  sub: string;
  nome_usuario: string;
  is_professor: boolean;
  iat: number;
};

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const token = await this.validateUserInApi(username, password);

    if (!token) {
      return null;
    }

    const user = await this.usuarioService.findOne(username);

    if (user) {
      return user;
    }

    const userData = await this.getUserDataFromApi(token);
    const isProfessor = await this.getIfIsProfessorFromApi(token);

    const userCreate = {
      is_professor: isProfessor,
      id_usuario: userData.login,
      nome_usuario: userData.name,
      imagem: 1
    };

    const newUser = this.usuarioService.create(userCreate);

    return newUser;
  }

  async login(user: Usuario) {
    const payload = {
      sub: user.id_usuario,
      nome_usuario: user.nome_usuario,
      is_professor: user.is_professor,
      iat: user.imagem
    } satisfies JwtPayload;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUserInApi(login: string, password: string) {
    const body = {
      login,
      password,
    };

    const response = await fetch(
      'https://coensapp.dv.utfpr.edu.br/siacoes/service/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      if (response.status === HttpStatus.UNAUTHORIZED) {
        return null;
      }
      const description = await response.text();

      throw new ServiceUnavailableException('API da UTF está com erros', {
        cause: new Error(),
        description,
      });
    }

    const token = await response.text();

    return token;
  }

  private async getApiInfoJson<T>(url: string, token: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const description = await response.text();

      throw new ServiceUnavailableException('API da UTF está com erros', {
        cause: new Error(),
        description,
      });
    }

    return response.json() as T;
  }

  private async getUserDataFromApi(token: string) {
    interface IApiProfileData {
      name: string;
      login: string;
    }

    const data = await this.getApiInfoJson<IApiProfileData>(
      'https://coensapp.dv.utfpr.edu.br/siacoes/service/user/profile',
      token,
    );

    return data;
  }

  private async getIfIsProfessorFromApi(token: string) {
    const data = await this.getApiInfoJson<string[]>(
      'https://coensapp.dv.utfpr.edu.br/siacoes/service/user/list/profiles',
      token,
    );

    return data.includes('PROFESSOR');
  }
}
