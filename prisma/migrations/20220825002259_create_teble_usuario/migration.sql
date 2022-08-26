-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "sobrenome" VARCHAR(120) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "data_nacimento" VARCHAR(11) NOT NULL,
    "token" VARCHAR(200) NOT NULL,
    "cargo" VARCHAR(90) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);
