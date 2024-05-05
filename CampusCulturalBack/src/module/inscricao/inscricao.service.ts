import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Evento_InscricaoDTO } from './inscricao.dto';
import { error } from 'console';

@Injectable()
export class EventoInscricaoService {
    constructor(private prisma: PrismaService) { }
    async findAll() {
        const evento_inscricao = await this.prisma.evento_Inscricao.findMany();
        return evento_inscricao;
    }
    async findOne(id_evento_inscricao: number) {
        const evento_inscricao = await this.prisma.evento_Inscricao.findUnique({
            where: {
                id_evento_inscricao
            }
        })
        return evento_inscricao;
    }
    async findEvento(id_inscricao_evento: number) {
        const evento_inscricao = await this.prisma.evento_Inscricao.findMany({
            where: {
                id_inscricao_evento
            }
        })
        return evento_inscricao;
    }
    async findUsuario(id_inscricao_usuario: string) {
        const evento_inscricao = await this.prisma.evento_Inscricao.findMany({
            where: {
                id_inscricao_usuario
            }
        })
        return evento_inscricao;
    }
    async findUsuarioEvento(id_inscricao_usuario: string, id_inscricao_evento: number) {
        const evento_inscricao = await this.prisma.evento_Inscricao.findFirst({
            where: {
                id_inscricao_usuario,
                id_inscricao_evento: Number(id_inscricao_evento)
            }
        })
        return evento_inscricao;
    }
    async create(data: Evento_InscricaoDTO) {
        const inscricaoExists = await this.prisma.evento_Inscricao.findFirst({
            where: {
                id_inscricao_evento: data.id_inscricao_evento,
                id_inscricao_usuario: data.id_inscricao_usuario
            }
        });
        if (inscricaoExists) {
            throw new Error('Usuário já Inscrito!');
        }
        else {


            const nova_inscricao = await this.prisma.evento_Inscricao.create({
                data: {
                    id_evento_inscricao: data.id_evento_inscricao,
                    id_inscricao_evento: data.id_inscricao_evento,
                    id_inscricao_usuario: data.id_inscricao_usuario,
                    notificacao: data.notificacao
                },
            });
            return nova_inscricao;
        }
    }
    async update(id_evento_inscricao: number, data: { 'notificacao': boolean }) {
        const inscricaoExists = await this.prisma.evento_Inscricao.findUnique({
            where: {
                id_evento_inscricao,
            },
        });

        if (!inscricaoExists) {
            throw new error('Inscrição não encontrada!');
        }
        else {
            const update_inscricao = await this.prisma.evento_Inscricao.update({
                where: {
                    id_evento_inscricao,
                },
                data: {
                    notificacao: data.notificacao
                },
            });
            return update_inscricao;
        }
    }
    async remove(id_evento_inscricao: number) {
        const inscricaoExists = await this.prisma.evento_Inscricao.delete({
            where: {
                id_evento_inscricao,
            },
        });
        return inscricaoExists;
    }

}
