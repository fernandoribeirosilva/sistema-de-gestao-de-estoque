/*
  Warnings:

  - You are about to drop the column `data_nacimento` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_produto_id_fkey";

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "data_nacimento",
DROP COLUMN "email",
DROP COLUMN "sexo",
DROP COLUMN "token",
ADD COLUMN     "cargo_id" INTEGER,
ADD COLUMN     "cpf" VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "produto_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "cargo" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(90) NOT NULL,

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cargo_nome_key" ON "cargo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
