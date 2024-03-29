-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "login_usuario" TEXT NOT NULL,
    "senha_usuario" TEXT NOT NULL,
    "curso_usuario" TEXT NOT NULL,
    "is_professor" BOOLEAN NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "evento" (
    "id_evento" SERIAL NOT NULL,
    "professor_evento" INTEGER NOT NULL,
    "nome_evento" TEXT NOT NULL,
    "sub_evento" TEXT NOT NULL,
    "data_evento" TIMESTAMP(3) NOT NULL,
    "descricao_evento" TEXT NOT NULL,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "evento_inscricao" (
    "id_evento_inscricao" SERIAL NOT NULL,
    "id_inscricao_usuario" INTEGER NOT NULL,
    "id_inscricao_evento" INTEGER NOT NULL,
    "notificacao" BOOLEAN NOT NULL,

    CONSTRAINT "evento_inscricao_pkey" PRIMARY KEY ("id_evento_inscricao")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_login_usuario_key" ON "usuario"("login_usuario");

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_professor_evento_fkey" FOREIGN KEY ("professor_evento") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_inscricao" ADD CONSTRAINT "evento_inscricao_id_inscricao_usuario_fkey" FOREIGN KEY ("id_inscricao_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_inscricao" ADD CONSTRAINT "evento_inscricao_id_inscricao_evento_fkey" FOREIGN KEY ("id_inscricao_evento") REFERENCES "evento"("id_evento") ON DELETE RESTRICT ON UPDATE CASCADE;
