/*
  Warnings:

  - Changed the type of `data_evento` on the `evento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "evento" DROP COLUMN "data_evento",
ADD COLUMN     "data_evento" BIGINT NOT NULL;
