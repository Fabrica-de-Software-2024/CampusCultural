import { ApiProperty } from "@nestjs/swagger";

export class EventoDTO {

    @ApiProperty({
        description: "Chave Primária do Schema de Eventos.",
        example: 1
    })
    "id_evento"?: number;

    @ApiProperty({
        description: "Identificador do Professor que Registrou o Evento.",
        example: 1
    })
    "professor_evento": string;

    @ApiProperty({
        description: "Nome do Evento.",
        example: "Semana Acadêmica"
    })
    "nome_evento": string;

    @ApiProperty({
        description: "Sub-titulo do Evento.",
        example: "Se inscreva no nosso evento mais aguardado!"
    })
    "sub_evento": string;

    @ApiProperty({
        description: "Local do Evento.",
        example: "Auditório!"
    })
    "local_evento": string;

    @ApiProperty({
        description: "Data do Evento no formato UNIX Timestamp, por exemplo, o horario do exemplo é o horario atual.",
        example: Date.now()
    })
    "data_evento"?: number;

    @ApiProperty({
        description: "Descrição mais detalhada do Evento.",
        example: "A Semana Acadêmica é um evento anual do curso de engenharia de software..."
    })
    "descricao_evento": string;

    @ApiProperty({
        description: "ID do Banner do evento.",
        example: 1
    })
    imagem?: number;

    @ApiProperty({
        description: "Banner do evento em Base64.",
        example: "data:image/png;base64,............."
    })
    imagemstr?: string;
}