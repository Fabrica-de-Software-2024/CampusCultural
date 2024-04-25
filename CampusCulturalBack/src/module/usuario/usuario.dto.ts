import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDTO {
    @ApiProperty({
        description: "Chave Primária do Schema de Usuários.",
        example: 1
    })
    id_usuario: number;
}