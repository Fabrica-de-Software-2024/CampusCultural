import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { EventoDTO } from './evento.dto';
import { error } from 'console';

@Injectable()
export class EventoService {
    constructor(private prisma: PrismaService) { }
    async findAll() {
        const eventos = await this.prisma.evento.findMany();
        const eventos2 = await eventos.sort((a, b) => { return (Number(a.data_evento) - Number(b.data_evento)) });
        return eventos2;
    }
    async findOne(id_evento: number) {
        const evento = await this.prisma.evento.findUnique({
            where: {
                id_evento
            }
        })
        return evento;
    }
    async create(data: EventoDTO) {
        if (data.imagemstr == "") {
            const novo_evento = await this.prisma.evento.create({
                data: {
                    professor_evento: data.professor_evento,
                    nome_evento: data.nome_evento,
                    sub_evento: data.sub_evento,
                    local_evento: data.local_evento,
                    data_evento: data.data_evento.toString(),
                    descricao_evento: data.descricao_evento,
                    imagem: 2
                },
            });
            return novo_evento;
        } else {
            const nova_imagem = await this.prisma.imagem.create({
                data: {
                    imagem: data.imagemstr
                },
            });
            const novo_evento = await this.prisma.evento.create({
                data: {
                    professor_evento: data.professor_evento,
                    nome_evento: data.nome_evento,
                    sub_evento: data.sub_evento,
                    local_evento: data.local_evento,
                    data_evento: data.data_evento.toString(),
                    descricao_evento: data.descricao_evento,
                    imagem: nova_imagem.id_imagem
                },
            });
            return novo_evento;
        }




    }
    async update(id_evento: number, data: EventoDTO) {
        const eventoExists = await this.prisma.evento.findUnique({
            where: {
                id_evento,
            },
        });

        if (!eventoExists) {
            throw new error('Evento não existe!');
        }
        else {
            const update_banner = await this.prisma.imagem.update({
                data: {
                    id_imagem: data.imagem,
                    imagem: data.imagemstr
                },
                where: {
                    id_imagem: data.imagem
                }
            });
            const update_evento = await this.prisma.evento.update({
                data: {
                    professor_evento: data.professor_evento,
                    nome_evento: data.nome_evento,
                    sub_evento: data.sub_evento,
                    local_evento: data.local_evento,
                    data_evento: data.data_evento.toString(),
                    descricao_evento: data.descricao_evento,
                    imagem: update_banner.id_imagem
                },
                where: {
                    id_evento,
                },
            });
            return update_evento;
        }
    }
    async remove(id_evento: number) {
        const eventoExists = await this.prisma.evento.delete({
            where: {
                id_evento,
            },
        });
        return eventoExists;
    }
}
