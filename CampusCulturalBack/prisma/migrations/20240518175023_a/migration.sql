-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" TEXT NOT NULL,
    "imagem" INTEGER NOT NULL DEFAULT 1,
    "nome_usuario" TEXT NOT NULL,
    "is_professor" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "evento" (
    "id_evento" SERIAL NOT NULL,
    "professor_evento" TEXT NOT NULL,
    "nome_evento" TEXT NOT NULL,
    "sub_evento" TEXT NOT NULL,
    "data_evento" TEXT NOT NULL,
    "descricao_evento" TEXT NOT NULL,
    "imagem" INTEGER NOT NULL,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "imagem" (
    "id_imagem" SERIAL NOT NULL,
    "imagem" TEXT NOT NULL,

    CONSTRAINT "imagem_pkey" PRIMARY KEY ("id_imagem")
);

-- CreateTable
CREATE TABLE "evento_inscricao" (
    "id_evento_inscricao" SERIAL NOT NULL,
    "id_inscricao_usuario" TEXT NOT NULL,
    "id_inscricao_evento" INTEGER NOT NULL,
    "notificacao" BOOLEAN NOT NULL,

    CONSTRAINT "evento_inscricao_pkey" PRIMARY KEY ("id_evento_inscricao")
);

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_imagem_fkey" FOREIGN KEY ("imagem") REFERENCES "imagem"("id_imagem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_professor_evento_fkey" FOREIGN KEY ("professor_evento") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_imagem_fkey" FOREIGN KEY ("imagem") REFERENCES "imagem"("id_imagem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_inscricao" ADD CONSTRAINT "evento_inscricao_id_inscricao_usuario_fkey" FOREIGN KEY ("id_inscricao_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_inscricao" ADD CONSTRAINT "evento_inscricao_id_inscricao_evento_fkey" FOREIGN KEY ("id_inscricao_evento") REFERENCES "evento"("id_evento") ON DELETE RESTRICT ON UPDATE CASCADE;
