/*
  Warnings:

  - You are about to drop the `venda_produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "venda_produto" DROP CONSTRAINT "venda_produto_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "venda_produto" DROP CONSTRAINT "venda_produto_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "venda_produto" DROP CONSTRAINT "venda_produto_venda_id_fkey";

-- DropTable
DROP TABLE "venda_produto";

-- CreateTable
CREATE TABLE "_ProdutoToVenda" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProdutoToVenda_AB_unique" ON "_ProdutoToVenda"("A", "B");

-- CreateIndex
CREATE INDEX "_ProdutoToVenda_B_index" ON "_ProdutoToVenda"("B");

-- AddForeignKey
ALTER TABLE "_ProdutoToVenda" ADD CONSTRAINT "_ProdutoToVenda_A_fkey" FOREIGN KEY ("A") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProdutoToVenda" ADD CONSTRAINT "_ProdutoToVenda_B_fkey" FOREIGN KEY ("B") REFERENCES "venda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
