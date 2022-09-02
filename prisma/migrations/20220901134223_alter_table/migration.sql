/*
  Warnings:

  - You are about to drop the `_ProdutoToVenda` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `venda_id` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ProdutoToVenda" DROP CONSTRAINT "_ProdutoToVenda_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProdutoToVenda" DROP CONSTRAINT "_ProdutoToVenda_B_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_venda_id_fkey";

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "venda_id" SET NOT NULL;

-- DropTable
DROP TABLE "_ProdutoToVenda";

-- CreateTable
CREATE TABLE "venda_Produto" (
    "id" SERIAL NOT NULL,
    "venda_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "data_venda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "venda_Produto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda_Produto" ADD CONSTRAINT "venda_Produto_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda_Produto" ADD CONSTRAINT "venda_Produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
