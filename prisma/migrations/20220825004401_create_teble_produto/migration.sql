-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "cod_barra" VARCHAR(120) NOT NULL,
    "qtd_min" INTEGER NOT NULL DEFAULT 10,
    "lote" VARCHAR(120) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);
