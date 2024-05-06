/*
  Warnings:

  - Added the required column `nome_usuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "is_professor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nome_usuario" TEXT NOT NULL;
