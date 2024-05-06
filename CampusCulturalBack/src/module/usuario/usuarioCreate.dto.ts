import { ApiProperty } from '@nestjs/swagger';

export class UsuarioCreateDTO {
  @ApiProperty({
    description: 'Chave Primária do Schema de Usuários.',
    example: '2400000',
  })
  'id_usuario': string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Carlos da Silva',
  })
  'nome_usuario': string;

  @ApiProperty({
    description: 'Se o usuário é um professor',
    type: Boolean,
  })
  'is_professor': boolean;
}
