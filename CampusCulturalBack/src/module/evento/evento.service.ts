import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaSerice';
import { EventoDTO } from './evento.dto';
import { error } from 'console';

@Injectable()
export class EventoService {
    constructor(private prisma: PrismaService) { }
    async findAll() {
        const eventos = await this.prisma.evento.findMany();
        return eventos;
    }
    async findOne(id_evento: number) {
        const evento = await this.prisma.evento.findUnique({
            where: {
                id_evento
            }
        })
        return evento
    }
    async create(data: EventoDTO) {
        const novo_evento = await this.prisma.evento.create({
            data: {
                professor_evento: data.professor_evento,
                nome_evento: data.nome_evento,
                sub_evento: data.sub_evento,
                data_evento: data.data_evento,
                descricao_evento: data.descricao_evento
            },
        });
        return novo_evento;
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
        const update_evento = await this.prisma.evento.update({
            data: {
                professor_evento: data.professor_evento,
                nome_evento: data.nome_evento,
                sub_evento: data.sub_evento,
                data_evento: data.data_evento,
                descricao_evento: data.descricao_evento
            },
            where: {
                id_evento,
            },
        });
        return update_evento;
    }
    async remove(id_evento: number) {
        const eventoExists = await this.prisma.evento.delete({
            where: {
                id_evento,
            },
        });
        return eventoExists
    }
}
