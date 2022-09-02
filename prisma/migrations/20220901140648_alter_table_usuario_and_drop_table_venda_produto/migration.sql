/*
  Warnings:

  - You are about to drop the column `venda_id` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `venda_Produto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `produto_id` to the `venda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_venda_id_fkey";

-- DropForeignKey
ALTER TABLE "venda_Produto" DROP CONSTRAINT "venda_Produto_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "venda_Produto" DROP CONSTRAINT "venda_Produto_venda_id_fkey";

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "venda_id";

-- AlterTable
ALTER TABLE "venda" ADD COLUMN     "produto_id" INTEGER NOT NULL,
ADD COLUMN     "usuario_id" INTEGER;

-- DropTable
DROP TABLE "venda_Produto";

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
