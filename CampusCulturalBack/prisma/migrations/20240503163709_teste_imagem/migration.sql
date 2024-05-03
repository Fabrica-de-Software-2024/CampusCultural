/*
  Warnings:

  - Changed the type of `imagem` on the `evento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `imagem` on the `usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "evento" DROP COLUMN "imagem",
ADD COLUMN     "imagem" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "imagem",
ADD COLUMN     "imagem" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "imagem" (
    "id_imagem" SERIAL NOT NULL,
    "imagem" TEXT NOT NULL,

    CONSTRAINT "imagem_pkey" PRIMARY KEY ("id_imagem")
);

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_imagem_fkey" FOREIGN KEY ("imagem") REFERENCES "imagem"("id_imagem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_imagem_fkey" FOREIGN KEY ("imagem") REFERENCES "imagem"("id_imagem") ON DELETE RESTRICT ON UPDATE CASCADE;
