/*
  Warnings:

  - Added the required column `preco_produto` to the `venda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "venda" ADD COLUMN     "preco_produto" DOUBLE PRECISION NOT NULL;
