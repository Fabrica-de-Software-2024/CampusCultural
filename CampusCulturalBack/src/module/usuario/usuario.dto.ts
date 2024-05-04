import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDTO {
    @ApiProperty({
        description: "Chave Primária do Schema de Usuários.",
        example: "2400000"
    })
    "id_usuario": string;

    @ApiProperty({
        description: "Chave Estrangeira do Schema de Imagens",
        example: 1
    })
    "imagem"?: number;

    @ApiProperty({
        description: "Imagem em Base64",
        example: "data:image/png;base64,............."
    })
    "imagemstr"?: string;
}