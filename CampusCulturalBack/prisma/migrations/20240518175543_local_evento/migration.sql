/*
  Warnings:

  - Added the required column `local_evento` to the `evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evento" ADD COLUMN     "local_evento" TEXT NOT NULL;
