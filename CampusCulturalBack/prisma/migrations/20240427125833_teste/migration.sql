-- AlterTable
CREATE SEQUENCE usuario_id_usuario_seq;
ALTER TABLE "usuario" ALTER COLUMN "id_usuario" SET DEFAULT nextval('usuario_id_usuario_seq');
ALTER SEQUENCE usuario_id_usuario_seq OWNED BY "usuario"."id_usuario";
