/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "evento" DROP CONSTRAINT "evento_professor_evento_fkey";

-- DropForeignKey
ALTER TABLE "evento_inscricao" DROP CONSTRAINT "evento_inscricao_id_inscricao_usuario_fkey";

-- AlterTable
ALTER TABLE "evento" ALTER COLUMN "professor_evento" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "evento_inscricao" ALTER COLUMN "id_inscricao_usuario" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
ALTER COLUMN "id_usuario" DROP DEFAULT,
ALTER COLUMN "id_usuario" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario");
DROP SEQUENCE "usuario_id_usuario_seq";

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_professor_evento_fkey" FOREIGN KEY ("professor_evento") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_inscricao" ADD CONSTRAINT "evento_inscricao_id_inscricao_usuario_fkey" FOREIGN KEY ("id_inscricao_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
