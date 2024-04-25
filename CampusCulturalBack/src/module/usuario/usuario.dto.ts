import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDTO {
    @ApiProperty({
        description: "Chave Primária do Schema de Usuários.",
        example: 1
    })
    id_usuario: number;

    @ApiProperty({
        description: "Foto de Perfil do Usuário em Base64.",
        example: "data:image/png;base64,............."
    })
    imagem: string;
}