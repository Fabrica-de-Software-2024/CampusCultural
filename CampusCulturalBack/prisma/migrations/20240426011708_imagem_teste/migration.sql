/*
  Warnings:

  - You are about to drop the column `curso_usuario` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `is_professor` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `login_usuario` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nome_usuario` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `senha_usuario` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `imagem` to the `evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "usuario_login_usuario_key";

-- AlterTable
ALTER TABLE "evento" ADD COLUMN     "imagem" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "curso_usuario",
DROP COLUMN "is_professor",
DROP COLUMN "login_usuario",
DROP COLUMN "nome_usuario",
DROP COLUMN "senha_usuario",
ADD COLUMN     "imagem" TEXT NOT NULL,
ALTER COLUMN "id_usuario" DROP DEFAULT;
DROP SEQUENCE "usuario_id_usuario_seq";
