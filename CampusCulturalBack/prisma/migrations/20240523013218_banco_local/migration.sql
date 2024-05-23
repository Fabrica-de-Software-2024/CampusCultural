/*
  Warnings:

  - A unique constraint covering the columns `[id_evento]` on the table `evento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_evento_inscricao]` on the table `evento_inscricao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_imagem]` on the table `imagem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_usuario]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "evento_id_evento_key" ON "evento"("id_evento");

-- CreateIndex
CREATE UNIQUE INDEX "evento_inscricao_id_evento_inscricao_key" ON "evento_inscricao"("id_evento_inscricao");

-- CreateIndex
CREATE UNIQUE INDEX "imagem_id_imagem_key" ON "imagem"("id_imagem");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_id_usuario_key" ON "usuario"("id_usuario");
