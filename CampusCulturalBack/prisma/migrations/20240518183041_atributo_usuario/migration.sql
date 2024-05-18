/*
  Warnings:

  - Added the required column `atributo_usuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "atributo_usuario" TEXT NOT NULL;
