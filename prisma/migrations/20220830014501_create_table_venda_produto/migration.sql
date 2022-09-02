/*
  Warnings:

  - You are about to drop the column `produto_id` on the `venda` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `venda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_usuario_id_fkey";

-- AlterTable
ALTER TABLE "venda" DROP COLUMN "produto_id",
DROP COLUMN "usuario_id";

-- CreateTable
CREATE TABLE "venda_produto" (
    "id" SERIAL NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "venda_id" INTEGER,
    "data_venda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "venda_produto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "venda_produto" ADD CONSTRAINT "venda_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda_produto" ADD CONSTRAINT "venda_produto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda_produto" ADD CONSTRAINT "venda_produto_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "venda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
