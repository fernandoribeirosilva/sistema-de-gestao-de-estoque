/*
  Warnings:

  - You are about to drop the column `qtd_min` on the `produto` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produto" DROP COLUMN "qtd_min",
ADD COLUMN     "quantidade" INTEGER NOT NULL;
