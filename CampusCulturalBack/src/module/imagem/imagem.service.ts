import { Injectable } from '@nestjs/common';
import { ImagemDTO } from './imagem.dto';
import { PrismaService } from '../../database/PrismaService'

@Injectable()
export class ImagemService {
  constructor(private prisma: PrismaService) { }

  async findOne(id_imagem: number) {
    const imagem = await this.prisma.imagem.findUnique({
      where: {
        id_imagem
      }
    })
    return imagem;
  }

  async update(data: ImagemDTO) {
    console.log(data)
    const imgExists = await this.prisma.imagem.findUnique({
      where: {
        id_imagem: data.id_imagem,
      }
    });
    if (imgExists && data.id_imagem !== 1 && data.id_imagem !== 2) {
      const update_imagem = await this.prisma.imagem.update({
        where: {
          id_imagem: data?.id_imagem,
        },
        data: {
          id_imagem: data?.id_imagem,
          imagem: data?.imagem,
        }
      });
      return update_imagem;
    } else {
      const imagem = await this.prisma.imagem.create({
        data: {
          id_imagem: data?.id_imagem,
          imagem: data?.imagem,
        }
      });
      return imagem;
    }
  }

  async remove(id_imagem: number) {
    const imgExists = await this.prisma.imagem.delete({
      where: {
        id_imagem,
      },
    });
    return imgExists
  }
}