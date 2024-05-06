-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_imagem_fkey";

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "imagem" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_imagem_fkey" FOREIGN KEY ("imagem") REFERENCES "imagem"("id_imagem") ON DELETE SET NULL ON UPDATE CASCADE;
