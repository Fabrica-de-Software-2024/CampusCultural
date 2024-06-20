import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Realiza o login do usuário',
    description:
      'Realiza o login usando o RA e senha do aluno e retorna o token de acesso para a API',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Registro do usuário na UTFPR',
          example: 'a00000',
        },
        password: {
          type: 'string',
          description: 'Senha de acesso do usuário',
          format: 'password',
        },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retorna o perfil do usuário',
    description: 'Retorna as informações básicas do perfil do usuário',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    return req.user;
  }

  @ApiOperation({
    summary: 'Dev Backend',
    description:
      'Retorna o link para o Backend de Debug',
  })
  @Get('backend')
  async Backend() {
    return process.env.BACKEND_URL;
  }
}
