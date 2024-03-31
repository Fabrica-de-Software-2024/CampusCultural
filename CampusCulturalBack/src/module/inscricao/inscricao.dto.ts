import { ApiProperty } from "@nestjs/swagger";

export class Evento_InscricaoDTO {
    @ApiProperty({
        description: "Chave Primária do Schema de Inscrições.",
        example: 1
    })
    "id_evento_inscricao": number;

    @ApiProperty({
        description: "Identificador do Usuário que se inscreveu no evento.",
        example: 1
    })
    "id_inscricao_usuario": number;

    @ApiProperty({
        description: "Identificador do Evento que o usuário se inscreveu.",
        example: 1
    })
    "id_inscricao_evento": number;

    @ApiProperty({
        description: "O Usuário quer se notificado do evento?",
        example: true
    })
    "notificacao": boolean;
}