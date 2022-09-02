/*
  Warnings:

  - Made the column `venda_id` on table `venda_produto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "venda_produto" DROP CONSTRAINT "venda_produto_venda_id_fkey";

-- AlterTable
ALTER TABLE "venda_produto" ALTER COLUMN "venda_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "venda_produto" ADD CONSTRAINT "venda_produto_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
