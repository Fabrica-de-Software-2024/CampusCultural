import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDTO {
    @ApiProperty({
        description: "Chave Primária do Schema de Usuários.",
        example: 1
    })
    id_usuario?: number;
    
    @ApiProperty({
        description: "Nome do Usuário.",
        example: "João Silva"
    })
    nome_usuario: string;
    
    @ApiProperty({
        description: "Email de Login do Usuário.",
        example: "joaosilva@gmail.com"
    })
    login_usuario: string;
    
    @ApiProperty({
        description: "Senha de Login do Usuário.",
        example: "joao123"
    })
    senha_usuario: string;

    @ApiProperty({
        description: "Curso em que o usuário esta matriculado.",
        example: "Bach Engenharia de Software"
    })
    curso_usuario: string;

    @ApiProperty({
        description: "Usado para diferenciar usuários do tipo aluno e usuários do tipo professor.",
        example: false
    })
    is_professor: boolean;
}