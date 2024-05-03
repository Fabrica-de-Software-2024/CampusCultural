import { ApiProperty } from "@nestjs/swagger";

export class ImagemDTO {
    @ApiProperty({
        description: "Chave Primária do Schema de Imagens.",
        example: 1
    })
    "id_imagem": number;

    @ApiProperty({
        description: "Foto de Perfil do Usuário em Base64.",
        example: "data:image/png;base64,............."
    })
    "imagem"?: string;
}