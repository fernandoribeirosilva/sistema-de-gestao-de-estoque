/*
  Warnings:

  - You are about to drop the column `descricao` on the `produto` table. All the data in the column will be lost.
  - Added the required column `tamanho` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produto" DROP COLUMN "descricao",
ADD COLUMN     "tamanho" VARCHAR(30) NOT NULL;
